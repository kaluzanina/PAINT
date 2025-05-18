import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <button className="logout-button" onClick={handleLogout}>
        Wyloguj
      </button>
      <main className="dashboard-main">
        <h1>Witaj w Dashboardzie!</h1>
      </main>
    </div>
  );
}
