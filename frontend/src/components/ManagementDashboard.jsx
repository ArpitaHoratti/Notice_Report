import React, { useState } from "react";
import "./ManagementDashboard.css";

const LOGO_URL =
  "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/bbfdc233-0449-4911-abcd-0c4cacf856f0/1786163109378-69890758/Screenshot_2026-08-06_071836.png";

const ManagementDashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState("dashboard");

  // =========================================
  // MANAGEMENT ONLY NAVIGATION
  // =========================================
  const openSection = (section) => {
    setActiveSection(section);
  };

  const goBackToDashboard = () => {
    setActiveSection("dashboard");
  };

  // =========================================
  // MANAGEMENT HEADER
  // =========================================
  const Header = () => (
    <header className="management-header">

      <div className="management-brand">

        <img
          src={LOGO_URL}
          alt="KLE Logo"
          className="management-logo"
        />

        <div className="management-brand-text">
          <h1>Workflow Management System</h1>
          <p>ADMIN PANEL</p>
        </div>

      </div>

      <div className="management-user">

        <div className="management-user-info">
          <strong>Dr. Rajendra M. Patil</strong>
          <span>ROLE: MANAGEMENT</span>
        </div>

        <div className="management-profile">
          <span>♙</span>
        </div>

        <div className="management-divider"></div>

        <button
          className="management-logout"
          onClick={onLogout}
        >
          <span>↪</span>
          <span>Logout</span>
        </button>

      </div>

    </header>
  );

  // =========================================
  // MANAGEMENT SIDEBAR
  // =========================================
  const Sidebar = () => (
    <aside className="management-sidebar">

      <div className="sidebar-menu">

        <p className="sidebar-title">
          MAIN MENU
        </p>

        <button
          className={`sidebar-item ${
            activeSection === "dashboard" ? "active" : ""
          }`}
          onClick={goBackToDashboard}
        >
          <span className="sidebar-icon">⊞</span>
          <span>General Overview</span>
        </button>

        <button
          className={`sidebar-item ${
            activeSection === "notice" ? "active" : ""
          }`}
          onClick={() => openSection("notice")}
        >
          <span className="sidebar-icon">♧</span>
          <span>Notices</span>
        </button>

        <button
          className={`sidebar-item ${
            activeSection === "report" ? "active" : ""
          }`}
          onClick={() => openSection("report")}
        >
          <span className="sidebar-icon">▤</span>
          <span>Reports</span>
        </button>

        <button
          className={`sidebar-item ${
            activeSection === "agenda" ? "active" : ""
          }`}
          onClick={() => openSection("agenda")}
        >
          <span className="sidebar-icon">□</span>
          <span>Meeting Agenda</span>
        </button>

        <button
          className={`sidebar-item ${
            activeSection === "format" ? "active" : ""
          }`}
          onClick={() => openSection("format")}
        >
          <span className="sidebar-icon">▣</span>
          <span>College Formats</span>
        </button>

      </div>

      <div className="system-status">

        <div className="status-box">

          <p>SYSTEM STATUS</p>

          <div className="status-row">
            <span className="status-dot"></span>
            <span>Server Operational</span>
          </div>

        </div>

      </div>

    </aside>
  );

  // =========================================
  // DASHBOARD PAGE
  // =========================================
  if (activeSection === "dashboard") {
    return (
      <div className="management-page">

        <Header />

        <div className="management-body">

          <Sidebar />

          <main className="management-content">

            {/* COLLEGE HEADER */}
            <div className="management-main">

              <div className="college-header">

                <img
                  src={LOGO_URL}
                  alt="College Logo"
                  className="college-center-logo"
                />

                <h2>
                  KLE BCA PC JABIN SCIENCE COLLEGE HUBBALLI
                </h2>

                <div className="title-line"></div>

                <p className="management-subtitle">
                  Management Control &amp; Institutional Oversight Dashboard
                </p>

              </div>

              {/* =========================================
                  FOUR MANAGEMENT SECTIONS
              ========================================= */}

              <div className="management-grid">

                {/* NOTICE */}
                <button
                  className="management-card"
                  onClick={() => openSection("notice")}
                >

                  <div className="card-icon">
                    ♧
                  </div>

                  <div className="card-content">

                    <h3>
                      View Notice
                    </h3>

                    <p>
                      Access and review all official college notices,
                      monitor approval statuses, and manage institutional
                      communications efficiently.
                    </p>

                    <span className="card-button">
                      View Notice <span>→</span>
                    </span>

                  </div>

                </button>

                {/* REPORT */}
                <button
                  className="management-card"
                  onClick={() => openSection("report")}
                >

                  <div className="card-icon">
                    ▤
                  </div>

                  <div className="card-content">

                    <h3>
                      View Report
                    </h3>

                    <p>
                      Generate comprehensive program reports,
                      academic activity logs, and event summaries
                      using standardized institutional templates.
                    </p>

                    <span className="card-button">
                      View Report <span>→</span>
                    </span>

                  </div>

                </button>

                {/* AGENDA */}
                <button
                  className="management-card"
                  onClick={() => openSection("agenda")}
                >

                  <div className="card-icon">
                    □
                  </div>

                  <div className="card-content">

                    <h3>
                      View Agenda
                    </h3>

                    <p>
                      Draft and distribute official meeting agendas
                      for department boards, faculty planning sessions,
                      and management committee meetings.
                    </p>

                    <span className="card-button">
                      View Agenda <span>→</span>
                    </span>

                  </div>

                </button>

                {/* COLLEGE FORMAT */}
                <button
                  className="management-card"
                  onClick={() => openSection("format")}
                >

                  <div className="card-icon">
                    ▣
                  </div>

                  <div className="card-content">

                    <h3>
                      View College Format
                    </h3>

                    <p>
                      Design and manage standardized college document
                      formats, application templates, and official
                      administrative stationery layouts.
                    </p>

                    <span className="card-button">
                      View College Format <span>→</span>
                    </span>

                  </div>

                </button>

              </div>

            </div>

          </main>

        </div>

      </div>
    );
  }

  // =========================================
  // MANAGEMENT INTERNAL SECTIONS
  // =========================================

  const sectionData = {
    notice: {
      title: "Management Notices",
      description:
        "View and monitor official college notices from the management panel."
    },

    report: {
      title: "Management Reports",
      description:
        "View institutional reports and academic activity summaries."
    },

    agenda: {
      title: "Meeting Agenda",
      description:
        "View and manage official management meeting agendas."
    },

    format: {
      title: "College Formats",
      description:
        "View standardized college document formats and templates."
    }
  };

  const currentSection = sectionData[activeSection];

  return (
    <div className="management-page">

      <Header />

      <div className="management-body">

        <Sidebar />

        <main className="management-content">

          <div className="management-section-page">

            <button
              className="management-back"
              onClick={goBackToDashboard}
            >
              ← Back to Management Dashboard
            </button>

            <div className="section-box">

              <div className="section-icon">
                {activeSection === "notice" && "♧"}
                {activeSection === "report" && "▤"}
                {activeSection === "agenda" && "□"}
                {activeSection === "format" && "▣"}
              </div>

              <h2>
                {currentSection.title}
              </h2>

              <p>
                {currentSection.description}
              </p>

              <div className="section-message">
                Management section ready.
              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default ManagementDashboard;