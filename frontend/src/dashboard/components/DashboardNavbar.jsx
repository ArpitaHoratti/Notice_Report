import { LogOut } from "lucide-react";

function DashboardNavbar({ user }) {
  return (
    <header className="dashboard-navbar">

      <div className="dashboard-brand">

        <img
          src="/logo.png"
          alt="KLE Society Logo"
          className="dashboard-logo"
        />

        <div className="dashboard-brand-text">

          <h1>
            WORKFLOW MANAGEMENT SYSTEM
          </h1>

          <p>
            KLE BCA PC JABIN SCIENCE COLLEGE
          </p>

        </div>

      </div>

      <div className="dashboard-user-area">

        <div className="dashboard-user">

          <h3>
            {user?.name || "Dr. Anil Kumar"}
          </h3>

          <span>
            ROLE: {user?.role || "TEACHER"}
          </span>

        </div>

        <button className="dashboard-logout">

          <LogOut size={14} />

          <span>
            Logout
          </span>

        </button>

      </div>

    </header>
  );
}

export default DashboardNavbar;