import React, { useState } from 'react'
import '../styles/ContactUs.css'
const ContactUs = () => {
    const [activeTab, setActiveTab] = useState("home");
    return (
        <section style={{ marginTop: "100px" }}>
            <div className='mt-2 container'>
                <div className="row mb-5">
                    <div className="col-lg-12">
                        <div className="contactus">
                            <h3 className="fade-right">Contact Us</h3>
                            <p className="fade-left pe-lg-5 responsive-text">Connect with Us: Let's Discuss Your Digital Marketing Needs</p>
                        </div>
                    </div>
                </div>

                <div className='row contact-wrap fade-right ps-lg-5 pt-lg-5 pt-4'>
                    <div className="col-lg-7">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === "home" ? "active" : ""}`}
                                    onClick={() => setActiveTab("home")}
                                    type="button"
                                    role="tab"
                                >
                                    <label className="radiocontainer">
                                        Say Hi
                                        <input type="radio" name="radio" checked={activeTab === "home"} readOnly />
                                        <span className="checkmark"></span>
                                    </label>
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                                    onClick={() => setActiveTab("profile")}
                                    type="button"
                                    role="tab"
                                >
                                    <label className="radiocontainer">
                                        Get a Quote
                                        <input type="radio" name="radio" checked={activeTab === "profile"} readOnly />
                                        <span className="checkmark"></span>
                                    </label>
                                </button>
                            </li>
                        </ul>

                        <div className="tab-content" id="myTabContent">
                            {activeTab === "home" && (
                                <div className="tab-pane fade show active">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="name">Name*</label>
                                            <input type="text" className="form-control" id="name" placeholder="Name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email*</label>
                                            <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message">Message*</label>
                                            <textarea className="form-control" id="message" rows="3"></textarea>
                                        </div>
                                          <div className='form-group contact-btn display-block'>
                                            <button className='btn-animate'>Send Message</button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeTab === "profile" && (
                                <div className="tab-pane fade show active">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="name">Name*</label>
                                            <input type="text" className="form-control" id="name" placeholder="Name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email*</label>
                                            <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="projectType">Project Type*</label>
                                            <select className="form-control" id="projectType">
                                                <option>Design</option>
                                                <option>Development</option>
                                                <option>Design and Development</option>
                                                <option>Customization</option>
                                                <option>SEO</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message">Message*</label>
                                            <textarea className="form-control" id="message" rows="3"></textarea>
                                        </div>
                                        <div className='form-group contact-btn display-block'>
                                            <button className='btn-animate'>Send Quote</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='col-lg-5'>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default ContactUs
