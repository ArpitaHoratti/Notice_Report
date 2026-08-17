import { useEffect, useMemo, useState } from "react";

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
  Clock,
  AlertCircle,
  ShieldCheck,
  Eye,
} from "lucide-react";

import {
  getDocuments,
  principalApproveDocument,
  principalRejectDocument,
} from "../utils/storage";

import "./PrincipalDashboard.css";

function PrincipalDashboard({ user, onLogout }) {
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState("DASHBOARD");
  const [selectedDoc, setSelectedDoc] = useState(null);

  // =========================================================
  // LOAD DOCUMENTS
  // =========================================================

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = () => {
    const docs = getDocuments();
    setDocuments(docs);
  };

  // =========================================================
  // DOCUMENTS THAT HAVE REACHED PRINCIPAL
  // =========================================================

  const principalDocuments = useMemo(() => {
    return documents.filter((doc) => {
      return (
        doc.currentApprover === "PRINCIPAL" ||
        doc.principalStatus === "PENDING" ||
        doc.principalStatus === "APPROVED" ||
        doc.principalStatus === "REJECTED"
      );
    });
  }, [documents]);

  // =========================================================
  // PENDING PRINCIPAL APPROVAL
  // =========================================================

  const pendingDocuments = principalDocuments.filter((doc) => {
    return (
      doc.currentApprover === "PRINCIPAL" &&
      doc.principalStatus !== "APPROVED" &&
      doc.principalStatus !== "REJECTED"
    );
  });

  // =========================================================
  // APPROVED DOCUMENTS
  // =========================================================

  const approvedDocuments = documents.filter(
    (doc) => doc.principalStatus === "APPROVED"
  );

  // =========================================================
  // REJECTED DOCUMENTS
  // =========================================================

  const rejectedDocuments = documents.filter(
    (doc) => doc.principalStatus === "REJECTED"
  );

  // =========================================================
  // NEED CORRECTION
  // =========================================================

  const correctionDocuments = documents.filter(
    (doc) =>
      doc.principalStatus === "REJECTED" ||
      doc.coordinatorStatus === "REJECTED"
  );

  // =========================================================
  // APPROVE DOCUMENT
  // =========================================================

  const handleApprove = (doc) => {
    const updated = principalApproveDocument(doc.id);

    setDocuments(updated);
    setSelectedDoc(null);
  };

  // =========================================================
  // REJECT DOCUMENT
  // =========================================================

  const handleReject = (doc) => {
    const reason = window.prompt(
      "Enter reason for rejecting this document:"
    );

    if (reason === null) {
      return;
    }

    const updated = principalRejectDocument(
      doc.id,
      reason
    );

    setDocuments(updated);
    setSelectedDoc(null);
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  // =========================================================
  // SIDEBAR DOCUMENT FILTER
  // =========================================================

  const getDisplayedDocuments = () => {
    switch (activeTab) {
      // -------------------------------------------------------
      // ALL PENDING DOCUMENTS
      // -------------------------------------------------------

      case "DASHBOARD":
        return pendingDocuments;

      // -------------------------------------------------------
      // PENDING NOTICES
      // -------------------------------------------------------

      case "NOTICES":
        return pendingDocuments.filter(
          (doc) => doc.type === "Notice"
        );

      // -------------------------------------------------------
      // PENDING REPORTS
      // -------------------------------------------------------

      case "REPORTS":
        return pendingDocuments.filter(
          (doc) => doc.type === "Report"
        );

      // -------------------------------------------------------
      // PENDING AGENDA
      // -------------------------------------------------------

      case "AGENDA":
        return pendingDocuments.filter(
          (doc) =>
            doc.type === "Agenda" ||
            doc.documentType === "Agenda" ||
            doc.category === "Agenda"
        );

      // -------------------------------------------------------
      // PENDING COLLEGE FORMAT
      // -------------------------------------------------------

      case "COLLEGE_FORMAT":
        return pendingDocuments.filter(
          (doc) =>
            doc.type === "College Format" ||
            doc.type === "CollegeFormat" ||
            doc.documentType === "College Format" ||
            doc.category === "College Format"
        );

      // -------------------------------------------------------
      // APPROVED
      // -------------------------------------------------------

      case "APPROVED":
        return approvedDocuments;

      // -------------------------------------------------------
      // REJECTED
      // -------------------------------------------------------

      case "REJECTED":
        return rejectedDocuments;

      // -------------------------------------------------------
      // DEFAULT
      // -------------------------------------------------------

      default:
        return pendingDocuments;
    }
  };

  const displayedDocuments = getDisplayedDocuments();

  // =========================================================
  // PAGE TITLE
  // =========================================================

  const getPageTitle = () => {
    switch (activeTab) {
      case "NOTICES":
        return "Pending Notices";

      case "REPORTS":
        return "Pending Reports";

      case "AGENDA":
        return "Pending Agenda";

      case "COLLEGE_FORMAT":
        return "Pending College Format";

      case "APPROVED":
        return "Approved Documents";

      case "REJECTED":
        return "Rejected Documents";

      case "DASHBOARD":
      default:
        return "Approval Pending";
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="principal-dashboard">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <header className="principal-header">

        <div className="principal-brand">

          <div className="principal-logo">
            <img
              src="/college-logo.png"
              alt="College Logo"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="principal-brand-text">

            <h1>
              Workflow Management System
            </h1>

            <p>
              KLE BCA PC JABIN SCIENCE COLLEGE
            </p>

          </div>

        </div>

        <div className="principal-user-area">

          <div className="principal-user-info">

            <p className="principal-user-name">
              {user?.name || "Principal"}
            </p>

            <p className="principal-user-role">
              PRINCIPAL
            </p>

          </div>

          <button
            type="button"
            className="principal-logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={19} />
            Logout
          </button>

        </div>

      </header>


      {/* =====================================================
          LAYOUT
      ===================================================== */}

      <div className="principal-layout">

        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <aside className="principal-sidebar">

          <nav className="principal-sidebar-nav">

            {/* DASHBOARD */}

            <button
              type="button"
              className={`principal-sidebar-link ${
                activeTab === "DASHBOARD"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("DASHBOARD")
              }
            >
              <LayoutGrid size={21} />
              <span>Dashboard</span>
            </button>


            {/* PENDING NOTICES */}

            <button
              type="button"
              className={`principal-sidebar-link ${
                activeTab === "NOTICES"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("NOTICES")
              }
            >
              <Bell size={21} />
              <span>Pending Notices</span>
            </button>


            {/* PENDING REPORTS */}

            <button
              type="button"
              className={`principal-sidebar-link ${
                activeTab === "REPORTS"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("REPORTS")
              }
            >
              <FileText size={21} />
              <span>Pending Reports</span>
            </button>


            {/* PENDING AGENDA */}

            <button
              type="button"
              className={`principal-sidebar-link ${
                activeTab === "AGENDA"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("AGENDA")
              }
            >
              <CalendarCheck2 size={21} />
              <span>Pending Agenda</span>
            </button>


            {/* PENDING COLLEGE FORMAT */}

            <button
              type="button"
              className={`principal-sidebar-link ${
                activeTab === "COLLEGE_FORMAT"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("COLLEGE_FORMAT")
              }
            >
              <School size={21} />
              <span>Pending College Format</span>
            </button>


            <div className="principal-sidebar-divider"></div>


            {/* APPROVED */}

            <button
              type="button"
              className={`principal-sidebar-link ${
                activeTab === "APPROVED"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("APPROVED")
              }
            >
              <CheckCircle2 size={21} />
              <span>Approved Documents</span>
            </button>


            {/* REJECTED */}

            <button
              type="button"
              className={`principal-sidebar-link ${
                activeTab === "REJECTED"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("REJECTED")
              }
            >
              <XCircle size={21} />
              <span>Rejected Documents</span>
            </button>


            <div className="principal-sidebar-divider"></div>


            {/* PROFILE */}

            <button
              type="button"
              className="principal-sidebar-link"
              onClick={() =>
                alert(
                  `Principal Profile\n\nName: ${
                    user?.name || "Principal"
                  }\nEmail: ${
                    user?.email ||
                    "principal@klebca.in"
                  }\nRole: Principal`
                )
              }
            >
              <User size={21} />
              <span>My Profile</span>
            </button>

          </nav>


          <div className="principal-sidebar-footer">
            © 2026 KLE SOCIETY
          </div>

        </aside>


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <main className="principal-main">

          <div className="principal-content">

            {/* =================================================
                WELCOME
            ================================================= */}

            <section className="principal-welcome">

              <h2>
                Welcome,{" "}
                {user?.name || "Principal"}
              </h2>

              <p>

                <ShieldCheck size={16} />

                <span>
                  Principal •{" "}
                  <strong>
                    Final Approval Queue
                  </strong>
                </span>

              </p>

            </section>


            {/* =================================================
                STAT CARDS
            ================================================= */}

            <section className="principal-stats">

              {/* PENDING */}

              <div className="principal-stat-card">

                <div className="principal-stat-icon pending">
                  <Clock size={24} />
                </div>

                <div>

                  <p>
                    Pending Review
                  </p>

                  <h3>
                    {String(
                      pendingDocuments.length
                    ).padStart(2, "0")}
                  </h3>

                </div>

              </div>


              {/* APPROVED */}

              <div className="principal-stat-card">

                <div className="principal-stat-icon approved">
                  <CheckCircle2 size={24} />
                </div>

                <div>

                  <p>
                    Approved This Week
                  </p>

                  <h3>
                    {String(
                      approvedDocuments.length
                    ).padStart(2, "0")}
                  </h3>

                </div>

              </div>


              {/* CORRECTION */}

              <div className="principal-stat-card">

                <div className="principal-stat-icon correction">
                  <AlertCircle size={24} />
                </div>

                <div>

                  <p>
                    Need Correction
                  </p>

                  <h3>
                    {String(
                      correctionDocuments.length
                    ).padStart(2, "0")}
                  </h3>

                </div>

              </div>

            </section>


            {/* =================================================
                APPROVAL TABLE
            ================================================= */}

            <section className="principal-document-box">

              <div className="principal-document-header">

                <div>

                  <h3>
                    {getPageTitle()}
                  </h3>

                  <p>
                    Showing{" "}
                    {displayedDocuments.length}{" "}
                    document
                    {displayedDocuments.length === 1
                      ? ""
                      : "s"}
                  </p>

                </div>

              </div>


              {/* =================================================
                  EMPTY STATE
              ================================================= */}

              {displayedDocuments.length === 0 ? (

                <div className="principal-empty">

                  <CheckCircle2 size={38} />

                  <h4>
                    No documents found
                  </h4>

                  <p>
                    There are no documents in this
                    category.
                  </p>

                </div>

              ) : (

                <div className="principal-table-wrapper">

                  <table className="principal-table">

                    <thead>

                      <tr>

                        <th>
                          Document Details
                        </th>

                        <th>
                          Teacher
                        </th>

                        <th>
                          Submitted
                        </th>

                        <th>
                          Coordinator
                        </th>

                        <th>
                          Principal Status
                        </th>

                        <th>
                          Action
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {displayedDocuments.map(
                        (doc) => (

                          <tr key={doc.id}>

                            <td>

                              <div className="principal-document-title">

                                <div className="principal-document-icon">

                                  {doc.type ===
                                  "Report" ? (
                                    <FileText
                                      size={17}
                                    />
                                  ) : doc.type ===
                                    "Agenda" ? (
                                    <CalendarCheck2
                                      size={17}
                                    />
                                  ) : doc.type ===
                                    "College Format" ? (
                                    <School
                                      size={17}
                                    />
                                  ) : (
                                    <Bell
                                      size={17}
                                    />
                                  )}

                                </div>

                                <div>

                                  <strong>
                                    {doc.title}
                                  </strong>

                                  <span>
                                    {doc.details ||
                                      "Official Workflow Document"}
                                  </span>

                                </div>

                              </div>

                            </td>


                            <td>
                              {doc.author ||
                                "Teacher"}
                            </td>


                            <td>
                              {doc.submittedAt ||
                                doc.date ||
                                "Recently"}
                            </td>


                            <td>

                              <span className="principal-approved-badge">
                                Approved
                              </span>

                            </td>


                            <td>

                              {doc.principalStatus ===
                              "APPROVED" ? (

                                <span className="principal-status approved-status">
                                  Approved
                                </span>

                              ) : doc.principalStatus ===
                                "REJECTED" ? (

                                <span className="principal-status rejected-status">
                                  Rejected
                                </span>

                              ) : (

                                <span className="principal-status pending-status">
                                  Pending
                                </span>

                              )}

                            </td>


                            <td>

                              <button
                                type="button"
                                className="principal-view-btn"
                                onClick={() =>
                                  setSelectedDoc(
                                    doc
                                  )
                                }
                              >

                                <Eye size={16} />

                                Review

                              </button>

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              )}

            </section>

          </div>

        </main>

      </div>


      {/* =====================================================
          DOCUMENT REVIEW MODAL
      ===================================================== */}

      {selectedDoc && (

        <div
          className="principal-modal-backdrop"
          onClick={() =>
            setSelectedDoc(null)
          }
        >

          <div
            className="principal-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="principal-modal-header">

              <div>

                <h3>
                  Review Document
                </h3>

                <p>
                  Final approval by Principal
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedDoc(null)
                }
              >
                ×
              </button>

            </div>


            <div className="principal-modal-body">

              <h4>
                {selectedDoc.title}
              </h4>


              <div className="principal-detail">

                <strong>
                  Document Type
                </strong>

                <span>
                  {selectedDoc.type}
                </span>

              </div>


              <div className="principal-detail">

                <strong>
                  Submitted By
                </strong>

                <span>
                  {selectedDoc.author ||
                    "Teacher"}
                </span>

              </div>


              <div className="principal-detail">

                <strong>
                  Date
                </strong>

                <span>
                  {selectedDoc.date ||
                    selectedDoc.submittedAt ||
                    "-"}
                </span>

              </div>


              <div className="principal-detail">

                <strong>
                  Description
                </strong>

                <span>
                  {selectedDoc.details ||
                    "No description available."}
                </span>

              </div>


              {/* WORKFLOW */}

              <div className="principal-workflow-status">

                <div>

                  <span>
                    Teacher
                  </span>

                  <b>
                    Submitted
                  </b>

                </div>


                <div className="workflow-arrow">
                  →
                </div>


                <div>

                  <span>
                    Coordinator
                  </span>

                  <b className="approved-text">
                    Approved
                  </b>

                </div>


                <div className="workflow-arrow">
                  →
                </div>


                <div>

                  <span>
                    Principal
                  </span>

                  <b>
                    Pending
                  </b>

                </div>

              </div>

            </div>


            {/* MODAL ACTIONS */}

            <div className="principal-modal-footer">

              <button
                type="button"
                className="principal-reject-btn"
                onClick={() =>
                  handleReject(selectedDoc)
                }
              >

                <XCircle size={17} />

                Reject

              </button>


              <button
                type="button"
                className="principal-approve-btn"
                onClick={() =>
                  handleApprove(selectedDoc)
                }
              >

                <CheckCircle2 size={17} />

                Approve & Forward

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default PrincipalDashboard;