const httpStatus = require("http-status");
const { getNgoID } = require("../helpers/utilHelper");
const NGO = require("../models/ngo.model");
const User = require("../models/user.model");

async function handleGetNgoDetails(req, res) {

    try {
        const ngoDetail = await NGO.findOne({ owner: req.user.id });

        if(!ngoDetail) return res.state(httpStatus.NOT_FOUND).send("No any ngo registered by this user");

        const {  } = ngoDetail;

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
        })}

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
}