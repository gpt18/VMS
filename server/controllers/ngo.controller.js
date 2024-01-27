const httpStatus = require("http-status");
const { getNgoID, getVolID } = require("../helpers/utilHelper");
const NGO = require("../models/ngo.model");
const User = require("../models/user.model");
const VOLUNTEER = require("../models/volunteer.model");
const { default: mongoose } = require("mongoose");

const handleGetAllAssociatedVols = async (req, res) => {
    // try { 
    //     const { volunteer_associated } = await NGO.findOne({owner: req.user.id}).populate('volunteer_associated.volunteer');
    //     const response = volunteer_associated.map(vol => ({
    //         _id: vol.volunteer._id,
    //         vol_id: vol.volunteer.vol_id,
    //         status: vol.status,
    //         name: `${vol.volunteer.properties.name.first} ${vol.volunteer.properties.name.last}`,
    //         gender: vol.volunteer.properties.gender,
    //         phone: vol.volunteer.properties.phone,
    //         email: vol.volunteer.properties.email,
    //         photo: vol.volunteer.properties.photo,
    //     }));
    //     return res.status(httpStatus.OK).json(response);
    // } catch (err) {
    //     return res.status(httpStatus[500]).json({ message: err.message });
    // }

    try {
        const ngo = await NGO.findById( 
            req.params.id,
            { volunteer_associated: 1, _id: 0 } // projection
        ).populate('volunteer_associated.volunteer', 'vol_id properties'); // only populate necessary fields
    
        const response = ngo.volunteer_associated.map(vol => {
            try {
                return {
                    _id: vol.volunteer._id,
                    vol_id: vol.volunteer.vol_id,
                    status: vol.status,
                    name: `${vol.volunteer.properties.name.first} ${vol.volunteer.properties.name.last}`,
                    gender: vol.volunteer.properties.gender,
                    phone: vol.volunteer.properties.phone,
                    email: vol.volunteer.properties.email,
                    photo: vol.volunteer.properties.photo,
                };
            } catch (err) {
                console.error(`Failed to process volunteer ${vol.volunteer._id}: ${err.message}`);
                return null;
            }
        }).filter(Boolean); // remove null values
    
        return res.status(httpStatus.OK).json(response);
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
}

async function handleAddNewVolunteer(req, res) {
    const {
        first_name,
        last_name,
        father_name,
        dob,
        gender,
        phone,
        email,
        address,
        city,
        state,
        pincode,
        photo,
        aadhar_front,
        aadhar_back,
        qualification,
        experience,
        zone,
        ngo,
    } = req.body;

    const id = await getVolID();

    try {
        const newVol = await VOLUNTEER.create({
            vol_id: id,
            properties: {
                name: {
                    first: first_name,
                    last: last_name
                },
                father_name: father_name,
                dob: dob,
                gender: gender,
                phone: phone,
                email: email,
                address: {
                    locality: address,
                    city: city,
                    state: state,
                    pincode: pincode
                },
                experience: experience,
                qualification: qualification,
                photo: photo,
                aadhar: {
                    front: aadhar_front,
                    back: aadhar_back
                }
            },
            joined_ngo: [
                {
                    ngo: ngo,
                    zone: zone,
                }
            ],
        });

        await NGO.findOneAndUpdate({ _id: ngo }, {
            $push: {
                volunteer_associated:
                {
                    volunteer: newVol._id,
                    status: "JOINED",
                }
            }
        });

        return res.status(200).send(id);
    } catch (error) {
        console.error("error while hanling addNewVolunteer: ", error)
        return res.status(500).send("Error. Try again.");
    }


}

async function handleGetNgoDetails(req, res) {

    try {
        const ngoDetail = await NGO.findOne({ owner: req.user.id });

        if (!ngoDetail) return res.state(httpStatus.NOT_FOUND).send("No any ngo registered by this user");

        const { } = ngoDetail;

        return res.status(200).json({ ngoDetail });

    } catch (error) {
        console.error("error while hanling getngodetails: ", error)
        return res.status(500).send("Error. Try again.");
    }

}

async function handleRegisterNewNgo(req, res) {
    const payload = req.user;
    const body = req.body;

    var verified = false;
    if (body.unique_id && body.pan) verified = true;

    const ngo_id = await getNgoID();

    try {
        await NGO.create({
            ngo_id,
            ngo_name: body.ngo_name,
            ngo_logo: body.ngo_logo,
            owner: payload.id,
            doc: {
                unique_id: body.unique_id,
                pan: body.pan,
                verified
            },
            properties: {
                zone_city: [body.zone_city],
                state: body.state,
                address: body.address,
                sector: body.sector,
                website: body.website,
                email: body.email,
                phone: body.phone
            }
        });

        await User.findOneAndUpdate({ _id: payload.id }, { profile_status: "COMPLETED" });

    } catch (error) {
        console.log(error)
        return res.status(500).send("failed to register ngo")
    }


    return res.status(201).json({ msg: "NGO registered successfully", id: ngo_id });
}

async function handleGetRegisterStatus(req, res) {
    // const payload = req['X-jwtPayload'];

    try {
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ msg: "user not found" });

        if (user.profile_status === "COMPLETED") {
            const ngoDetail = await NGO.findOne({ owner: user.id });
            return res.status(200).json({
                profile_status: user.profile_status,
                ngo_name: ngoDetail.ngo_name,
                ngo_logo: ngoDetail.ngo_logo,
            })
        }

        return res.status(200).json({
            profile_status: user.profile_status,
        });

    } catch (err) {
        return res.status(500).send("Error. Try again.");
    }
}

module.exports = {
    handleGetNgoDetails,
    handleRegisterNewNgo,
    handleGetRegisterStatus,
    handleAddNewVolunteer,
    handleGetAllAssociatedVols,
}