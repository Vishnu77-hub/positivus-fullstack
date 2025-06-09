import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Services = () => {
    return (
        <section>
            <div>
                <div>
                    <div className='px-2 container pb-5'>
                        {/* Hero Section with Faster Fade-In Effect */}
                        <motion.section
                            className="services-section"
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
                                        <img className="img-fluid" src="/assets/services.png" alt="illustration" />
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
                                            <img className="img-fluid" src="/assets/services.png" alt="illustration" />
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
                        <div className="services-ranking p-xl-5 mt-5 p-2 pt-4 pb-4 d-flex flex-column flex-lg-row gap-3 text-white mb-5">
                            {/* Image and title in one row always */}
                            <div className="d-flex gap-3 col-lg-4 col-12">
                                <div>
                                    <img
                                        className="img-fluid p-3"
                                        src="/assets/vector.svg"
                                        alt="Service Vector"
                                    />
                                </div>

                                <div className="p-2 d-flex">
                                    <h3 className="mb-0"><span>What we do?</span></h3>
                                </div>
                            </div>


                            {/* Description - stacked below on small screens, beside on large */}
                            <div className="p-2 px-lg-3 col-12 col-lg-7 align-items-end">
                                <p>We provide end-to-end digital marketing services—from SEO and PPC to Social Media, Email Marketing, and Content Creation—to help your business grow online. Using data-driven strategies and advanced analytics, we optimize performance and deliver measurable results.</p>

                            </div>
                        </div>

                        <div>
                <div className="row mt-5">
                <div className="col-lg-12 ">
                    <div className="services-title">
                        <h3 className='fade-right'>Case Studies</h3>
                        <p className='fade-left'>Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies</p>
                    </div>
                </div>
            </div>

            <div className='case-studies-box fade-in'>
                <div className=' ms-2 row p-5 pb-5'>
                    <div className='col-4 position-relative p-3 pb-1 pe-5'>
                        <h3 className='text-white'><span>E-commerce</span><br /><span>Fashion Brand</span> </h3>
                        <p className='text-white pe-lg-3'>
                        We implemented a tailored SEO strategy that boosted organic search rankings, leading to a 150% increase in website traffic and a 50% rise in online sales within six months.
                        </p>
                        <a className='mt-auto' href="#"><img src="/assets/learnmorelink.svg" alt="" /></a>
                        <div className='vertical-line'></div>
                    </div>
                    <div className='col-4 position-relative p-3 pb-1 pe-5'>
                        <h3 className='text-white'><span>Local Restaurant</span> <span>Chain</span></h3>
                        <p className='text-white '>
                        By optimizing local SEO and enhancing Google My Business profiles, we increased visibility, driving a 300% boost in online reservations and foot traffic.
                        </p>
                        <a className='mt-auto' href="#"><img src="/assets/learnmorelink.svg" alt="" /></a>
                        <div className='vertical-line ms-3'></div>
                    </div>
                    <div className='col-4 p-3 pb-1 pe-5'>
                        <h3 className='text-white'>Healthcare Provider</h3>
                        <p className='text-white'>
                        Through content optimization and targeted keyword strategy, we helped a healthcare provider rank on the first page for critical services, resulting in a 180% increase in inquiries and patient bookings.
                        </p>
                        <a className='mt-auto ms-4' href="#"><img src="/assets/learnmorelink.svg" alt="" /></a>
                    </div>
                </div>
            </div>

            <div className='case-studies-box2 fade-in'>
                <div className='d-flex'>
                        <div className='case-bg col-6'>
                            <p className='text-white mt-2'>
                                For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.
                            </p>
                            <a className='mt-auto' href="#"><img src="/assets/learnmorelink.svg" alt="" /></a>
                        </div>
                        <div className='case-bg col-6 ms-4'>
                            <p className='text-white mt-2'>
                                For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.
                            </p>
                            <a className='mt-auto' href="#"><img src="/assets/learnmorelink.svg" alt="" /></a>
                            <div className='vertical-line ms-3'></div>
                        </div>
                        <div className='case-bg col-6 ms-4'>
                            <p className='text-white mt-2'>
                                For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.
                            </p>
                            <a className='mt-auto' href="#"><img src="/assets/learnmorelink.svg" alt="" /></a>
                        </div>

                </div>
            </div>
                </div>

                <div>
                <div className="row mt-5 mb-4">
                    <div className="col-xl-12">
                        <div className="services-title">
                            <h3 className='fade-right ms-lg-1'>Other Services</h3>
                            <p className='fade-left pe-xl-5'>Our step-by-step process ensures your website ranks higher, attracts more traffic, and drives lasting results.</p>
                        </div>
                    </div>
                </div>
                <div className='row services-box '>
                        <div className='col-lg-6 mb-5 fade-left'>
                            <div className='row services-box-1'>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Search engine</span><br /><span>optimization</span></h3>
                                    <Link className='mt-auto learn-more-services' to="/services/seo">
                                        <img src="/assets/learnmore-b.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='learn-more-services-copy mt-auto float-start' to="/services/seo">
                                            <img src="/assets/learnmore-b.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid services-box-img services-box-img-1' src="/assets/serviceshero1.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 mb-5 fade-right'>
                            <div className='row services-box-2 '>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Pay-per-click</span><br /><span>advertising</span></h3>
                                    <Link className='mt-auto learn-more-services' to="/services/ppc">
                                        <img src="/assets/learnmore-b.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='learn-more-services-copy mt-auto float-start' to="/services/ppc">
                                            <img src="/assets/learnmore-b.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid services-box-img services-box-img-2' src="/assets/serviceshero2.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row services-box'>
                        <div className='col-lg-6 mb-5 fade-left'>
                            <div className='row services-box-3'>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Social Media</span><br /><span>Marketing</span></h3>
                                    <Link className='mt-auto learn-more-services' to="/services/socialMedia">
                                        <img src="/assets/learnmore-b.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='learn-more-services-copy mt-auto float-start' to="/services/socialMedia">
                                            <img src="/assets/learnmore-b.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid services-box-img services-box-img-3' src="/assets/serviceshero3.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 mb-5 fade-right'>
                            <div className='row services-box-4'>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Email</span><br /><span>Marketing</span></h3>
                                    <Link className='mt-auto learn-more-services' to="/services/email">
                                        <img src="/assets/learnmore-b.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='learn-more-services-copy mt-auto float-start' to="/services/email">
                                            <img src="/assets/learnmore-b.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid services-box-img services-box-img-4' src="/assets/serviceshero4.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row services-box'>
                        <div className='col-lg-6 mb-5 fade-left'>
                            <div className='row services-box-5'>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Content</span><br /><span>Creation</span></h3>
                                    <Link className='mt-auto learn-more-services' to="/services/contentCreaction">
                                        <img src="/assets/learnmore-b.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='learn-more-services-copy mt-auto float-start' to="/services/contentCreaction">
                                            <img src="/assets/learnmore-b.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid services-box-img services-box-img-5' src="/assets/serviceshero5.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 mb-5 fade-right'>
                            <div className='row services-box-6'>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Analytics and </span><br /><span>Tracking</span></h3>
                                    <Link className='mt-auto learn-more-services' to="/services/analyticsTracking">
                                        <img src="/assets/learnmore-b.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>

                                        <Link className='learn-more-services-copy mt-auto float-start' to="/services/analyticsTracking">
                                            <img src="/assets/learnmore-b.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid services-box-img services-box-img-6' src="/assets/serviceshero6.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Services
