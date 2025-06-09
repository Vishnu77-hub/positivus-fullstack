import React from 'react'
import '../styles/CaseStudies.css'
const CaseStudies = () => {


    return (
        <section className='container mb-5 pt-5'>
            <div className="row">
                <div className="col-lg-12 ">
                    <div className="case-studies">
                        <h3 className='fade-right'>Case Studies</h3>
                        <p className='fade-left'>Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies</p>
                    </div>
                </div>
            </div>


            <div className='case-studies-box fade-in'>
                <div className=' ms-2 row p-5 pb-5'>
                    <div className='col-4 position-relative p-3 pb-1 pe-5'>
                        <p className='text-white pe-5'>
                            For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.
                        </p>
                        <a className='mt-auto' href="#"><img src="/assets/learnmorelink.svg" alt="" /></a>
                        <div className='vertical-line'></div>
                    </div>
                    <div className='col-4 position-relative p-3 pb-1 pe-5'>
                        <p className='text-white '>
                            For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.
                        </p>
                        <a className='mt-auto' href="#"><img src="/assets/learnmorelink.svg" alt="" /></a>
                        <div className='vertical-line ms-3'></div>
                    </div>
                    <div className='col-4 p-3 pb-1 pe-5'>
                        <p className='text-white ms-4'>
                            For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.
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
        </section >
    )
}

export default CaseStudies
