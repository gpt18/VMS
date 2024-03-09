import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { PageTitle } from "../../components/PageTitle"
import { useNgoDataContext } from "../../hooks/NgoDataContext";
import { useForm } from "../../hooks/useForm";
import { Img } from "../../utils/costants";
import { IconSelector } from "../../utils/selector";
import { addVolunteer } from "../../services/ngoService";
import { useFile } from "../../hooks/useFile";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from "react-router-dom";
import compressImage from "../../services/imageCompression";

const AddNewVolunteer: React.FC = () => {
    return (
        <section id="add-new-vol" className="mx-auto max-w-screen-xl p-4 md:px-6 xl:px-10 relative">
            <PageTitle title="Create New Volunteer" />
            <VolunteerDetailsForm />
        </section>
    );
};

const VolunteerDetailsForm: React.FC = () => {

    const initialVolunteerData = {
        full_name: '',
        father_name: '',
        dob: '',
        gender: 'male',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        qualification: '',
        experience: '',
        zone: '',
        ngo: '',
        profileImage: '',
        aadharFrontImage: '',
        aadharBackImage: '',
    };

    const initialFileData = {
        profileImage: {
            file: '',
            file_name: '',
            preview: '',
            uploaded: false
        },
        aadharFrontImage: {
            file: '',
            file_name: '',
            preview: '',
            uploaded: false
        },
        aadharBackImage: {
            file: '',
            file_name: '',
            preview: '',
            uploaded: false
        }
    };

    const { ngoData } = useNgoDataContext();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { data: volunteer, handleChange, setData: setVolunteer } = useForm({
        ...initialVolunteerData,
        zone: ngoData?.zone_city[0] || '',
        ngo: ngoData?.id || '',
    });

    const { data: files, setData: setFileData } = useFile(initialFileData);

    useEffect(() => {
        setVolunteer((prev: any) => ({
            ...prev,
            zone: ngoData.zone_city[0] || '',
            ngo: ngoData.id || '',
        }));
    }, [ngoData.id, ngoData.zone_city[0]]);

    const handleAddVolunteer = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const volunteerData = {
            ...volunteer,
            profileImage: files.profileImage.file,
            aadharFrontImage: files.aadharFrontImage.file,
            aadharBackImage: files.aadharBackImage.file
        };

        try {
            const res = await addVolunteer(volunteerData);
            resetForm();
            toast.success(res.data.message);
            handleComplete(res.data.id);
        } catch (error) {
            console.log("Error while adding new volunteer: ", error);
            toast.warning("Error adding voluneer. Try again!")
        } finally {
            setLoading(false);
        }
    }

    const resetForm = () => {
        setVolunteer({ ...initialVolunteerData, zone: ngoData?.zone_city[0] || '', ngo: ngoData?.id || '' });
        setFileData({ ...initialFileData });
    }

    function handleComplete(id: string) {
        const userResponse = confirm("Do you want to add a new volunteer?")
        if (!userResponse) {
            navigate(`/ngo/vol/${id}`, { replace: true });
        }
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, compress: boolean = false, crop: boolean = false) => {
        const file = e.target.files?.[0];

        if (file) {
            let comp;
            if(compress)  comp = await compressImage(file, 100, crop);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFileData({
                    ...files,
                    [e.target.name]: {
                        file: comp || file,
                        file_name: file.name,
                        preview: reader.result as string,
                    }
                });
                
            };
            reader.readAsDataURL(comp || file);
        }
    };

    return (
        <section id="new-vol-form" className="container mx-auto max-w-lg mt-4 md:mt-6 p-4">
            <div>
                <HeadLine title="Select Zone" />
                <div className="bg-white shadow-md rounded-md p-4">
                    <div className='flex items-center gap-4'>
                        <div className="w-1/2 gap-4 flex items-center">
                            <div className='text-gray-600 text-sm font-medium'>Zone</div>
                            <select name="zone" value={volunteer.zone} className='rounded bg-slate-100 border hover:bg-slate-200' onChange={handleChange} required>
                                {ngoData.zone_city.map(zone => <option key={zone}> {zone} </option>)}
                            </select>
                        </div>
                        <div className="w-1/2 flex gap-2 justify-end">
                            <Button variant={'dark'} onClick={() => { }}>Add Zone</Button>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleAddVolunteer}>

                    <HeadLine title="Profile" />
                    <div className="bg-white shadow-md rounded-md p-6 flex flex-col items-start">
                        <div className='mb-4 relative'>
                            <label className='absolute right-0 text-xl text-white bg-black/40 rounded-full p-2 ring-1 ring-white cursor-pointer hover:bg-black/60'>
                                {

                                    !files.profileImage.file ?
                                        <>
                                            <IconSelector.all.camera />
                                            <input type="file" accept='.jpg,.png' className="hidden" name="profileImage" onChange={(e) => handleImageChange(e, true, true)} />
                                        </> :
                                        <span onClick={() => setFileData((prev: any) => ({ ...prev, profileImage: initialFileData.profileImage }))}>
                                            <IconSelector.menuIcon.close />
                                        </span>
                                }

                            </label>
                            <div className='w-36 h-36 rounded-full overflow-hidden flex items-center justify-center'>
                                <img src={files.profileImage.preview || Img.profile_dummy} alt="photo" className='object-cover ' />
                            </div>
                        </div>
                        <div className='text-3xl font-bold mb-1 capitalize'>
                            <Input type="text" placeholder="Full Name" name="full_name" value={volunteer.full_name} onChange={handleChange} required />
                        </div>
                        <div className="flex gap-4 mt-4 items-center">
                            <span><IconSelector.other.gender /></span>
                            <select name="gender" value={volunteer.gender} className="rounded bg-slate-100 border hover:bg-slate-200" onChange={handleChange} required>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <HeadLine title="Details" />
                    <div className="bg-white shadow-md rounded-md p-4">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="px-2 py-3 whitespace-nowrap">Father Name *</td>
                                    <td><Input type="text" placeholder="Father Name" name="father_name" value={volunteer.father_name} onChange={handleChange} required /></td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-3 whitespace-nowrap">Date of Birth *</td>
                                    <td><Input type="date" placeholder="Date of Birth" name="dob" value={volunteer.dob} onChange={handleChange} required /></td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-3 whitespace-nowrap">Qualification *</td>
                                    <td><Input type="text" placeholder="Qualification" name="qualification" value={volunteer.qualification} onChange={handleChange} required /></td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-3 whitespace-nowrap">Experience <span className="text-xs">(If any)</span></td>
                                    <td><Input type="text" placeholder="Experience" name="experience" value={volunteer.experience} onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-3 whitespace-nowrap">Phone *</td>
                                    <td><Input type="number" placeholder="Phone" name="phone" value={volunteer.phone} onChange={handleChange} required /></td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-3 whitespace-nowrap">Email *</td>
                                    <td><Input type="email" placeholder="Email" name="email" value={volunteer.email} onChange={handleChange} required /></td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-3 whitespace-nowrap">Address *</td>
                                    <td><Input type="text" placeholder="Address" name="address" value={volunteer.address} onChange={handleChange} required /></td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-3 whitespace-nowrap">City *</td>
                                    <td><Input type="text" placeholder="City" name="city" value={volunteer.city} onChange={handleChange} required /></td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-3 whitespace-nowrap">State *</td>
                                    <td><Input type="text" placeholder="State" name="state" value={volunteer.state} onChange={handleChange} required /></td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-3 whitespace-nowrap">Pincode *</td>
                                    <td><Input type="number" placeholder="Pincode" name="pincode" value={volunteer.pincode} onChange={handleChange} required /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="text-xs p-2">* Fields are required.</div>

                    <HeadLine title="Aadhar" />
                    <div className="bg-white shadow-md rounded-md p-4">

                        <table className="w-full">
                            <thead className="">
                                <tr>
                                    <th className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Front</th>
                                    <th className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Back</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2 w-1/2">
                                        <label>
                                            <div className="flex items-center justify-center h-28 rounded-md border-dashed border-2 cursor-pointer hover:bg-slate-100 capitalize">
                                                <div className="h-full overflow-hidden flex items-center justify-center">
                                                    <img src={files.aadharFrontImage.preview || Img.aadhar_front} alt="" className="object-cover" />
                                                </div>
                                            </div>
                                            <input type="file" accept='.jpg,.png' className="hidden" name="aadharFrontImage" onChange={(e) => handleImageChange(e, true)} />
                                        </label>
                                    </td>
                                    <td className="p-2 w-1/2">
                                        <label>
                                            <div className="flex items-center justify-center h-28 rounded-md border-dashed border-2 cursor-pointer hover:bg-slate-100 capitalize ">
                                                <div className="h-full overflow-hidden flex items-center justify-center">
                                                    <img src={files.aadharBackImage.preview || Img.aadhar_front} alt="" className="object-cover" />
                                                </div>
                                            </div>
                                            <input type="file" accept='.jpg,.png' className="hidden" name="aadharBackImage" onChange={(e) => handleImageChange(e, true)} />
                                        </label>
                                    </td>

                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="text-xs p-2"># Only accept .jpg, .png file.</div>

                    <div className="my-6 flex justify-between items-center">
                        <Button type="button" size={'icon'} onClick={resetForm}><IconSelector.all.reset /></Button>

                        <Button type="submit" variant={"contained"} disabled={loading}>
                            {
                                loading ?
                                    <BeatLoader color="#fff" size={10} /> :
                                    "Add"
                            }
                        </Button>

                    </div>
                </form>
            </div>
        </section>
    );
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
    return (
        <input className="w-full border-b-2 border-blue-500 focus:outline-none focus:border-blue-700" {...props} />
    );
}

type HeadLineProps = {
    title: string;
}

const HeadLine: React.FC<HeadLineProps> = ({ title }) => {
    return (
        <div className="my-4">
            <div className="text-2xl">
                {title}
            </div>
        </div>
    );
}

export default AddNewVolunteer;