import { LogOut } from "lucide-react";
import "./Navbar.css";

function Navbar({ user, onLogout }) {
  return (
    <header className="navbar">

      {/* LEFT SIDE */}
      <div className="navbar-left">

        <img
          src="/logo.png"
          alt="College Logo"
          className="navbar-logo"
        />

        <div>
          <h1 className="navbar-title">
            Workflow Management System
          </h1>

          <p className="navbar-subtitle">
            KLE BCA PC Jabin Science College
          </p>
        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="navbar-right">

        <div className="user-info">
          <h3>{user?.name}</h3>

          <span>
            {user?.role}
          </span>
        </div>


        {/* LOGOUT BUTTON */}
        <button
          className="logout-btn"
          onClick={onLogout}
          type="button"
        >
          <LogOut size={18} />

          <span>
            Logout
          </span>
        </button>

      </div>

    </header>
  );
}

export default Navbar;