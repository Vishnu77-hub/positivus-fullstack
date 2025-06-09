import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import '../../styles/Services.css';
import { Link } from "react-router-dom";




const servicesContent = {
    seo: {
        title: 'Search Engine',
        titleSpace: 'Optimization',
        desc: 'SEO is the process of improving your website’s visibility on search engines like Google. By optimizing your content and site structure, we help your business rank higher in search results, driving more organic traffic and potential customers.',
        id: "SEO",
        pointHead1: "Website Audit & Analysis",
        pointHead2: "Keyword Research & Strategy",
        pointHead3: "On-Page Optimization",
        pointHead4: "Content Creation & Optimization",
        pointHead5: "Link Building",
        pointHead6: "Monitoring & Reporting",
        pointDesc1: "We begin by conducting a comprehensive audit to identify areas for improvement, including technical issues, content quality, and keyword opportunities.",
        pointDesc2: "Our team researches the most relevant and high-impact keywords for your business, ensuring that we target terms that drive qualified traffic.",
        pointDesc3: "We optimize your website’s structure, meta tags, and content to make it search engine-friendly, improving your visibility and relevance.",
        pointDesc4: "High-quality content is key to SEO. We create or refine content that engages your audience while aligning with search engine algorithms.",
        pointDesc5: "We develop a link-building strategy to acquire authoritative, relevant backlinks that boost your domain authority and search rankings.",
        pointDesc6: "We continuously monitor performance, track rankings, and provide detailed reports, making data-driven adjustments to maintain and improve your results.",
    },
    ppc: {
        title: 'Pay-Per Click',
        titleSpace: 'Advertising',
        desc: 'PPC is all about ads that charge per click, like Google Ads.',
        id: "PPC",

        pointHead1: "Campaign Strategy & Planning",
        pointDesc1: "We develop customized PPC strategies based on your business goals, budget, and target audience for maximum ROI.",

        pointHead2: "Keyword Research & Bidding",
        pointDesc2: "We identify high-performing keywords and optimize bidding strategies to maximize ad visibility and cost-efficiency.",

        pointHead3: "Ad Creation & Copywriting",
        pointDesc3: "Our team crafts compelling ad copy and visuals that capture attention and drive clicks.",

        pointHead4: "Landing Page Optimization",
        pointDesc4: "We optimize landing pages to improve user experience, reduce bounce rates, and boost conversion rates.",

        pointHead5: "A/B Testing",
        pointDesc5: "We continuously test different ad elements to identify what performs best and refine campaigns accordingly.",

        pointHead6: "Performance Monitoring & Reporting",
        pointDesc6: "We track key metrics and deliver detailed reports to ensure campaign success and continuous improvement.",

    },
    socialMedia: {
        title: 'Social Media',
        titleSpace: 'Marketing',
        desc: 'Promote your brand across all social platforms.',
        id: "Social Media",

        pointHead1: "Social Strategy Development",
        pointDesc1: "We build a tailored social media strategy that aligns with your brand and business goals.",

        pointHead2: "Platform Selection & Setup",
        pointDesc2: "We help you choose the right platforms and set up optimized profiles for brand consistency and reach.",

        pointHead3: "Content Calendar & Creation",
        pointDesc3: "We design engaging, share-worthy content scheduled to go live at optimal times for audience engagement.",

        pointHead4: "Community Engagement",
        pointDesc4: "We actively manage your social media presence, responding to comments and fostering customer relationships.",

        pointHead5: "Paid Social Campaigns",
        pointDesc5: "We run targeted ad campaigns to expand reach, boost engagement, and drive conversions.",

        pointHead6: "Analytics & Performance Tracking",
        pointDesc6: "We monitor social metrics and optimize strategies based on performance data to maximize ROI.",

    },
    email: {
        title: 'Email',
        titleSpace: 'Marketing',
        desc: 'Reach your audience directly through email campaigns.',
        id: "Email",

        pointHead1: "Audience Segmentation",
        pointDesc1: "We segment your email list based on behaviors and demographics to deliver highly targeted content.",

        pointHead2: "Campaign Planning",
        pointDesc2: "We strategize and schedule email campaigns to match your business goals and marketing calendar.",

        pointHead3: "Template Design",
        pointDesc3: "We design responsive, visually appealing email templates that reflect your brand and engage readers.",

        pointHead4: "Copywriting & Content",
        pointDesc4: "We write compelling, action-oriented content tailored to each campaign and audience segment.",

        pointHead5: "Automation & Triggers",
        pointDesc5: "We set up automated workflows and trigger-based emails to nurture leads and retain customers.",

        pointHead6: "Open & Click Tracking",
        pointDesc6: "We analyze open rates, click-throughs, and conversions to optimize future campaigns for better results.",

    },
    contentCreaction: {
        title: 'Content ',
        titleSpace: 'Creation',
        desc: 'We create content that converts and tells your brand story.',
        id: "Content",

        pointHead1: "Content Strategy",
        pointDesc1: "We develop a comprehensive content plan that aligns with your SEO goals and brand messaging.",

        pointHead2: "Blog & Article Writing",
        pointDesc2: "We create informative, keyword-rich blog posts and articles that engage readers and rank well on search engines.",

        pointHead3: "Visual Content Design",
        pointDesc3: "We design eye-catching visuals, infographics, and social graphics that enhance your message and brand.",

        pointHead4: "Video Production",
        pointDesc4: "We produce high-quality videos tailored to your audience, from explainers to testimonials and more.",

        pointHead5: "Content Repurposing",
        pointDesc5: "We extend content life by repurposing articles, videos, and graphics into new formats for multiple platforms.",

        pointHead6: "Content Performance Tracking",
        pointDesc6: "We monitor content engagement and adjust strategies to improve reach, retention, and conversions.",

    },
    analyticsTracking: {
        title: 'Analytics & ',
        titleSpace: 'Tracking',
        desc: 'Track, analyze, and improve your marketing performance.',
        id: "Analytics",


        pointHead1: "Setup & Integration",
        pointDesc1: "We implement analytics tools like Google Analytics, Tag Manager, and custom tracking setups.",

        pointHead2: "Goal & Event Tracking",
        pointDesc2: "We define and track key actions on your site to measure progress toward business objectives.",

        pointHead3: "Custom Dashboards",
        pointDesc3: "We build custom dashboards to present your most important metrics in an easily digestible format.",

        pointHead4: "Traffic Source Analysis",
        pointDesc4: "We analyze where your traffic comes from and how each channel contributes to conversions.",

        pointHead5: "Behavior & Funnel Analysis",
        pointDesc5: "We examine user behavior and funnel stages to identify drop-offs and areas for optimization.",

        pointHead6: "Reporting & Insights",
        pointDesc6: "We provide detailed reports and actionable insights to guide ongoing marketing strategy.",

    },
};


