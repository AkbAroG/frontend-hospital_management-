import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("dark-mode");
  };

  const handleLogout = async () => {
    await axios
      .get("http://localhost:5000/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <nav className={"container"}>
        <Link to={"/"} className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </Link>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links" style={{ fontSize: "14px" }}>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
           
            <Link to={"/doctors"} onClick={() => setShow(!show)}>
              Doctors
            </Link>
           
             <Link to={"/about"} onClick={() => setShow(!show)}>
              About
            </Link>
            {isAuthenticated && (
              <>
                <Link to={"/my-appointments"} onClick={() => setShow(!show)}>
                  My Appointments
                </Link>
              </>
            )}
          </div>
          <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {isAuthenticated ? (
              <button className="logoutBtn btn" onClick={handleLogout} style={{ fontSize: "14px" }}>
                LOGOUT
              </button>
            ) : (
              <button className="loginBtn btn" onClick={goToLogin} style={{ fontSize: "14px" }}>
                LOGIN
              </button>
            )}
          </div>
        </div>
        {/* <div className="mode-toggle" onClick={toggleDarkMode} style={{ 
          cursor: "pointer", 
          fontSize: "1.8rem", 
          position: "fixed", 
          top: "10px", 
          right: "20px", 
          zIndex: "10001",
          background: isDark ? "#333" : "#fff",
          padding: "5px",
          borderRadius: "50%",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
        }}>
          {isDark ? <MdLightMode color="#FFD700" /> : <MdDarkMode color="#271776" />}
        </div> */}
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
