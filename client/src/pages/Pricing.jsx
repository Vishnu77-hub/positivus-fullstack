import React, { useEffect, useState } from 'react'
import '../styles/Pricing.css'
// import { Link } from 'react-router-dom';
import { FaMinus, FaPlus } from "react-icons/fa";
import faq from '../utlis/faq';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [pricingData, setPricingData] = useState([]);
    const [headingPricingData, setHeadingPricingData] = useState([]);
    const [userSubscriptions, setUserSubscriptions] = useState([]);



    const [openIndex, setOpenIndex] = useState(0);

    const navigate = useNavigate();

    const handleAuthRedirect = (plan) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/auth", { state: { selectedPlan: plan } });
        } else {
            navigate("/subscription", { state: { selectedPlan: plan } });
        }
    };


    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const fetchPricing = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/pricing/listPricingTable`);
            if (data.success && Array.isArray(data.pricing)) {
                // Set only the enabled items
                const enabledItems = data.pricing.filter(item => item.isEnabledPricing);
                setPricingData(enabledItems);
            } else {
                toast.error(data.message || "No data found");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Error fetching heading pricing");
        }
    };


    // const fetchHeadingPricing = async () => {
    //     try {
    //       const res = await axios.get(`${backendUrl}/api/pricing/listHeadingPricingTable`);
    //       console.log("API Response:", res.data); // ⬅ADD THIS

    //       if (res.data.success) {
    //         setHeadingPricingData(res.data.headingPricing);
    //       } else {
    //         console.error(res.data.message);
    //       }
    //     } catch (error) {
    //       console.error("Failed to fetch pricing data", error);
    //     }
    //   };


    const fetchHeadingPricing = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/pricing/listHeadingPricingTable`);
            if (data.success && Array.isArray(data.headingPricing)) {
                // Set only the enabled items
                const enabledItems = data.headingPricing.filter(item => item.isEnabledHeadingPricing);
                setHeadingPricingData(enabledItems);
            } else {
                toast.error(data.message || "No data found");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Error fetching heading pricing");
        }
    };

    const fetchUserSubscriptions = async () => {
        const token = localStorage.getItem("token");
        if (!token) return; // Skip if not logged in

        try {
            const res = await axios.get(`${backendUrl}/api/subscription/my`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success) {
                setUserSubscriptions(res.data.subscriptions);
            }
        } catch (err) {
            console.error("Failed to fetch subscriptions", err);
        }
    };

    useEffect(() => {
        fetchPricing();
        fetchHeadingPricing();
        fetchUserSubscriptions();
    }, []);

    useEffect(() => {
        console.log("User Subscriptions: ", userSubscriptions); // 👈 Add this
    }, [userSubscriptions]);


    // useEffect(() => {
    //     fetchPricing();
    //     fetchHeadingPricing();
    // }, []);
    const isActiveSubscription = (planId) => {
        return userSubscriptions.some((sub) =>
            String(sub.planId) === String(planId) &&
            sub.status === "Accepted" &&
            new Date(sub.expiryDate) > new Date()
        );
    };

    const isPendingSubscription = (planId) => {
        return userSubscriptions.some(
            (sub) =>
                String(sub.planId) === String(planId) &&
                sub.status === "Pending"
        );
    };







    return (
        <div>

            <section className='container pricing-section'>
                {console.log("headingPricingData", headingPricingData)}


                <div className='mb-2 pb-1'>
                    {headingPricingData?.map((plan, index) => (
                        <div key={index} className='mb-1 pb-1'>
                            <img src={plan.pricingBanner} alt="" className="img-fluid pricing-banner mb-2" />
                            <p>
                                {plan.pricingDescription.split('\n').map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </p>
                        </div>
                    ))}

                    <div className='pricing-plan mb-5 pb-3 justify-content-center'>
                        {pricingData?.map((plan, index) => {
                            const isActive = isActiveSubscription(plan._id);
                            const isPending = isPendingSubscription(plan._id);


                            return (
                                <div
                                    key={index}
                                    className='plan-box flex-fill'
                                    style={{
                                        opacity: isActive || isPending ? 0.5 : 1,
                                        pointerEvents: isActive || isPending ? 'none' : 'auto',
                                    }}
                                >
                                    <h4>{plan.planName}</h4>
                                    <div>
                                        <span className='fs-1 fw-semibold'>${plan.price}</span>
                                        <span className='fs-6 ps-2 mb-2'> /{plan.planPeriod}</span>
                                        <div>
                                            <div className="pricing-plan-btn pb-3">
                                                <button
                                                    onClick={() =>
                                                        isActive
                                                            ? toast.info("You already have an active subscription.")
                                                            : isPending
                                                                ? toast.info("Your request is still pending approval.")
                                                                : handleAuthRedirect(plan)
                                                    }
                                                    disabled={isActive || isPending}
                                                >
                                                    {isActive
                                                        ? "Not Available"
                                                        : isPending
                                                            ? "Waiting for Approval"
                                                            : "Get Started"}
                                                </button>

                                            </div>
                                            <div className="pricing-plan-btn">
                                                <button
                                                    onClick={() =>
                                                        isActive
                                                            ? toast.info("You already have an active subscription.")
                                                            : isPending
                                                                ? toast.info("Your request is still pending approval.")
                                                                : handleAuthRedirect(plan)
                                                    }
                                                    disabled={isActive || isPending}
                                                >
                                                    {isActive
                                                        ? "Not Available"
                                                        : isPending
                                                            ? "Waiting for Approval"
                                                            : "Request a Quote"}
                                                </button>

                                            </div>
                                        </div>
                                        <hr className="bolder-hr opacity-100" />
                                        <div>
                                            {plan.planDetails.map((feature, i) => (
                                                <div key={i} className='pricing-benifits row justify-content-center align-items-center mb-3'>
                                                    <img className='img-fluid col-1' src="assets/thick-w.png" alt="" />
                                                    <p className='col mt-auto mb-auto'>{feature}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}




                    </div>
                </div>




                <div className='mb-5 pb-5'>
                    <div className="row">
                        <div className="col-lg-12 mb-3">
                            <div className="faq-title">
                                <h3 className='fade-right'><span>Frequantly Asked </span><br /><span>Questions</span></h3>
                            </div>
                        </div>
                    </div>

                    <div>
                        {faq.map((step, i) => (
                            <div key={i} className={`step-container ${openIndex === i ? "border-green" : "border-gray"} fade-in`}>
                                <button
                                    className={`step-button ${openIndex === i ? "bg-green" : "bg-gray"}`}
                                    onClick={() => handleToggle(i)}
                                >
                                    <div className="step-header">
                                        {/* <h1 className="step-number">{step.number}</h1> */}
                                        <h3 className="step-title">{step.question}</h3>
                                    </div>
                                    <div className={`toggle-icon ${openIndex === i ? "rotate" : ""}`}>
                                        {openIndex === i ? <FaMinus /> : <FaPlus />}
                                    </div>
                                </button>
                                <div
                                    className={`step-content-wrapper ${openIndex === i ? "open" : ""}`}
                                >
                                    <div className={`step-content ${openIndex === i ? "bg-green" : "bg-gray"}`}>
                                        <hr className="content-divider" />
                                        <p>{step.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Pricing
