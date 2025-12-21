import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import MemberSidebar from "../Components/MemberSidebar";
import "../styles/auth.css";

const MemberLayout = () => {

  //----------------------- just for styling purposes -----------------------// 
  // 1. Add state to control the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // 2. Apply the dynamic 'menu-open' class
    <div className={`layout ${isMenuOpen ? 'menu-open' : ''}`}>
      
      {/* 3. The Hamburger Toggle Button */}
      <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? "✕" : "☰"}
      </button>

      {/* 4. Overlay for mobile to close menu when clicking the content area */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}
 {/*  //----------------------- just for styling purposes -----------------------//  */}
      <MemberSidebar />
      
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;