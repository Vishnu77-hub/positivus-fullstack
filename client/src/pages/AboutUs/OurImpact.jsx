import React from 'react'
import '../../styles/OurImpact.css'
const OurImpact = () => {
    const stats = [
        { value: "8+", label: "Years of Experience" },
        { value: "50+", label: "Experts" },
        { value: "100+", label: "Successful Campaigns" },
        { value: "20+", label: "Industry Awards" },
        { value: "500%", label: "ROI for our clients" },
    ];
    return (
        <section className='mt-5 mb-5'>
            <div className="col-lg-12">
                <div className="ourimpact">
                    <h2 className="fade-right">Our Impact in Numbers</h2>
                    <p className="fade-left pe-lg-5">A snapshot of the milestones and achievements that drive our success</p>
                </div>
            </div>

            {/* <div className='container mt-3'>
                <div className='d-flex flex-row '>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="col-6 col-md-2 d-flex flex-column align-items-center position-relative"
                        >
                            <span className="fw-bold fs-3">{stat.value}</span>
                            <span className="text-muted small">{stat.label}</span>
                            {index !== stats.length - 1 && (
                                <div className="d-none d-md-block position-absolute top-50 translate-middle-y end-0 border-end border-dark h-100"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div> */}
               <div className="stats-container">
      <div className="stats-border"></div>
      {stats.map((stat, index) => (
        <div key={index} className="stats-item ">
            <div className='stats-box top-border'>
                <div className='top-border'>

          <span className="stats-value ">{stat.value}</span>
          <span className="stats-label">{stat.label}</span>
          </div>

          </div>
          {/* Divider for all except last item */}
          {/* {index !== stats.length - 1 && <div className="stats-divider"></div>} */}
        </div>
      ))}
    </div>
        </section>
    )
}

export default OurImpact

{/* Divider for all except last item */}