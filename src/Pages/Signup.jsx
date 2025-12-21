import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/auth.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const existingMembers = JSON.parse(localStorage.getItem("members")) || [];

    if (existingMembers.find((user) => user.username === username)) {
      alert("Username already exists. Please choose a different one.");
      return;
    }

    const newMember = { username, password };
    const updatedMembers = [...existingMembers, newMember];

    localStorage.setItem("members", JSON.stringify(updatedMembers));
    alert("Account created successfully! Please login.");
    navigate("/Login");
  };

  return (
    <div className="auth-wrapper"> {/* Changed from app-center */}
      <div className="auth-container"> {/* Changed from signup-container */}
        <h2>Sign Up</h2>

        <form className="library-form" onSubmit={handleSignup}>
          <label htmlFor="username">Username:</label>
          <input
            className="library-input"
            type="text"
            placeholder="Choose a username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            className="library-input"
            type="password"
            placeholder="Choose a password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="library-btn">Create Account</button>
        </form>

        <p>
          Already have an account?
          <Link to="/Login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;