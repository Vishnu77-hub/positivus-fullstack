import React from "react";
import "../styles/LogoCarousel.css";

const logos = [
    "/assets/companylogo/logo1.svg",
    "/assets/companylogo/logo2.svg",
    "/assets/companylogo/logo3.svg",
    "/assets/companylogo/logo4.svg",
    "/assets/companylogo/logo5.svg",
    "/assets/companylogo/logo6.svg"
];

// Duplicate logos for seamless looping
const duplicatedLogos = [...logos, ...logos];

const LogoCarousel = () => {
    // Ensure the animation plays correctly

    return (
        <div className="logo-carousel">
            <div className="logo-container container">
                <div className="logo-track">
                    {duplicatedLogos.map((logo, index) => (
                        <div key={index} className="logo-item">
                            <img src={logo} alt={`brand-logo-${index}`} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="logo-copy">
                <div className="logo-container container">
                    <div className="logo-track">
                        {duplicatedLogos.map((logo, index) => (
                            <div key={index} className="logo-item">
                                <img src={logo} alt={`brand-logo-${index}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoCarousel;
