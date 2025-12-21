import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>You are logged in as admin.</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Admin;
