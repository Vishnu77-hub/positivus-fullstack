import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../styles/UserProfile.css'
const UserProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ Track login state


  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


  // ✅ Format phone visually
  const formatPhoneDisplay = (value) => {
    const digits = value.replace(/\D/g, '').replace(/^91/, '').slice(0, 10);
    if (digits.length <= 3) return `+91-${digits}`;
    if (digits.length <= 6) return `+91-${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `+91-${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true); // ✅ Set login status
    const raw = localStorage.getItem('userPhone') || '';
    const cleaned = raw.replace('+91', '');
    setFormData({
      name: localStorage.getItem('userName') || '',
      email: localStorage.getItem('userEmail') || '',
      phone: formatPhoneDisplay(cleaned),
      password: '',
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').replace(/^91/, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: formatPhoneDisplay(digitsOnly) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const digitsOnly = formData.phone.replace(/\D/g, '').replace(/^91/, '').slice(0, 10);
      const fullPhone = `+91${digitsOnly}`;
      if (digitsOnly.length !== 10) {
        toast.error('Phone number must be exactly 10 digits.');
        return;
      }

      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/profile`,
        { ...formData, phone: fullPhone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success && res.data.user) {
        toast.success(res.data.message);
        localStorage.setItem('userName', res.data.user.name);
        localStorage.setItem('userEmail', res.data.user.email);
        localStorage.setItem('userPhone', res.data.user.phone);
      } else {
        toast.error(res.data.message || 'Failed to update');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error');
    }
  };

  // ✅ If not logged in, render nothing
  if (!isLoggedIn) return null;

  return (
    <div className="mt-5">


      <div className="row mb-5 slide-down">
        <div className="col-lg-12">
          <div className="user-profile">
            <h3 className="fade-right">User Profile</h3>
            <p className="fade-left">This is the page you can edit your profile.</p>
          </div>
        </div>
      </div>


      <div className="card-body mx-auto">
        <form onSubmit={handleUpdate}> 
          <div style={{
            width:"fit-content"
          }}
          className="user-profile-box">
            

          <div className="mb-3">
            <label className="form-label">
              <h3> <span style={{
                backgroundColor: '#B9FF66',
                padding: '1px 6px',
                borderRadius: '7px'
              }}>Name</span></h3>
            </label>
            <input
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '18px',
                border: isFocused1 ? '5px solid #B9FF66' : '2px solid #B9FF66',
                borderRadius: '18px',
                backgroundColor: 'white',
                boxShadow: 'none',
                color: 'black',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onFocus={() => setIsFocused1(true)}
              onBlur={() => setIsFocused1(false)}
              onChange={handleChange}
              required
              />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <h3>
                <span style={{
                  backgroundColor: '#B9FF66',
                  padding: '1px 6px',
                  borderRadius: '7px'
                }}>Email</span>
              </h3>
            </label>
            <input
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '18px',
                border: isFocused2 ? '5px solid #B9FF66' : '2px solid #B9FF66',
                borderRadius: '18px',
                backgroundColor: 'white',
                boxShadow: 'none',
                color: 'black',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setIsFocused2(true)}
              onBlur={() => setIsFocused2(false)}
              required
              />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <h3>
                <span style={{
                  backgroundColor: '#B9FF66',
                  padding: '1px 6px',
                  borderRadius: '7px'
                }}>Phone</span>
              </h3></label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={formData.phone}
              onFocus={() => setIsFocused3(true)}
              onBlur={() => setIsFocused3(false)}
              onChange={handleChange}
              placeholder="+91-xxx-xxx-xxxx"
              required
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '18px',
                border: isFocused3 ? '5px solid #B9FF66' : '2px solid #B9FF66',
                borderRadius: '18px',
                backgroundColor: 'white',
                boxShadow: 'none',
                color: 'black',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
              />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <h3>
                <span style={{
                  backgroundColor: '#B9FF66',
                  padding: '1px 6px',
                  borderRadius: '7px'
                }}>New Password (optional)</span>
              </h3>
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onFocus={() => setIsFocused4(true)}
              onBlur={() => setIsFocused4(false)}
              onChange={handleChange}
              placeholder="Leave blank to keep old password"
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '18px',
                border: isFocused4 ? '5px solid #B9FF66' : '2px solid #B9FF66',
                borderRadius: '18px',
                backgroundColor: 'white',
                boxShadow: 'none',
                color: 'black',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
              />
          </div>
          <button
            style={{
              backgroundColor: isHovered ? 'white' : '#B9FF66',
              border: isHovered ? '2px solid #B9FF66' : '2px solid #B9FF66',
              width: '100%',
              padding: '18px',
              fontSize: 'x-large',
              borderRadius: '18px',
              boxShadow: 'none',
              color: 'black',
              transition: 'border-color 0.3s ease',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="btn">Update Profile</button>
            </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UserProfile;
