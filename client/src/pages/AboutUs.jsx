import React from 'react'
import { motion } from "framer-motion";
import '../styles/AboutUs.css'
import OurImpact from './AboutUs/OurImpact';
import OurJourney from './AboutUs/OurJourney';

const AboutUs = () => {
    return (
        <section className='container'>
            <div>
                <div className='px-2 container pb-5'>
                    {/* Hero Section with Faster Fade-In Effect */}
                    <motion.section
                        className="aboutus-section"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="container">
                            <div className="row d-flex flex-column-reverse flex-lg-row align-items-center text-center text-lg-start">
                                {/* Right Content (Image) - Slide in from Right */}
                                <motion.div
                                    className="pb-lg-5 col-12 col-lg-6 d-none d-lg-block"
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <img className="img-fluid" src="/assets/aboutus.png" alt="illustration" />
                                </motion.div>
                                {/* Left Content (Text) */}
                                <motion.div
                                    className="col-12 col-lg-6 d-flex flex-column align-items-center align-items-lg-start"
                                    initial={{ opacity: 0, x: -40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                    >
                                        Together for success
                                    </motion.h1>

                                    {/* Image below the heading on small screens */}
                                    <motion.div
                                        className="d-block d-lg-none mb-3"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    >
                                        <img className="img-fluid" src="/assets/aboutus.png" alt="illustration" />
                                    </motion.div>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                        className='pe-lg-5'
                                    >
                                        At postivivus , we help businesses grow by combining creativity, innovation, and data-driven strategies. Together, we build a future of shared success.
                                    </motion.p>


                                </motion.div>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </div>

            <OurImpact />
            <OurJourney />
        </section>
    )
}

export default AboutUs
