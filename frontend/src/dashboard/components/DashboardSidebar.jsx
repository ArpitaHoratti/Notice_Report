import {
    LayoutDashboard,
    FilePlus2,
    FileText,
    Archive,
    Clock3,
    CircleCheck,
    CircleX,
    UserRound,
    LogOut,
  } from "lucide-react";
  
  function DashboardSidebar() {
    return (
      <aside className="dashboard-sidebar">
  
        <nav className="dashboard-navigation">
  
          <a
            href="#"
            className="dashboard-nav-item active"
          >
            <LayoutDashboard size={15} />
            <span>Dashboard</span>
          </a>
  
          <a
            href="#"
            className="dashboard-nav-item"
          >
            <FilePlus2 size={15} />
            <span>Create Notice</span>
          </a>
  
          <a
            href="#"
            className="dashboard-nav-item"
          >
            <FileText size={15} />
            <span>Create Report</span>
          </a>
  
          <a
            href="#"
            className="dashboard-nav-item"
          >
            <Archive size={15} />
            <span>My Drafts</span>
          </a>
  
          <a
            href="#"
            className="dashboard-nav-item"
          >
            <Clock3 size={15} />
            <span>Pending Approval</span>
          </a>
  
          <a
            href="#"
            className="dashboard-nav-item"
          >
            <CircleCheck size={15} />
            <span>Approved Documents</span>
          </a>
  
          <a
            href="#"
            className="dashboard-nav-item"
          >
            <CircleX size={15} />
            <span>Rejected Documents</span>
          </a>
  
          <div className="dashboard-nav-divider" />
  
          <a
            href="#"
            className="dashboard-nav-item"
          >
            <UserRound size={15} />
            <span>Profile</span>
          </a>
  
          <a
            href="#"
            className="dashboard-nav-item dashboard-nav-logout"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </a>
  
        </nav>
  
      </aside>
    );
  }
  
  export default DashboardSidebar;