import React from "react";
import {
  LayoutGrid,
  Bell,
  FileText,
  CalendarCheck2,
  School,
  CheckCircle2,
  XCircle,
  User,
  LogOut,
  ShieldCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  ClipboardList,
} from "lucide-react";

import "./ApprovalDashboard.css";

const documents = [
  {
    title: "Notice: Cloud Computing Seminar",
    details: "BCA 3rd Sem • Activity Date: 19/05/2026",
    teacher: "Dr. Anil Kumar",
    submitted: "2 hours ago",
    status: "Pending",
    principalStatus: "Approved",
  },
  {
    title: "Report: Industrial Visit - Tech Park",
    details: "BCA 5th Sem • Submission Date: 20/05/2026",
    teacher: "Prof. Megha Patil",
    submitted: "5 hours ago",
    status: "Pending",
    principalStatus: "Rejected",
  },
  {
    title: "Agenda: Faculty Development Meeting",
    details: "All Dept • Scheduled: 25/05/2026",
    teacher: "Admin Office",
    submitted: "1 day ago",
    status: "Pending",
    principalStatus: "Pending",
  },
];

function StatusBadge({ children, type }) {
  return (
    <span className={`approval-status ${type}`}>
      {children}
    </span>
  );
}

function ApprovalDashboard({ onLogout }) {
  const handleNavigation = (name) => {
    console.log(`${name} clicked`);
  };

  return (
    <div className="approval-dashboard">

      {/* ================================
          TOP HEADER
      ================================= */}
      <header className="approval-top-header">

        <div className="approval-brand">

          <img
            src="/college-logo.png"
            alt="College Logo"
            className="approval-logo"
          />

          <div className="approval-brand-text">
            <h1>Workflow Management System</h1>
            <p>KLE BCA PC Jabin Science College</p>
          </div>

        </div>


        <div className="approval-user-area">

          <div className="approval-user-info">
            <p>Prof. Santosh Naik</p>
            <span>Role: Department Coordinator</span>
          </div>

          <button
            className="approval-logout"
            onClick={onLogout}
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

      </header>


      {/* ================================
          MAIN LAYOUT
      ================================= */}
      <div className="approval-layout">


        {/* ================================
            SIDEBAR
        ================================= */}
        <aside className="approval-sidebar">

          <nav className="approval-navigation">

            <button
              className="approval-nav-item active"
              onClick={() => handleNavigation("Dashboard")}
            >
              <LayoutGrid size={19} />
              <span>Dashboard</span>
            </button>


            <button
              className="approval-nav-item"
              onClick={() => handleNavigation("Pending Notices")}
            >
              <Bell size={19} />
              <span>Pending Notices</span>
            </button>


            <button
              className="approval-nav-item"
              onClick={() => handleNavigation("Pending Reports")}
            >
              <FileText size={19} />
              <span>Pending Reports</span>
            </button>


            <button
              className="approval-nav-item"
              onClick={() => handleNavigation("Pending Agenda")}
            >
              <CalendarCheck2 size={19} />
              <span>Pending Agenda</span>
            </button>


            <button
              className="approval-nav-item"
              onClick={() => handleNavigation("Pending College Format")}
            >
              <School size={19} />
              <span>Pending College Format</span>
            </button>


            <div className="approval-nav-divider" />


            <button
              className="approval-nav-item"
              onClick={() => handleNavigation("Approved Documents")}
            >
              <CheckCircle2 size={19} />
              <span>Approved Documents</span>
            </button>


            <button
              className="approval-nav-item"
              onClick={() => handleNavigation("Rejected Documents")}
            >
              <XCircle size={19} />
              <span>Rejected Documents</span>
            </button>


            <div className="approval-nav-divider" />


            <button
              className="approval-nav-item"
              onClick={() => handleNavigation("My Profile")}
            >
              <User size={19} />
              <span>My Profile</span>
            </button>

          </nav>


          <div className="approval-sidebar-footer">
            © 2024 KLE SOCIETY
          </div>

        </aside>


        {/* ================================
            MAIN CONTENT
        ================================= */}
        <main className="approval-main">

          <div className="approval-content">


            {/* ================================
                WELCOME
            ================================= */}
            <section className="approval-welcome">

              <h2>
                Welcome, Prof. Santosh Naik
              </h2>

              <div className="approval-role">

                <ShieldCheck size={18} />

                <span>
                  Department Coordinator
                  <span className="approval-role-highlight">
                    • Approval Queue
                  </span>
                </span>

              </div>

            </section>


            {/* ================================
                STATISTICS
            ================================= */}
            <section className="approval-stats">


              {/* Pending */}
              <div className="approval-stat-card">

                <div className="approval-stat-icon pending">
                  <Clock size={25} />
                </div>

                <div>
                  <p>Pending Review</p>
                  <strong>14</strong>
                </div>

              </div>


              {/* Approved */}
              <div className="approval-stat-card">

                <div className="approval-stat-icon approved">
                  <CheckCircle size={25} />
                </div>

                <div>
                  <p>Approved This Week</p>
                  <strong>38</strong>
                </div>

              </div>


              {/* Correction */}
              <div className="approval-stat-card">

                <div className="approval-stat-icon correction">
                  <AlertCircle size={25} />
                </div>

                <div>
                  <p>Need Correction</p>
                  <strong>03</strong>
                </div>

              </div>

            </section>


            {/* ================================
                APPROVAL TABLE
            ================================= */}
            <section className="approval-table-card">


              {/* Table heading */}
              <div className="approval-table-header">

                <h3>
                  <ClipboardList size={19} />
                  Approval Pending
                </h3>

              </div>


              {/* Table */}
              <div className="approval-table-wrapper">

                <table className="approval-table">

                  <thead>

                    <tr>

                      <th>Document Details</th>

                      <th>Teacher</th>

                      <th>Submitted</th>

                      <th>Status</th>

                      <th className="principal-column">
                        Principal Status
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {documents.map((document, index) => (

                      <tr key={index}>

                        {/* Document */}
                        <td className="document-details">

                          <p>
                            {document.title}
                          </p>

                          <span>
                            {document.details}
                          </span>

                        </td>


                        {/* Teacher */}
                        <td>
                          {document.teacher}
                        </td>


                        {/* Submitted */}
                        <td>
                          {document.submitted}
                        </td>


                        {/* Status */}
                        <td>

                          <StatusBadge type="pending">
                            {document.status}
                          </StatusBadge>

                        </td>


                        {/* Principal Status */}
                        <td className="principal-column">

                          {document.principalStatus === "Approved" && (
                            <StatusBadge type="principal-approved">
                              Approved
                            </StatusBadge>
                          )}

                          {document.principalStatus === "Rejected" && (
                            <StatusBadge type="principal-rejected">
                              Rejected
                            </StatusBadge>
                          )}

                          {document.principalStatus === "Pending" && (
                            <StatusBadge type="principal-pending">
                              Pending
                            </StatusBadge>
                          )}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </section>

          </div>

        </main>

      </div>

    </div>
  );
}

export default ApprovalDashboard;