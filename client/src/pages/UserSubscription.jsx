// frontend/src/pages/UserSubscription.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import UserProfile from '../components/UserProfile';

const UserSubscription = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;


    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
    });

    useEffect(() => {
        const name = localStorage.getItem('userName');
        const email = localStorage.getItem('userEmail');

        if (name && email) {
            setUserInfo({ name, email });
        }
    }, []);

    useEffect(() => {
        const fetchUserSubscriptions = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(`${backendUrl}/api/subscription/my`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.data.success) {
                    setSubscriptions(res.data.subscriptions);
                } else {
                    toast.error(res.data.message || "Failed to fetch subscriptions");
                }
            } catch (error) {
                toast.error("Error fetching subscriptions");
            }
        };

        fetchUserSubscriptions();
    }, []);

    return (
        <div className="container mt-5">
            <UserProfile />
            <h3>Your Subscriptions</h3>
            {subscriptions.length === 0 ? (
                <p>No subscriptions found.</p>
            )
                :
                (
                    subscriptions.map((sub, idx) => {
                        const now = moment();
                        const expiry = moment(sub.expiryDate);

                        let statusMessage = '';
                        let expiryInfo = '';

                        if (sub.status === 'Pending') {
                            statusMessage = 'Pending Approval';
                            expiryInfo = 'Expires on: —';
                        } else if (sub.status === 'Rejected') {
                            statusMessage = 'Rejected';
                            expiryInfo = 'Expires on: —';
                        } else if (sub.status === 'Accepted') {
                            if (expiry.isBefore(now)) {
                                statusMessage = 'Expired';
                                expiryInfo = 'Expired on: ' + expiry.format("MMMM Do YYYY, h:mm A");
                            } else {
                                const daysLeft = expiry.diff(now, 'days');
                                const hoursLeft = expiry.diff(now, 'hours');
                                const expiryMessage = daysLeft >= 1
                                    ? `${daysLeft} day${daysLeft > 1 ? 's' : ''}`
                                    : `${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}`;
                                statusMessage = 'Active';
                                expiryInfo = `Expires on: ${expiry.format("MMMM Do YYYY, h:mm A")} (${expiryMessage} left)`;
                            }
                        }
                        return (
                            <div
                                key={idx}
                                className={`card my-3 p-3 ${statusMessage === 'Expired' ? 'opacity-50 bg-light' : ''}`}
                            >
                                <h5>{sub.planName}</h5>
                                <p>Price: ₹{sub.price}</p>
                                <p>Duration: {sub.planPeriod || 'N/A'}</p>
                                <p>Name: {userInfo.name}</p>
                                <p>Email: {userInfo.email}</p>
                                <p>Phone: {sub.phone}</p>
                                <p>Subscribed on: {new Date(sub.createdAt).toLocaleDateString()}</p>
                                <p>Status:
                                    <span className={`fw-bold ms-2 
                                  ${statusMessage === 'Pending Approval' ? 'text-warning' :
                                            statusMessage === 'Rejected' ? 'text-danger' :
                                                statusMessage === 'Expired' ? 'text-muted' :
                                                    'text-success'}`}>
                                        {statusMessage}
                                    </span>
                                </p>
                                <p>{expiryInfo}</p>
                            </div>
                        );
                    })
                )}
        </div>
    );
};

export default UserSubscription;
