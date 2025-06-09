import React, { useState } from 'react';
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    if (!captchaToken) {
      toast.error('Please complete the CAPTCHA');
      return;
    }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/admin`, {
        email,
        password,
        captcha: captchaToken,
      });
  
      // Log the response to the console for debugging
      console.log("Response from server:", response.data);
  
      if (response.data.success) {
        
        setToken(response.data.token);
        toast.success('Login successful!');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during login attempt: ", error); 
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred');
      } else {
        toast.error(error.message || 'Something went wrong');
      }
    }
  };
  
  
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type="email"
              placeholder='Your@email.com'
              required
            />
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type="password"
              placeholder='Password'
              required
            />
          </div>

          {/* Google reCAPTCHA */}
          <div className='my-3'>
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} // Store in .env
              onChange={(token) => setCaptchaToken(token)}
              theme="light"
            />
          </div>

          <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
