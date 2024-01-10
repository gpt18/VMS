import React, { useState } from 'react';
import { IconSelector } from '../../utils/selector';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../../components/Button';
import { toast } from 'react-toastify';

type signUpProps = {
    role: string
}

function SignUp({ role }: signUpProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ok, setOk] = useState(false);

    const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


        try {
            const { data } = await axios.post('http://localhost:3020/api/user/register', {
                name,
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
        <div className="flex justify-center items-center h-screen bg-neutral-200">
            <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className={ok ? "hidden" : ""}>
                    <div className='text-blue-700 flex gap-1 items-center py-4 hover:underline'>

                        <Link to="/"><Button variant={'text'} startIcon={<IconSelector.all.back />}>Go Back</Button></Link>

                    </div>
                    <h2 className="text-2xl font-bold mb-6">{role === "ngo" ? "NGO" : "Volunteer"} Sign Up</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleSignup}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                <div className={`${ok ? "" : "hidden"} text-center`} >
                    <div className='p-4 text-2xl'>🎉 Registered Successfully!</div> 
                    <div className='p-4 text-2xl font-bold'>{name}</div>
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
