import {
  LayoutDashboard,
  FilePlus,
  FileText,
  Archive,
  Clock,
  CheckCircle,
  XCircle,
  User,
  LogOut,
} from "lucide-react";

import "./Sidebar.css";

function Sidebar({
  setCurrentPage,
}) {

  const goTo = (page) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <aside className="sidebar">

      <nav className="sidebar-nav">

        {/* Dashboard */}

        <button
          className="sidebar-item"
          onClick={() => goTo("dashboard")}
        >
          <LayoutDashboard size={21} />

          <span>
            Dashboard
          </span>
        </button>


        {/* Create Notice */}

        <button
          className="sidebar-item active"
          onClick={() => goTo("notice")}
        >
          <FilePlus size={21} />

          <span>
            Create Notice
          </span>
        </button>


        {/* Create Report */}

        <button
          className="sidebar-item"
          onClick={() => goTo("report")}
        >
          <FileText size={21} />

          <span>
            Create Report
          </span>
        </button>


        {/* My Drafts */}

        <button
          className="sidebar-item"
          onClick={() => goTo("drafts")}
        >
          <Archive size={21} />

          <span>
            My Drafts
          </span>
        </button>


        {/* Pending Approval */}

        <button
          className="sidebar-item"
          onClick={() => goTo("pending")}
        >
          <Clock size={21} />

          <span>
            Pending Approval
          </span>
        </button>


        {/* Approved */}

        <button
          className="sidebar-item"
          onClick={() => goTo("approved")}
        >
          <CheckCircle size={21} />

          <span>
            Approved Documents
          </span>
        </button>


        {/* Rejected */}

        <button
          className="sidebar-item"
          onClick={() => goTo("rejected")}
        >
          <XCircle size={21} />

          <span>
            Rejected Documents
          </span>
        </button>


        <div className="sidebar-divider"></div>


        {/* Profile */}

        <button
          className="sidebar-item"
          onClick={() => goTo("profile")}
        >
          <User size={21} />

          <span>
            Profile
          </span>
        </button>


        {/* Logout */}

        <button
          className="sidebar-item logout"
          onClick={() => goTo("logout")}
        >
          <LogOut size={21} />

          <span>
            Logout
          </span>
        </button>

      </nav>


      <div className="sidebar-footer">
        © 2024 KLE Society
      </div>

    </aside>
  );
}

export default Sidebar;