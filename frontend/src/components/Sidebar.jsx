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

function Sidebar() {
  return (
    <aside className="sidebar">

      <nav>

        <a href="#" className="sidebar-item active">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a>

        <a href="#" className="sidebar-item">
          <FilePlus size={20} />
          <span>Create Notice</span>
        </a>

        <a href="#" className="sidebar-item">
          <FileText size={20} />
          <span>Create Report</span>
        </a>

        <a href="#" className="sidebar-item">
          <Archive size={20} />
          <span>My Drafts</span>
        </a>

        <a href="#" className="sidebar-item">
          <Clock size={20} />
          <span>Pending Approval</span>
        </a>

        <a href="#" className="sidebar-item">
          <CheckCircle size={20} />
          <span>Approved Documents</span>
        </a>

        <a href="#" className="sidebar-item">
          <XCircle size={20} />
          <span>Rejected Documents</span>
        </a>

        <div className="sidebar-divider"></div>

        <a href="#" className="sidebar-item">
          <User size={20} />
          <span>Profile</span>
        </a>

        <a href="#" className="sidebar-item logout">
          <LogOut size={20} />
          <span>Logout</span>
        </a>

      </nav>

      <div className="sidebar-footer">
        © 2024 KLE Society
      </div>

    </aside>
  );
}

export default Sidebar;