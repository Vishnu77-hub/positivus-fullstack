import React, { useState } from 'react';
import processSteps from '../utlis/Working';
import { FaMinus, FaPlus } from "react-icons/fa";
import '../styles/Working.css';

const Working = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="container fade-in">
            <div className="row mb-5 slide-down">
                <div className="col-lg-12">
                    <div className="working">
                        <h3 className="fade-right"><span>Our Working <span className='wor'>Process</span></span></h3>
                        <p className="fade-left">Step-by-Step Guide to Achieving Your Business Goals</p>
                    </div>
                </div>
            </div>

            <div>
                {processSteps.map((step, i) => (
                    <div key={i} className={`step-container ${openIndex === i ? "border-green" : "border-gray"} fade-in`}>
                        <button
                            className={`step-button ${openIndex === i ? "bg-green" : "bg-gray"}`}
                            onClick={() => handleToggle(i)}
                        >
                            <div className="step-header">
                                <h1 className="step-number">{step.number}</h1>
                                <h3 className="step-title">{step.question}</h3>
                            </div>
                            <div className={`toggle-icon ${openIndex === i ? "rotate" : ""}`}>
                                {openIndex === i ? <FaMinus /> : <FaPlus />}
                            </div>
                        </button>
                        <div
                            className={`step-content-wrapper ${openIndex === i ? "open" : ""}`}
                        >
                            <div className={`step-content ${openIndex === i ? "bg-green" : "bg-gray"}`}>
                                <hr className="content-divider" />
                                <p>{step.answer}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Working;
