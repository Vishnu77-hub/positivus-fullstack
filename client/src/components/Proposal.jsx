import React from 'react'
import '../styles/Proposal.css'

const Proposal = () => {
    return (
        <div className='container-lg mb-5'>
            <div className='container proposal mb-5 mt-5 fade-in'>
                <div className='row'>
                    <div className='col-lg-6 col-12'>
                        <div className='box1'>
                            <div className='box1-content p-4 pe-3'>
                                <h3>Let’s make things happen</h3><br />
                                <p className='pe-lg-2'>Contact us today to learn more about how our digital marketing services can help your business grow and succeed online.</p>
                                <button className='display-inline mx-auto mx-lg-0 btn-animate'>Get your proposal</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='proposal-img position-relative slide-in'>
                            <img src="/assets/proposal.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Proposal
