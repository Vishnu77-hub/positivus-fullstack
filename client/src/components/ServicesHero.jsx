import React from 'react'
import { Link } from "react-router-dom";
import '../styles/ServicesHero.css'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ServicesHero = () => {


    return (
        <section className='service-hero-section'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 ">
                        <div className="section-title">
                            <h3 className='fade-right'>Services</h3>
                            <p className='fade-left'>At our digital marketing agency, we offer a range of services to help businesses grow and succeed online. These services include:</p>
                        </div>
                    </div>
                </div>



                <div className='container'>
                    <div className='row service-box '>
                        <div className='col-lg-6 mb-5 fade-left'>
                            <div className='row service-box-1'>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Search engine</span><br /><span>optimization</span></h3>
                                    <Link className='mt-auto learn-more' to="/services/seo">
                                        <img src="/assets/learnmore-b.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='learn-more-copy mt-auto float-start' to="/services/seo">
                                            <img src="/assets/learnmore-b.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid service-box-img service-box-img-1' src="/assets/serviceshero1.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 mb-5 fade-right'>
                            <div className='row service-box-2 '>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Pay-per-click</span><br /><span>advertising</span></h3>
                                    <Link className='mt-auto learn-more' to="/services/ppc">
                                        <img src="/assets/learnmore-b.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='learn-more-copy mt-auto float-start' to="/services/ppc">
                                            <img src="/assets/learnmore-b.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid service-box-img service-box-img-2' src="/assets/serviceshero2.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row service-box'>
                        <div className='col-lg-6 mb-5 fade-left'>
                            <div className='row service-box-3'>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Social Media</span><br /><span>Marketing</span></h3>
                                    <Link className='mt-auto learn-more' to="/services/socialMedia">
                                        <img src="/assets/learnmore-w.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='learn-more-copy mt-auto float-start' to="/services/socialMedia">
                                            <img src="/assets/learnmore-w.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid service-box-img service-box-img-3' src="/assets/serviceshero3.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 mb-5 fade-right'>
                            <div className='row service-box-4'>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Email</span><br /><span>Marketing</span></h3>
                                    <Link className='mt-auto learn-more' to="/services/email">
                                        <img src="/assets/learnmore-b.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='learn-more-copy mt-auto float-start' to="/services/email">
                                            <img src="/assets/learnmore-b.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid service-box-img service-box-img-4' src="/assets/serviceshero4.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row service-box'>
                        <div className='col-lg-6 mb-5 fade-left'>
                            <div className='row service-box-5'>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Content</span><br /><span>Creation</span></h3>
                                    <Link className='mt-auto learn-more' to="/services/contentCreaction">
                                        <img src="/assets/learnmore-b.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='learn-more-copy mt-auto float-start' to="/services/contentCreaction">
                                            <img src="/assets/learnmore-b.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid service-box-img service-box-img-5' src="/assets/serviceshero5.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 mb-5 fade-right'>
                            <div className='row service-box-6'>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Analytics and </span><br /><span>Tracking</span></h3>
                                    <Link className='mt-auto learn-more' to="/services/analyticsTracking">
                                        <img src="/assets/learnmore-w.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>

                                        <Link className='learn-more-copy mt-auto float-start' to="/services/analyticsTracking">
                                            <img src="/assets/learnmore-w.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid service-box-img service-box-img-6' src="/assets/serviceshero6.svg" alt="" />
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

export default ServicesHero


















