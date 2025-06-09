import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // 👈 Add phone
    password: '',
  });


  useEffect(() => {
    // Check if token already exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/subscription');  // Navigate to payment page if token exists
    }
  }, [navigate]);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', phone: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? `${backendUrl}/api/user/login`
      : `${backendUrl}/api/user/register`;

    try {
      const res = await axios.post(endpoint, formData);

      if (res.data.success && res.data.token) {
        toast.success(`${isLogin ? 'Login' : 'Registration'} successful!`);

        localStorage.setItem('token', res.data.token);   // ✅ store token
        localStorage.setItem('userEmail', res.data.email); // ✅ store email
        localStorage.setItem('userName', res.data.name);   // optional
        localStorage.setItem('userPhone', res.data.phone);

        console.log("Response Data:", res.data.name); // 🧪 Add this line
        navigate('/subscription');
      }
      else {
        // Handle user already exists error for registration
        if (!isLogin && res.data.message === 'User already exists') {
          toast.error('User already exists, please login');
          setIsLogin(true);  // Switch to login mode
        } else {
          toast.error(res.data.message || 'Something went wrong');
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card shadow">
        <div className="card-header text-center bg-primary text-white">
          <h4>{isLogin ? 'Login' : 'Register'}</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
          <p className="mt-3 text-center">
            <a href="/forgot-password" className="text-decoration-none">Forgot Password?</a>
          </p>

          <p className="mt-3 text-center">
            {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
            <button className="btn btn-link p-0" onClick={handleToggle}>
              {isLogin ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthPage;