const ServicesDetail = () => {
    const { servicesId } = useParams();
    const content = servicesContent[servicesId];
    // const process = processContent[servicesId];

    if (!content) return <h2>Service not found</h2>;

    return (

        <section>
            <div className="container">
                <div>
                    <div className='px-2 container pb-5'>
                        {/* Hero Section with Faster Fade-In Effect */}
                        <motion.section
                            className="services-section"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="container">
                                <div className="row d-flex flex-column-reverse flex-lg-row align-items-center text-center text-lg-start">
                                    {/* Right Content (Image) - Slide in from Right */}
                                    <motion.div
                                        className="pb-lg-5 col-12 col-lg-6 d-none d-lg-block"
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                    >
                                        <img className="img-fluid" src="/assets/services.png" alt="illustration" />
                                    </motion.div>
                                    {/* Left Content (Text) */}
                                    <motion.div
                                        className="col-12 col-lg-6 d-flex flex-column align-items-center align-items-lg-start"
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.3 }}
                                        >
                                            Together for success
                                        </motion.h1>

                                        {/* Image below the heading on small screens */}
                                        <motion.div
                                            className="d-block d-lg-none mb-3"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                        >
                                            <img className="img-fluid" src="/assets/services.png" alt="illustration" />
                                        </motion.div>

                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.4 }}
                                            className='pe-lg-5'
                                        >
                                            At postivivus , we help businesses grow by combining creativity, innovation, and data-driven strategies. Together, we build a future of shared success.
                                        </motion.p>

                                    </motion.div>
                                </div>
                            </div>
                        </motion.section>
                    </div>
                </div>

                <div className="services-ranking p-xl-5 p-2 pt-4 pb-4 d-flex flex-column flex-lg-row gap-3 text-white mb-5">
                    {/* Image and title in one row always */}
                    <div className="d-flex gap-3 col-lg-4 col-12">
                        <div>
                            <img
                                className="img-fluid p-3"
                                src="/assets/vector.svg"
                                alt="Service Vector"
                            />
                        </div>

                        <div className="p-2 d-flex">
                            <h3 className="mb-0"><span>{content.title}</span><br /><span>{content.titleSpace}</span></h3>
                        </div>
                    </div>


                    {/* Description - stacked below on small screens, beside on large */}
                    <div className="p-2 px-lg-3 col-12 col-lg-7 align-items-end">
                        <p>{content.desc}</p>
                        <button>Book My Ranking</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-12">
                        <div className="services-title">
                            <h3 className='fade-right ms-lg-1'>How we work: <br className="responsive-br" /> {content.id} process</h3>
                            <p className='fade-left pe-xl-5'>Our step-by-step {content.id} process ensures your website ranks higher, attracts more traffic, and drives lasting results.</p>
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className='services-points'>
                        <div className='services-point1 p-2 mb-3 d-flex'>
                            <div className='p-lg-4'>
                                <img className='img-fluid px-sm-3' src="/assets/servicespoint1.png" alt="" />
                            </div>
                            <div className='p-2 pt-lg-4'>
                                <h4 className='pb-3 mt-lg-3'>{content.pointHead1}</h4>
                                <p className='p-1 pe-xl-5'>{content.pointDesc1}</p>
                            </div>
                        </div>
                        <div className='services-point1 p-2 mb-3 d-flex'>
                            <div className='p-lg-4'>
                                <img className='img-fluid px-sm-3' src="/assets/servicespoint2.png" alt="" />
                            </div>
                            <div className='p-2 pt-lg-4'>
                                <h4 className='pb-3 mt-lg-3'>{content.pointHead2}</h4>
                                <p className='p-1 pe-xl-5'>{content.pointDesc2}</p>
                            </div>
                        </div>
                        <div className='services-point1 p-2 mb-3 d-flex'>
                            <div className='p-lg-4'>
                                <img className='img-fluid px-sm-3' src="/assets/servicespoint3.png" alt="" />
                            </div>
                            <div className='p-2 pt-lg-4'>
                                <h4 className='pb-3 mt-lg-3'>{content.pointHead3}</h4>
                                <p className='p-1 pe-xl-5'>{content.pointDesc3}</p>
                            </div>
                        </div>
                        <div className='services-point1 p-2 mb-3 d-flex'>
                            <div className='p-lg-4'>
                                <img className='img-fluid px-sm-3' src="/assets/servicespoint4.png" alt="" />
                            </div>
                            <div className='p-2 pt-lg-4'>
                                <h4 className='pb-3 mt-lg-3'>{content.pointHead4}</h4>
                                <p className='p-1 pe-xl-5'>{content.pointDesc4}</p>
                            </div>
                        </div>
                        <div className='services-point1 p-2 mb-3 d-flex'>
                            <div className='p-lg-4'>
                                <img className='img-fluid px-sm-3' src="/assets/servicespoint5.png" alt="" />
                            </div>
                            <div className='p-2 pt-lg-4'>
                                <h4 className='pb-3 mt-lg-3'>{content.pointHead5}</h4>
                                <p className='p-1 pe-xl-5'>{content.pointDesc5}</p>
                            </div>
                        </div>
                        <div className='services-point1 p-2 mb-3 d-flex'>
                            <div className='p-lg-4'>
                                <img className='img-fluid px-sm-3' src="/assets/servicespoint6.png" alt="" />
                            </div>
                            <div className='p-2 pt-lg-4'>
                                <h4 className='pb-3 mt-lg-3'>{content.pointHead6}</h4>
                                <p className='p-1 pe-xl-5'>{content.pointDesc6}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="row mt-5">
                        <div className="col-lg-12 ">
                            <div className="services-title">
                                <h3 className='fade-right'>Case Studies</h3>
                                <p className='fade-left'>Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies</p>
                            </div>
                        </div>
                    </div>

                    <div className='case-studies-box fade-in'>
                        <div className=' ms-2 row p-5 pb-5'>
                            <div className='col-4 position-relative p-3 pb-1 pe-5'>
                                <h3 className='text-white'><span>E-commerce</span><br /><span>Fashion Brand</span> </h3>
                                <p className='text-white pe-lg-3'>
                                    We implemented a tailored SEO strategy that boosted organic search rankings, leading to a 150% increase in website traffic and a 50% rise in online sales within six months.
                                </p>
                                <a className='mt-auto' href="#"><img src="/assets/learnmorelink.svg" alt="" /></a>
                                <div className='vertical-line'></div>
                            </div>
                            <div className='col-4 position-relative p-3 pb-1 pe-5'>
                                <h3 className='text-white'><span>Local Restaurant</span> <span>Chain</span></h3>
                                <p className='text-white '>
                                    By optimizing local SEO and enhancing Google My Business profiles, we increased visibility, driving a 300% boost in online reservations and foot traffic.
                                </p>
                                <a className='mt-auto' href="#"><img src="/assets/learnmorelink.svg" alt="" /></a>
                                <div className='vertical-line ms-3'></div>
                            </div>
                            <div className='col-4 p-3 pb-1 pe-5'>
                                <h3 className='text-white'>Healthcare Provider</h3>
                                <p className='text-white'>
                                    Through content optimization and targeted keyword strategy, we helped a healthcare provider rank on the first page for critical services, resulting in a 180% increase in inquiries and patient bookings.
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
                </div>

                <div>
                    <div className="row mt-5 mb-4">
                        <div className="col-xl-12">
                            <div className="services-title">
                                <h3 className='fade-right ms-lg-1'>Other Services</h3>
                                <p className='fade-left pe-xl-5'>Our step-by-step {content.id} process ensures your website ranks higher, attracts more traffic, and drives lasting results.</p>
                            </div>
                        </div>
                    </div>
                    <div className='row services-box '>
                        <div className='col-lg-6 mb-5 fade-left'>
                            <div className='row services-box-1'>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Search engine</span><br /><span>optimization</span></h3>
                                    <Link className='mt-auto learn-more-services' to="/services/seo">
                                        <img src="/assets/learnmore-b.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='learn-more-services-copy mt-auto float-start' to="/services/seo">
                                            <img src="/assets/learnmore-b.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid services-box-img services-box-img-1' src="/assets/serviceshero1.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 mb-5 fade-right'>
                            <div className='row services-box-2 '>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Pay-per-click</span><br /><span>advertising</span></h3>
                                    <Link className='mt-auto learn-more-services' to="/services/ppc">
                                        <img src="/assets/learnmore-b.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='learn-more-services-copy mt-auto float-start' to="/services/ppc">
                                            <img src="/assets/learnmore-b.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid services-box-img services-box-img-2' src="/assets/serviceshero2.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row services-box'>
                        <div className='col-lg-6 mb-5 fade-left'>
                            <div className='row services-box-3'>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Social Media</span><br /><span>Marketing</span></h3>
                                    <Link className='mt-auto learn-more-services' to="/services/socialMedia">
                                        <img src="/assets/learnmore-b.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='learn-more-services-copy mt-auto float-start' to="/services/socialMedia">
                                            <img src="/assets/learnmore-b.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid services-box-img services-box-img-3' src="/assets/serviceshero3.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 mb-5 fade-right'>
                            <div className='row services-box-4'>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Email</span><br /><span>Marketing</span></h3>
                                    <Link className='mt-auto learn-more-services' to="/services/email">
                                        <img src="/assets/learnmore-b.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='learn-more-services-copy mt-auto float-start' to="/services/email">
                                            <img src="/assets/learnmore-b.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid services-box-img services-box-img-4' src="/assets/serviceshero4.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row services-box'>
                        <div className='col-lg-6 mb-5 fade-left'>
                            <div className='row services-box-5'>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Content</span><br /><span>Creation</span></h3>
                                    <Link className='mt-auto learn-more-services' to="/services/contentCreaction">
                                        <img src="/assets/learnmore-b.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='learn-more-services-copy mt-auto float-start' to="/services/contentCreaction">
                                            <img src="/assets/learnmore-b.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid services-box-img services-box-img-5' src="/assets/serviceshero5.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 mb-5 fade-right'>
                            <div className='row services-box-6'>
                                <div className='col-xl-6 col-12 pb-lg-0 pb-4 pt-lg-0 pt-3'>
                                    <h3><span>Analytics and </span><br /><span>Tracking</span></h3>
                                    <Link className='mt-auto learn-more-services' to="/services/analyticsTracking">
                                        <img src="/assets/learnmore-b.svg" alt="" />
                                        <span>Learn more</span>
                                    </Link>
                                </div>

                                <div className='align-self-end col-xl-6 col-12 '>
                                    <div className='d-flex justify-content-between'>

                                        <Link className='learn-more-services-copy mt-auto float-start' to="/services/analyticsTracking">
                                            <img src="/assets/learnmore-b.svg" alt="Learn more" />
                                        </Link>
                                        <img className='img-fluid services-box-img services-box-img-6' src="/assets/serviceshero6.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            <div className='services-journey'>
                <div className='row'>
                    <div className='col-lg-6 mb-5 fade-left'>
                        <h3>
                            Ready to Elevate Your Search Rankings?
                        </h3>
                        <hr />

                        <p className='pe-lg-3 pb-4'>Our proven {content.id} strategies are designed to help your business achieve long-lasting success in search engines. Whether you want to boost organic traffic, improve keyword rankings, or increase conversions, we’re here to make it happen.</p>

                        <p className='fw-bold pb-2'>Let’s work together to grow your online presence.</p>

                        <button className='services-journey-btn text-center p-3'>Start My {content.id} Journey</button>
                    </div>
                    
             

                <div className='col-lg-6 ms-auto me-auto align-items-center text-center mb-auto mt-auto'>
                    <img className='img-fluid' src="/assets/services-journey.png" alt="" />
                    <button className='services-journey-btn-copy text-center mt-3 p-3'>Start My {content.id} Journey</button>
                </div>
            </div>
            </div>

                {
                    /* <div className='container'>
                           <h1>{process.title}</h1>
                           <p>{process.desc}</p>
                           <p>hello {process.processId} world</p>
                       </div> */
                }

            </div>
        </section>
    );
};

export default ServicesDetail;
