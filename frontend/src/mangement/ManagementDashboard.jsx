import React from "react";
import {
  LayoutGrid,
  Bell,
  FileText,
  CalendarCheck,
  Copy,
  User,
  LogOut,
  FilePlus,
  CalendarPlus,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

import "./ManagementDashboard.css";

const ManagementDashboard = () => {
  return (
    <div className="management-dashboard">

      {/* ================= TOP NAVBAR ================= */}
      <nav className="management-navbar">

        <div className="management-navbar-left">

          <img
            src="/logo.png"
            alt="KLE Logo"
            className="management-logo"
          />

          <div className="management-title">
            <h1>WORKFLOW MANAGEMENT SYSTEM</h1>
            <p>ADMIN PANEL</p>
          </div>

        </div>


        <div className="management-navbar-right">

          <div className="management-user">

            <div className="management-user-info">
              <p>Dr. Rajendra M. Patil</p>
              <span>ROLE: MANAGEMENT</span>
            </div>

            <div className="management-user-icon">
              <User size={20} />
            </div>

          </div>

          <button className="management-logout">
            <LogOut size={18} />
            <span>Logout</span>
          </button>

        </div>

      </nav>


      {/* ================= MAIN AREA ================= */}
      <div className="management-body">

        {/* ================= SIDEBAR ================= */}
        <aside className="management-sidebar">

          <div className="management-sidebar-menu">

            <p className="management-menu-title">
              MAIN MENU
            </p>


            <button className="management-sidebar-item">
              <LayoutGrid size={17} />
              <span>General Overview</span>
            </button>


            <button className="management-sidebar-item">
              <Bell size={17} />
              <span>Notices</span>
            </button>


            <button className="management-sidebar-item">
              <FileText size={17} />
              <span>Reports</span>
            </button>


            <button className="management-sidebar-item">
              <CalendarCheck size={17} />
              <span>Meeting Agenda</span>
            </button>


            <button className="management-sidebar-item">
              <Copy size={17} />
              <span>College Formats</span>
            </button>

          </div>


          {/* SYSTEM STATUS */}

          <div className="management-status-container">

            <div className="management-status">

              <p>SYSTEM STATUS</p>

              <div className="management-status-row">

                <span className="status-dot"></span>

                <span>Server Operational</span>

              </div>

            </div>

          </div>

        </aside>


        {/* ================= CONTENT ================= */}
        <main className="management-main">

          <div className="management-content">


            {/* ================= COLLEGE HEADER ================= */}

            <section className="management-college-header">

              <img
                src="/logo.png"
                alt="KLE Logo"
                className="management-center-logo"
              />

              <h2>
                KLE BCA PC JABIN SCIENCE COLLEGE HUBBALLI
              </h2>

              <div className="management-header-line"></div>

              <p>
                Management Control &amp; Institutional Oversight Dashboard
              </p>

            </section>


            {/* ================= DASHBOARD CARDS ================= */}

            <section className="management-card-grid">


              {/* NOTICE */}

              <button className="management-card">

                <div className="management-card-icon">
                  <Bell size={20} />
                </div>

                <h3>View Notice</h3>

                <p>
                  Access and review all official college notices,
                  monitor approval statuses, and manage institutional
                  communications efficiently.
                </p>

                <span className="management-card-button">
                  View Notice
                  <ArrowRight size={14} />
                </span>

              </button>


              {/* REPORT */}

              <button className="management-card">

                <div className="management-card-icon">
                  <FilePlus size={20} />
                </div>

                <h3>View Report</h3>

                <p>
                  Generate comprehensive program reports, academic
                  activity logs, and event summaries using standardized
                  institutional templates.
                </p>

                <span className="management-card-button">
                  View Report
                  <ArrowRight size={14} />
                </span>

              </button>


              {/* AGENDA */}

              <button className="management-card">

                <div className="management-card-icon">
                  <CalendarPlus size={20} />
                </div>

                <h3>View Agenda</h3>

                <p>
                  Draft and distribute official meeting agendas for
                  department boards, faculty planning sessions, and
                  management committee meetings.
                </p>

                <span className="management-card-button">
                  View Agenda
                  <ArrowRight size={14} />
                </span>

              </button>


              {/* COLLEGE FORMAT */}

              <button className="management-card">

                <div className="management-card-icon">
                  <ClipboardList size={20} />
                </div>

                <h3>View College Format</h3>

                <p>
                  Design and manage standardized college document
                  formats, application templates, and official
                  administrative stationery layouts.
                </p>

                <span className="management-card-button">
                  View College Format
                  <ArrowRight size={14} />
                </span>

              </button>


            </section>

          </div>

        </main>

      </div>

    </div>
  );
};

export default ManagementDashboard;

