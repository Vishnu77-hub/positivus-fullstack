import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { IoMdMenu } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import axios from 'axios';



const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // 📌 Check login state on mount + when location changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
    console.log("Login state: ", !!token); // Log login state
    
    if (window.innerWidth < 1200) { // 1200px is the 'xl' breakpoint
      setIsOpen(false);
    }
  }, [location]); // Ensure this effect runs when location changes

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
  
      // Call the logout API to update backend
      await axios.post(`${backendUrl}/api/user/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // After backend update, clear token and redirect
      localStorage.removeItem("token");
      console.log("Logging out...");
      setIsLoggedIn(false);
      navigate("/auth");
  
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`container-fluid ${scrolled ? "sticky-navbar" : ""}`}>
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-xl position-relative">
            <div className="container">
              <div className="col-xl-3 col-12 d-flex justify-content-between">
                <Link className="navbar-brand col-6 col-xl-12 col-xxl-8" to="/">
                  <img className="img-fluid" onClick={ScrollToTop()} src="/assets/logo.svg" alt="logo.svg" />
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  style={{ paddingLeft: "35%", zIndex: 1050 }}
                >
                  <IoMdMenu color="black" size={30} />
                </button>
              </div>
              <div
                className={`collapse navbar-collapse justify-content-end ${isOpen ? "show" : ""}`}
                id="navbarSupportedContent"
                style={{
                  position: isOpen ? "absolute" : "static",
                  top: isOpen ? "100%" : "auto",
                  left: 0,
                  width: "100%",
                  backgroundColor: isOpen ? "#F7F7F7" : "transparent",
                  zIndex: 1000,
                  boxShadow: isOpen ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
                }}
              >
                <ul className="navbar-nav col-11 col-xxl-9">
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link p-1 ${isActive ? "active-tab" : "text-black"}`
                      }
                      to="/about"
                    >
                      About Us
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link p-1 ${isActive ? "active-tab" : "text-black"}`
                      }
                      to="/services"
                    >
                      Services
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link p-1 ${isActive ? "active-tab" : "text-black"}`
                      }
                      to="/use-cases"
                    >
                      Use Cases
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link p-1 ${isActive ? "active-tab" : "text-black"}`
                      }
                      to="/pricing"
                    >
                      Pricing
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link p-1 ${isActive ? "active-tab" : "text-black"}`
                      }
                      to="/my-subscriptions"
                    >
                      User
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link p-3 btn border border-black rounded-3 ${isActive ? "active-tab" : "text-black"}`
                      }
                      to="/quote"
                    >
                      Request a quote
                    </NavLink>
                  </li>

                  {/* ✅ Show Logout if logged in */}
                  <li className="nav-item">
                    {isLoggedIn ? (
                      <button
                        onClick={handleLogout}
                        className="nav-link btn text-black border-0"
                      >
                        Logout
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/auth")}
                        className="nav-link btn border-0 text-black"
                      >
                        Login
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
