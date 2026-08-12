import { LogOut } from "lucide-react";

function Navbar({ user }) {
  return (
    <header className="navbar">
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

      <div className="navbar-right">
        <div className="user-info">
          <h3>{user.name}</h3>
          <span>{user.role}</span>
        </div>

        <button className="logout-btn">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;