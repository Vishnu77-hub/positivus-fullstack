import React from 'react';
import '../styles/Testimonials.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bubbleImage from '../images/bubble.png';

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="slick-arrow next-arrow" onClick={onClick}>
            <img src="/assets/Arrow right.svg" alt="" />
        </div>
    );
};

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="slick-arrow prev-arrow" onClick={onClick}>
            <img src="/assets/Arrow right.svg" alt="" />
        </div>
    );
};

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerPadding: "290px",
    centerMode: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                centerPadding: "6%",
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                centerPadding: "2%",
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                centerPadding: "0",
                dots: true
            }
        }
    ]
};


const Testimonials = () => {
    return (
        <section className='mt-5 mb-5'>
            <div className='container'>
                <div className="row mb-5 slide-down">
                    <div className="col-lg-12">
                        <div className="testimonials">
                            <h3 className="fade-right">Testimonials</h3>
                            <p className="fade-left pe-lg-5 responsive-text">Hear from Our Satisfied Clients: Read Our Testimonials to Learn More about Our Digital Marketing Services</p>
                        </div>
                    </div>
                </div>

                <div className='testimonials-box position-relative'>
                    <Slider {...settings} className="wrapper">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className='singlecarousel mt-5 mb-5 p-2'>
                                <div className='single-testimonial custom-border'>
                                    <div className='client-content responsive-client-content'
                                        style={{ position: "relative" }}>
                                        "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence."
                                        {/* Pseudo-element simulation */}
                                        <div className="bubble-icon"
                                            style={{ backgroundImage: `url(${bubbleImage})` }}></div>
                                    </div>
                                    <div
                                    style={{ marginLeft:"10%"}}
                                     className='client-info mt-5'>
                                        <h4>Jhon Smith</h4>
                                        <p>Marketing Director at XYZ Corp</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                    <div className="slick-dots-container">
                        <ul className="slick-dots"></ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
