import React from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import "../styles/auth.css";



const AdminSidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => 
    {
      localStorage.removeItem("user");
      navigate("/login");
    };

  return (
    <div className='sidebar'>
      <h3>Admin</h3>

      <nav>
        <p>
            <Link to="/Admin">Dashboard</Link> 
        </p>
        <p>
            <Link to="/Admin/ManageBooks">Manage Books</Link>
        </p>

        <p>
            <Link to="/Admin/borrowed">Borrowed Books</Link>
        </p>

        <p>
                <button onClick={handleLogout} className='logout-btn'>Logout</button>
        </p>
      </nav>
    </div>
  )
}

export default AdminSidebar
