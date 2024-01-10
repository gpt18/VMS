import React from 'react';
import { TextField } from '../../components/TextField';

const Login: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form className="space-y-4" method='post'>
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <TextField type="email" id="email"/>
          </div>
          <div>
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <TextField type="password" id="password"/>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
