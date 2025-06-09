import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import '../styles/Hero.css';
import LogoCarousel from './LogoCarousel';
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

const Hero = () => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [homeData, setHomeData] = useState([]);

    const fetchHome = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/home/listHome`);
            if (data.success && Array.isArray(data.home)) {
                // Set only the enabled items
                const enabledItems = data.home.filter(item => item.isEnabledHome);
                setHomeData(enabledItems);
            } else {
                toast.error(data.message || "No data found");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Error fetching heading pricing");
        }
    };

    useEffect(() => {
        fetchHome();
    })

    return (
        <>
            {homeData?.map((home, index) => (
                <div key={index} >
                    <div className='px-2'>
                        {/* Hero Section with Faster Fade-In Effect */}
                        <motion.section
                            className="hero-section"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="container">
                                <div className="row d-flex flex-column-reverse flex-lg-row align-items-center text-center text-lg-start">

                                    {/* Left Content (Text) */}
                                    <motion.div
                                        className="pe col-12 col-lg-6 d-flex flex-column align-items-center align-items-lg-start"
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.3 }}
                                        >
                                            {home.homeTitle.split('\n').map((line, i) => (
                                                <span key={i}>
                                                    {line}
                                                    <br />
                                                </span>
                                            ))}
                                        </motion.h1>

                                        {/* Image below the heading on small screens */}
                                        <motion.div
                                            className="d-block d-lg-none mb-3"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                        >
                                            <img className="img-fluid" src={home.homeBanner} alt="illustration" />
                                        </motion.div>

                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.4 }}
                                        >
                                            {home.homeDescription.split('\n').map((line, i) => (
                                                <span key={i}>
                                                    {line}
                                                    <br />
                                                </span>
                                            ))}
                                        </motion.p>

                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.5 }}
                                        >
                                            <Link to="/pricing" className="btn">
                                                {home.homeButton}
                                            </Link>
                                        </motion.div>
                                    </motion.div>

                                    {/* Right Content (Image) - Slide in from Right */}
                                    <motion.div
                                        className="col-12 col-lg-6 d-none d-lg-block"
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                    >
                                        <img className="img-fluid" src={home.homeBanner} alt="illustration" />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Logo Carousel Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <LogoCarousel />
                        </motion.section>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Hero;
