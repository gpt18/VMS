import React, { useEffect, useState } from 'react';
import { TextField } from '../../components/TextField';
import logo from '../../assets/logo.svg'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';


function RegisterNgoProfile() {


    const token = localStorage.getItem("access_key");
    const navigate = useNavigate();

    const [location, setLocation] = useState({});

    const [ngo, setNgo] = useState({
        id: '',
        ngo_name: '',
        ngo_logo: logo,
        unique_id: '',
        pan: '',
        zone_city: '',
        state: '',
        address: '',
        sector: '',
        website: '',
        email: '',
        phone: ''
    });

    const [registed, setRegistered] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNgo({
            ...ngo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Submit form
        try {
            const token = localStorage.getItem("access_key");
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/ngo/register`, ngo, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (data.id) {
                toast.success(`Registration No: ${data.id}`);
                setNgo({
                    ...ngo,
                    id: data.id
                })
                setRegistered(true);
            }

        } catch (error) {
            console.log("error while registering new ngo")
        }
        console.log(ngo)
    };

    useEffect(() => {

        const getNGOdetails = async () => {
            try {

                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/ngo/register/status`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if(data.profile_status === "COMPLETED") {
                    navigate("/ngo");
                    return null;
                } ;

            } catch (error: any) {
                console.log(error.response.data);
            }
        }

        getNGOdetails();

        async function fetchLocation() {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_STATE_API_URL}`)
                setLocation(data);

            } catch (error) {
                console.log("failed to load locations")
            }
        }


        fetchLocation();

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [])

    return (

        registed ? AfterRegistration()  : BeforeRegistration()

    );

    function BeforeRegistration() {
        return (
            <div className=" min-h-screen p-6 bg-indigo-900">
                <div className='container mx-auto'>
                    <div className='flex flex-col items-center'>
                        <h2 className="text-center text-2xl mb-6 font-bold lg:text-left text-white">NGO Registration Form</h2>
                        <form className="grid grid-cols-1 gap-6 bg-white p-6 mb-6 rounded-lg max-w-[90vw]" onSubmit={handleSubmit} method='post'>
                            <label className="block">
                                <span className="text-gray-700">Organization Name *</span>
                                <TextField type='text' name='ngo_name' onChange={handleChange} required />
                            </label>
                            <div className='flex gap-4'>
                                <label className="block">
                                    <span className="text-gray-700">Preview</span>
                                    <img src={ngo.ngo_logo} alt="ngo_logo" className='w-20 h-20' />
                                </label>
                                <label className="block flex-1">
                                    <span className="text-gray-700">Logo URL *</span>
                                    <TextField name='ngo_logo' onChange={handleChange} required />
                                </label>
                            </div>
                            <label className="block">
                                <span className="text-gray-700">Address *</span>
                                <TextField name='address' onChange={handleChange} required />
                            </label>
                            <div className='flex gap-4'>
                                <label className="block grow">
                                    <span className="text-gray-700">State *</span>
                                    <select value={ngo.state} onChange={e => setNgo({ ...ngo, state: e.target.value, zone_city: "" })}
                                    className='w-full m-2 px-3 py-2 text-gray-700 bg-white rounded-lg shadow focus:outline-none focus:shadow-outline text-base ease-linear transition-all duration-150'>
                                        <option value={""}>--Select State---</option>
                                        {Object.keys(location).map((state) => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="block grow">
                                    <span className="text-gray-700">City *</span>
                                    <select value={ngo.zone_city} onChange={e => setNgo({ ...ngo, zone_city: e.target.value })}
                                    className='w-full m-2 px-3 py-2 text-gray-700 bg-white rounded-lg shadow focus:outline-none focus:shadow-outline text-base ease-linear transition-all duration-150'>
                                        <option value={""}>--Select City---</option>
                                        {(location as Record<string, string[]>)[ngo.state]?.map((city: string, index) => (
                                            <option key={index} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <label className="block">
                                <span className="text-gray-700">Sector *</span>
                                <TextField name='sector' onChange={handleChange} required />
                            </label>
                            <div className='flex gap-4'>
                                <label className="block grow">
                                    <span className="text-gray-700">Email *</span>
                                    <TextField name='email' onChange={handleChange} required />
                                </label>
                                <label className="block grow">
                                    <span className="text-gray-700">Phone *</span>
                                    <TextField name='phone' onChange={handleChange} required />
                                </label>
                            </div>
                            <label className="block">
                                <span className="text-gray-700">Website</span>
                                <TextField name='website' onChange={handleChange} />
                            </label>
                            <span>Identification (Optional)</span>
                            <div className='flex gap-4'>
                                <label className="block grow">
                                    <span className="text-gray-700">Unique ID</span>
                                    <TextField name='unique_id' onChange={handleChange} />
                                </label>
                                <label className="block grow">
                                    <span className="text-gray-700">PAN Number</span>
                                    <TextField name='pan' onChange={handleChange} />
                                </label>
                            </div>
                            <div className='text-xs'>Note: if you provide correct Identification details you will get verified badge on your ngo profile.</div>
                            {/* Add more fields here */}
                            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    function AfterRegistration() {
        return (
            <>
                < div className='min-h-screen bg-indigo-900 flex items-center justify-center p-4'>
                    <div className='bg-white rounded-lg text-center p-4'>
                        <div> 🎉 Your Organization {ngo.ngo_name} register Successfully </div>
                        <div>Your NGO ID: {ngo.id}</div>
                        <div className='p-4'>
                            <Button variant={'contained'} onClick={() => navigate("/ngo", {replace: true})}>Go to Dashboard</Button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}



export default RegisterNgoProfile;