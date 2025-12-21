import { useNavigate } from "react-router-dom";

const Member = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h2>Member Dashboard</h2>
      <p>You are logged in as a member.</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Member;
