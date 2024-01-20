import React, { useState } from 'react';
import { IconSelector } from '../../utils/selector';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../../components/Button';
import { toast } from 'react-toastify';
import { strings } from '../../utils/costants';
import logo from '../../assets/logo.svg';


type signUpProps = {
    role: string
}

// const API_BASE_URL: string = 'http://192.168.1.6:3020/api';
// const API_BASE_URL: string = 'http://localhost:3020/api';
const API_BASE_URL: string = import.meta.env.VITE_API_URL;


function SignUp({ role }: signUpProps) {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ok, setOk] = useState(false);

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(`${process.env.REACT_APP_API_URL}/register`)

        try {
            const { data } = await axios.post(`${API_BASE_URL}/register`, {
                name,
                username,
                email,
                password,
                role
            });
            setOk(data.OK);
            toast.success("🎉 Registered Successfully!");

        } catch (error: any) {
            toast.error(error.response.data);
        }

    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <div className='p-4'>
                <Link to="/" className='flex gap-2 items-center p-4 flex-1'>
                    <img id="icon" className='w-10 h-10' src={logo} alt="logo" />
                    <div className="text-lg font-bold"> {strings.APP_NAME} </div>
                </Link>
            </div>
            <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
               
                <div className={ok ? "hidden" : ""}>
                <form method="post" onSubmit={handleSignup}>
                    <div className='text-blue-700 flex gap-1 items-center py-4 hover:underline'>
                        <Link to='' onClick={() => navigate(-1)}><Button variant={'text'} startIcon={<IconSelector.all.back />} className='px-0'>Go Back</Button></Link>
                    </div>
                    <h2 className="text-2xl font-bold mb-6">{role === "ngo" ? "🏢 NGO" : "🙌 Volunteer"} Sign Up</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        {role === "ngo" ? "Organization Name" : "Volunteer Name"}
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usename">
                        Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                    <div className='py-4 text-sm text-neutral-500 text-center'>
                        Already registered?
                        <Link to={"/login"} className='text-indigo-700'> Login</Link>
                    </div>
                </div>

                <div className={`${ok ? "" : "hidden"} text-center`} >
                    <div className='p-4 text-2xl'>🎉 Registered Successfully!</div>
                    <div className='text-2xl'>{name}</div>
                    <div className='text-2xl font-bold'>username: @{username}</div>
                    <div className='p-4 text-2xl'> Welcome onboard!</div>
                    <div className='text-xs text-gray-400 pb-4'>You can now login with your credentials</div>
                    <Link to="/login">
                        <Button variant={'contained'} className='px-4 w-full'>Login</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export { SignUp };
