import React, { useEffect, useState } from 'react';
import { TextField } from '../../components/TextField';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { strings } from '../../utils/costants';
import { Button } from '../../components/Button';
import { IconSelector } from '../../utils/selector';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ok, setOk] = useState(false);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/login`,{
        username,
        password,
      });
      setOk(data.status);
      toast.success(`Success`);

      if(data.status) {
        localStorage.setItem("id", data.id);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);
        localStorage.setItem("access_key", data.access_key);

        navigateBasedOnRole(data.role);
      }


    } catch (error: any) {
      toast.error(error.response.data);
    }
  }

  function navigateBasedOnRole(role: string | null) {
    if(role === "ngo") {
      navigate("/ngo");
    } else if(role === "volunteer"){
      navigate("/vol");
    }
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className='p-4'>
        <Link to="/" className='flex gap-2 items-center p-4 flex-1'>
          <img id="icon" className='w-10 h-10' src={logo} alt="logo" />
          <div className="text-lg font-bold"> {strings.APP_NAME} </div>
        </Link>
      </div>
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
        <div className='text-blue-700 flex gap-1 items-center py-4 hover:underline'>
          <Link to='' onClick={() => navigate(-1)}><Button variant={'text'} startIcon={<IconSelector.all.back />} className='px-0'>Go Back</Button></Link>
        </div>
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form className="space-y-4" method='post'>
          <div>
            <label htmlFor="username" className="block font-medium">
              Username
            </label>
            <TextField type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}  required/>
          </div>
          <div>
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <TextField type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <div className='py-4 text-sm text-neutral-500 text-center'>
          Not yet registered? <br /> SignUp as:
          <Link to={"/ngo-signup"} className='text-indigo-700'> NGO</Link> | <Link to={"/vol-signup"} className='text-indigo-700'>Volunteer</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
