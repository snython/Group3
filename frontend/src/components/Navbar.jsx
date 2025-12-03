import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // <-- HOME ICON
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <nav className="cb-navbar">
      <div className="cb-navbar-left">

        {/* BRAND */}
        <Link to="/" className="cb-logo">
          CatalystBench
        </Link>

        {/* HOME ICON */}
        <NavLink to="/" className="cb-home-icon">
          <FaHome size={20} />
        </NavLink>

        {/* USERS */}
        {token && (
          <NavLink to="/users" className={navClass}>
            Users
          </NavLink>
        )}

        {/* INCIDENTS */}
        {token && (
          <>
            <NavLink to="/incidents" className={navClass}>
              Incidents
            </NavLink>
            <NavLink to="/incidents/new" className={navClass}>
              New Incident
            </NavLink>
          </>
        )}
      </div>

      <div className="cb-navbar-right">
        {!token ? (
          <>
            <NavLink to="/login" className={navClass}>
              Sign In
            </NavLink>
            <NavLink to="/register" className="cb-btn-primary">
              Sign Up
            </NavLink>
          </>
        ) : (
          <>
            {user && <span className="cb-user">Hello, {user.name}</span>}

            <NavLink to="/profile" className={navClass}>
              My Profile
            </NavLink>

            <button onClick={handleLogout} className="cb-btn-secondary">
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}