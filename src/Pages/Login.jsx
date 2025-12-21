import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/auth.css";
import credentials from "../data/credentials.json";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedMembers = JSON.parse(localStorage.getItem("members")) || [];
    const localMember = storedMembers.find((user) => user.username === username && user.password === password);
    
    if (localMember) {
      localStorage.setItem("user", JSON.stringify({username, role: "member"}));
      navigate("/member");
      return;
    }

    const matchAdmin = credentials.admins.find((user) => user.username === username && user.password === password);
    if (matchAdmin) {
      localStorage.setItem("user", JSON.stringify({username, role: "admin"}));
      navigate("/admin");
      return;
    }
    
    const matchUser = credentials.members.find((user) => user.username === username && user.password === password);
    if (matchUser) {
      localStorage.setItem("user", JSON.stringify({username, role: "member"}));
      navigate("/member");
      return;
    }

    alert("Invalid username or password"); 
  };
    
  return (
    <div className="auth-wrapper"> {/* Updated */}
      <div className="auth-container"> {/* Updated */}
        <h2>Login</h2>

        <form className="library-form" onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <input
            className="library-input" 
            type="text" 
            placeholder="Enter your Username" 
            value={username} 
            required
            onChange={(e) => setUsername(e.target.value)} 
          />

          <label htmlFor="password">Password:</label>
          <input
            className="library-input" 
            type="password" 
            placeholder="Enter your Password" 
            value={password} 
            required
            onChange={(e) => setPassword(e.target.value)} 
          />

          <button type="submit" className="library-btn">Login</button>
        </form>

        <p>
          Haven't made an account yet?
          <Link to="/Signup"> Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;