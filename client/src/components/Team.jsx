import React from 'react'
import '../styles/Team.css'

const Team = () => {
    return (
        <section>
            <div className='container'>
                <div className="row mb-5 slide-down">
                    <div className="col-lg-12">
                        <div className="team">
                            <h3 className="fade-right">Team</h3>
                            <p className="fade-left">Meet the skilled and experienced team behind our successful digital marketing strategies</p>
                        </div>
                    </div>
                </div>
                <div className='d-flex gap-4 flex-lg-row flex-column team-box bd-highlight'>
                    <div className='box1 flex-fill bd-highlight mb-4 '>
                        <div className='p-1'>
                            <div className='d-flex flex-row'>
                                <img className='me-auto profile' src="assets/profile1.svg" alt="" />
                                <p className='m-auto mb-0 ms-0'><span className='fw-bold'>John Smith</span><br /><span>CEO and Founder</span></p>
                                <img className=' mb-auto' src="assets/linkedin.svg" alt="" />
                            </div>
                            <hr />
                            <div>
                                <p className=' pe-0'>10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy</p>
                            </div>
                        </div>
                    </div>
                    <div className='box1 flex-fill bd-highlight mb-4'>
                        <div className='p-1'>
                            <div className='d-flex flex-row'>
                                <img className='me-auto profile' src="assets/profile2.svg" alt="" />
                                <p className='m-auto mb-0 ms-0'><span className='fw-bold'>Jane Doe</span><br /><span>Director of Operations </span></p>
                                <img className=' mb-auto' src="assets/linkedin.svg" alt="" />
                            </div>
                            <hr />
                            <div>
                                <p className=' pe-0'>7+ years of experience in project management and team leadership. Strong organizational and communication skills</p>
                            </div>
                        </div>
                    </div>
                    <div className='box1 flex-fill bd-highlight mb-4'>
                        <div className='p-1'>
                            <div className='d-flex flex-row'>
                                <img className='me-auto profile' src="assets/profile3.svg" alt="" />
                                <p className='m-auto mb-0 ms-0'><span className='fw-bold'>Michael Brown</span><br /><span>Senior SEO Specialist</span></p>
                                <img className=' mb-auto' src="assets/linkedin.svg" alt="" />
                            </div>
                            <hr />
                            <div>
                                <p className=' pe-0'>5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex gap-4 flex-lg-row flex-column team-box bd-highlight'>
                    <div className='box1 flex-fill bd-highlight mb-4 '>
                        <div className='p-1'>
                        <div className='d-flex flex-row flex-fill bd-highlight'>
                                <img className='me-auto profile' src="assets/profile4.svg" alt="" />
                                <p className='m-auto mb-0 ms-0'><span className='fw-bold'>Emily Johnson</span><br /><span>PPC Manager</span></p>
                                <img className=' mb-auto' src="assets/linkedin.svg" alt="" />
                            </div>
                            <hr />
                            <div>
                                <p className=' pe-0'>3+ years of experience in paid search advertising. Skilled in campaign management and performance analysis</p>
                            </div>
                        </div>
                    </div>
                    <div className='box1 flex-fill bd-highlight mb-4'>
                        <div className='p-1'>
                        <div className='d-flex flex-row flex-fill bd-highlight'>
                                <img className='me-auto profile' src="assets/profile5.svg" alt="" />
                                <p className='m-auto mb-0 ms-0'><span className='fw-bold'>Brian Williams</span><br /><span>Social Media Specialist</span></p>
                                <img className=' mb-auto' src="assets/linkedin.svg" alt="" />
                            </div>
                            <hr />
                            <div>
                                <p className=' pe-0'>4+ years of experience in social media marketing. Proficient in creating and scheduling content, analyzing metrics, and building engagement</p>
                            </div>
                        </div>
                    </div>
                    <div className='box1 flex-fill bd-highlight mb-4'>
                        <div className='p-1'>
                        <div className='d-flex flex-row flex-fill bd-highlight'>
                                <img className='me-auto profile' src="assets/profile6.svg" alt="" />
                                <p className='m-auto mb-0 ms-0'><span className='fw-bold'>Sarah Kim</span><br /><span>Content Creator</span></p>
                                <img className=' mb-auto' src="assets/linkedin.svg" alt="" />
                            </div>
                            <hr />
                            <div>
                                <p className=' pe-0'>2+ years of experience in writing and editing
                                Skilled in creating compelling, SEO-optimized content for various industries</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='team-btn display-block'>
                    <button className='btn-animate'>See all team</button>
                </div>

            </div>

        </section>
    )
}

export default Team
