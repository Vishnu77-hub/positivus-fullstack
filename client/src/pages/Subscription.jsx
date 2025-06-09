import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './../styles/Subscription.css'
const Subscription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]); // Store user's subscriptions
  const [phone, setPhone] = useState('');
  const backendUrl = process.env.REACT_APP_BACKEND_URL;



  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);



  // Ensure selectedPlan is being passed correctly
  useEffect(() => {
    if (!location.state?.selectedPlan) {
      navigate('/pricing'); // Redirect to pricing if no selected plan
    } else {
      setSelectedPlan(location.state.selectedPlan);
      console.log("Selected Plan:", location.state.selectedPlan); // Debugging the selected plan
    }
  }, [location, navigate]);

  // Fetch user subscriptions to check if they are already subscribed to the plan
  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${backendUrl}/api/subscription/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setSubscriptions(res.data.subscriptions); // Store subscriptions
        } else {
          toast.error(res.data.message || 'Failed to fetch subscriptions');
        }
      } catch (error) {
        toast.error('Error fetching subscriptions');
      }
    };

    fetchUserSubscriptions();
  }, []);

  // Check if the user already has an active subscription for the selected plan
  const isAlreadySubscribed = subscriptions.some(
    (sub) =>
      sub.planId === selectedPlan?._id &&
      ['Pending', 'Accepted'].includes(sub.status)
  );

  const rejectedSub = subscriptions.find(
    (sub) =>
      sub.planId === selectedPlan?._id && sub.status === 'Rejected'
  );

  const handleSubscribe = async () => {
    if (!phone.trim()) {
      toast.error('Phone number is required!');
      return;
    }

    if (isAlreadySubscribed) {
      toast.error('You have already subscribed to this plan!');
      return;
    }

    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    if (!name || !email) {
      toast.error('User information is missing!');
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/subscription/add`,
        {
          planId: selectedPlan._id,
          planName: selectedPlan.planName,
          price: selectedPlan.price,
          planPeriod: selectedPlan.planPeriod,
          email: email,
          name: name,
          phone: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success('Subscription successful!');
        navigate('/my-subscriptions');
      } else {
        toast.error(res.data.message || 'Subscription failed');
      }
    } catch (error) {
      toast.error('Error in subscription: ' + (error.response?.data?.message || error.message));
    }
  };


  return (
    <div className="container mt-2">
      <div className="row mb-5 slide-down">
        <div className="col-lg-12">
          <div className="subscription">
            <h3 className="fade-right">Confirm Your Subscription</h3>
            <p className="fade-left">Thank you for subscribing! Just one more step — confirm your subscription.</p>
          </div>
        </div>
      </div>


      {selectedPlan && (
        <form className="card subscription-box w-100">
          <div
          style={{
            width:"fit-content"
          }} className='mx-auto'>

          <h3>
            <span style={{
              backgroundColor: '#B9FF66',
              padding: '1px 6px',
              borderRadius: '7px'
            }}>Plan:</span>
            <span> {selectedPlan.planName}</span>
          </h3>

          <h3> <span style={{
            backgroundColor: '#B9FF66',
            padding: '1px 6px',
            borderRadius: '7px'
          }}>Price:</span>  ${selectedPlan.price}</h3>
          <h3><span style={{
            backgroundColor: '#B9FF66',
            padding: '1px 6px',
            borderRadius: '7px',
          }}>Period:</span> {selectedPlan.planPeriod}</h3>

          </div>


          <input
            type="number"
            placeholder="Enter your phone number"
            className="form-control my-3"
            value={phone}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setPhone(e.target.value)}
            required
            minLength={10} // optional for validation
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '18px',
              border: isFocused ? '5px solid #B9FF66' : '2px solid #B9FF66',
              borderRadius: '18px',
              backgroundColor: 'white',
              boxShadow: 'none',
              color: 'black',
              outline: 'none',
              transition: 'border-color 0.3s ease',
            }}
          />


          <button
            className="btn btn-primary"
            style={{
              backgroundColor: isHovered ? 'white' : '#B9FF66',
              border: isHovered ? '2px solid #B9FF66' : '2px solid #B9FF66',
              color: 'black',
              padding: '18px',
              fontSize: '18px',
              borderRadius: '18px',
              width: '100%',
              transition: 'border-color 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleSubscribe}
            disabled={isAlreadySubscribed}
          >
            {isAlreadySubscribed ? 'Already Subscribed' : 'Subscribe'}
          </button>


          {isAlreadySubscribed && (
            <p className="text-danger mt-2">You have already given request -- "Waiting for The Approvel".</p>
          )}
          {rejectedSub && (
            <p className="text-warning mt-2">Your previous request was rejected. You can subscribe again.</p>
          )}
        </form>
      )
      }


    </div >
  );
};

export default Subscription;
