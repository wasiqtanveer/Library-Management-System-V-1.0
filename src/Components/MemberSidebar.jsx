import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

const MemberSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h3>Member</h3>

      <nav>
        <p>
          <Link to="/member/books">Books</Link>
        </p>

        <p>
          <Link to="/member/borrowed">Borrowed Books</Link>
        </p>

        <p>
          <button onClick={handleLogout} className="logout-btn" style={{marginTop: '20px', width: '100%'}}>
            Logout
          </button>
        </p>
      </nav>
    </div>
  );
};

export default MemberSidebar;