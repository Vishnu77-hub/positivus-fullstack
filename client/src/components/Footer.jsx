import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Footer.css'
const Footer = () => {
    return (
        <section className='mb-auto fade-in-up'>
            <div className="container">
                <div className='footer'>
                    <div className='footer1'>
                        <div className='footer-nav mt-3'>
                            <div className='d-lg-flex justify-content-center justify-content-lg-between'>
                                <Link className="display-inline" to="/">
                                    <img className="img-fluid" src="/footerlogo.png" alt="logo.png" />
                                </Link>
                                <div className=''>
                                    <ul className="d-flex flex-lg-row flex-column text-white gap-3">
                                        <li className="footer-link">
                                            <Link className=" p-1" to="/about">About Us</Link>
                                        </li>
                                        <li className="footer-link text-white">
                                            <Link className=" p-1" to="/services">Services</Link>
                                        </li>
                                        <li className="footer-link  text-white">
                                            <Link className=" p-1" to="/use-cases">Use Cases</Link>
                                        </li>
                                        <li className="footer-link  text-white">
                                            <Link className=" p-1" to="/pricing">Pricing</Link>
                                        </li>
                                        <li className="footer-link  text-white" >
                                            <Link className=" p-1" to="/blog">Blog</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className='gap-1 o-sicon'>
                                    <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                                        <img className="me-4" src="/socialicon/linkedinsocialicon.png" alt="LinkedIn" />
                                    </a>

                                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                        <img className="me-4" src="/socialicon/fbsocialicon.png" alt="LinkedIn" />
                                    </a>
                                    <a href="https://x.com/?lang=en" target="_blank" rel="noopener noreferrer">
                                        <img className="me-4" src="/socialicon/xsocialicon.png" alt="LinkedIn" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className='footer-contact mb-4'>
                            <div className='d-lg-flex justify-content-between'>
                                <div className='footer-contact-info'>
                                    <div>
                                        <h6 className='p-1'>Contact Us:</h6>
                                    </div>
                                    <div>
                                        <p>Email: info@positivus.com</p>
                                        <p>Phone: 555-567-8901</p>
                                        <p>Address: 1234 Main St <br />
                                            Moonstone City, Stardust State 12345</p>
                                    </div>
                                </div>
                                <div className='footer-contact-form d-lg-flex justify-content-between align-items-center'>
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="email" placeholder="Email" />
                                    </div>
                                    <div>
                                        <button>Subscribe to news</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='gap-1 dup-sicon'>
                            <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                                <img className="me-4" src="/socialicon/linkedinsocialicon.png" alt="LinkedIn" />
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <img className="me-4" src="/socialicon/fbsocialicon.png" alt="LinkedIn" />
                            </a>
                            <a href="https://x.com/?lang=en" target="_blank" rel="noopener noreferrer">
                                <img className="me-4" src="/socialicon/xsocialicon.png" alt="LinkedIn" />
                            </a>
                        </div>
                        <hr className='border-white' />
                        <div>
                            <div className='footer-policy d-lg-flex gap-5'>
                                <div>
                                    <p className='text-white'>© 2023 Positivus. All Rights Reserved.
                                        Privacy Policy</p>
                                </div>
                                <div>
                                    <a className='text-white' href="">Privacy Policy</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer
