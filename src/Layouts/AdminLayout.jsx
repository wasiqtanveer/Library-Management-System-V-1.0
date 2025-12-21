import React, { useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {


   //----------------------- just for styling purposes -----------------------// 
  // 1. Create a state to track if the menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. Helper to toggle the menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    /* 3. Add 'menu-open' class dynamically if isMenuOpen is true */
    <div className={`layout ${isMenuOpen ? 'menu-open' : ''}`}>
      
      {/* 4. The Hamburger Button (Mobile Only) */}
      <button className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? "✕" : "☰"}
      </button>

      {/* 5. Overlay to close menu when clicking outside (Mobile Only) */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}
{/*  //----------------------- just for styling purposes -----------------------//  */}
      <AdminSidebar />
      
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout