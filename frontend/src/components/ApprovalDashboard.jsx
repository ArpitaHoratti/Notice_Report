import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Bell,
  FileText,
  CalendarCheck2,
  School,
  CheckCircle2,
  XCircle,
  User,
  LogOut,
  Clock,
  Eye,
  FileSpreadsheet,
  X,
} from "lucide-react";

import { getDocuments, saveDocument } from "../utils/storage";
import "./ApprovalDashboard.css";

export default function ApprovalDashboard({
  user,
  setCurrentPage,
  setLoggedInUser,
}) {
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [selectedDocument, setSelectedDocument] = useState(null);

  // =========================================
  // LOAD DOCUMENTS
  // =========================================

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = () => {
    const storedDocuments = getDocuments();

    // Coordinator sees documents waiting for approval
    setDocuments(storedDocuments);
  };

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {
    setLoggedInUser(null);
    setCurrentPage("login");
  };

  // =========================================
  // APPROVE DOCUMENT
  // =========================================

  const handleApprove = (document) => {
    const updatedDocuments = saveDocument({
      ...document,
      status: "APPROVED",
      submittedAt: "Approved just now",
      coordinatorStatus: "APPROVED",
      coordinatorName: user?.name || "Coordinator",
    });

    setDocuments(updatedDocuments);
    setSelectedDocument(null);
  };

  // =========================================
  // REJECT DOCUMENT
  // =========================================

  const handleReject = (document) => {
    const updatedDocuments = saveDocument({
      ...document,
      status: "REJECTED",
      submittedAt: "Rejected just now",
      coordinatorStatus: "REJECTED",
      coordinatorName: user?.name || "Coordinator",
    });

    setDocuments(updatedDocuments);
    setSelectedDocument(null);
  };

  // =========================================
  // FILTER
  // =========================================

  const pendingDocuments = documents.filter(
    (doc) => doc.status === "PENDING"
  );

  const approvedDocuments = documents.filter(
    (doc) => doc.status === "APPROVED"
  );

  const rejectedDocuments = documents.filter(
    (doc) => doc.status === "REJECTED"
  );

  const getDisplayedDocuments = () => {
    switch (activeTab) {
      case "APPROVED":
        return approvedDocuments;

      case "REJECTED":
        return rejectedDocuments;

      case "ALL":
        return documents;

      default:
        return pendingDocuments;
    }
  };

  const displayedDocuments = getDisplayedDocuments();

  // =========================================
  // OPEN DOCUMENT
  // =========================================

  const handleOpenDocument = (document) => {
    setSelectedDocument(document);
  };

  // =========================================
  // EDIT DOCUMENT
  // =========================================

  const handleEditDocument = (document) => {
    setSelectedDocument(null);

    if (document.type === "Report") {
      setCurrentPage("report");
    } else {
      setCurrentPage("notice");
    }
  };

  return (
    <div className="approval-dashboard">

      {/* =========================================
          TOP HEADER
      ========================================= */}

      <header className="approval-header">

        <div className="approval-brand">

          <div className="approval-logo">
            <School size={25} />
          </div>

          <div>
            <h1>Workflow Management System</h1>

            <p>
              KLE BCA PC Jabin Science College
            </p>
          </div>

        </div>


        <div className="approval-user">

          <div className="approval-user-info">

            <strong>
              {user?.name || "Coordinator"}
            </strong>

            <span>
              Role: Coordinator
            </span>

          </div>


          <button
            type="button"
            className="approval-logout"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

      </header>


      {/* =========================================
          MAIN LAYOUT
      ========================================= */}

      <div className="approval-layout">


        {/* =========================================
            SIDEBAR
        ========================================= */}

        <aside className="approval-sidebar">

          <nav>

            <button
              type="button"
              className={`approval-nav-link ${
                activeTab === "ALL" ? "active" : ""
              }`}
              onClick={() => setActiveTab("ALL")}
            >
              <LayoutDashboard size={19} />
              Dashboard
            </button>


            <button
              type="button"
              className={`approval-nav-link ${
                activeTab === "PENDING" ? "active" : ""
              }`}
              onClick={() => setActiveTab("PENDING")}
            >
              <Bell size={19} />
              Pending Notices

              {pendingDocuments.filter(
                (doc) => doc.type === "Notice"
              ).length > 0 && (
                <span className="nav-count">
                  {
                    pendingDocuments.filter(
                      (doc) => doc.type === "Notice"
                    ).length
                  }
                </span>
              )}
            </button>


            <button
              type="button"
              className="approval-nav-link"
              onClick={() => setActiveTab("PENDING")}
            >
              <FileText size={19} />
              Pending Reports

              {pendingDocuments.filter(
                (doc) => doc.type === "Report"
              ).length > 0 && (
                <span className="nav-count">
                  {
                    pendingDocuments.filter(
                      (doc) => doc.type === "Report"
                    ).length
                  }
                </span>
              )}
            </button>


            <button
              type="button"
              className="approval-nav-link"
              onClick={() => alert("Pending Agenda")}
            >
              <CalendarCheck2 size={19} />
              Pending Agenda
            </button>


            <button
              type="button"
              className="approval-nav-link"
              onClick={() => alert("Pending College Format")}
            >
              <School size={19} />
              Pending College Format
            </button>


            <div className="approval-divider"></div>


            <button
              type="button"
              className={`approval-nav-link ${
                activeTab === "APPROVED" ? "active" : ""
              }`}
              onClick={() => setActiveTab("APPROVED")}
            >
              <CheckCircle2 size={19} />
              Approved Documents
            </button>


            <button
              type="button"
              className={`approval-nav-link ${
                activeTab === "REJECTED" ? "active" : ""
              }`}
              onClick={() => setActiveTab("REJECTED")}
            >
              <XCircle size={19} />
              Rejected Documents
            </button>


            <div className="approval-divider"></div>


            <button
              type="button"
              className="approval-nav-link"
              onClick={() =>
                alert(
                  `Name: ${user?.name || "Coordinator"}\nEmail: ${
                    user?.email || ""
                  }\nRole: Coordinator`
                )
              }
            >
              <User size={19} />
              My Profile
            </button>

          </nav>


          <div className="approval-sidebar-footer">
            © 2026 KLE SOCIETY
          </div>

        </aside>


        {/* =========================================
            MAIN CONTENT
        ========================================= */}

        <main className="approval-main">

          <div className="approval-content">


            {/* =========================================
                WELCOME
            ========================================= */}

            <section className="approval-welcome">

              <h2>
                Welcome, {user?.name || "Coordinator"}
              </h2>

              <p>
                <CheckCircle2 size={17} />

                <span>
                  Department Coordinator
                </span>

                <span>•</span>

                <strong>
                  Approval Queue
                </strong>
              </p>

            </section>


            {/* =========================================
                STAT CARDS
            ========================================= */}

            <section className="approval-stats">


              <div className="approval-stat-card">

                <div className="stat-icon pending">
                  <Clock size={23} />
                </div>

                <div>
                  <span>Pending Review</span>
                  <strong>{pendingDocuments.length}</strong>
                </div>

              </div>


              <div className="approval-stat-card">

                <div className="stat-icon approved">
                  <CheckCircle2 size={23} />
                </div>

                <div>
                  <span>Approved</span>
                  <strong>{approvedDocuments.length}</strong>
                </div>

              </div>


              <div className="approval-stat-card">

                <div className="stat-icon rejected">
                  <XCircle size={23} />
                </div>

                <div>
                  <span>Rejected</span>
                  <strong>{rejectedDocuments.length}</strong>
                </div>

              </div>

            </section>


            {/* =========================================
                DOCUMENT TABLE
            ========================================= */}

            <section className="approval-table-card">


              <div className="approval-table-header">

                <div>

                  <h3>
                    <FileText size={19} />

                    Approval Pending
                  </h3>

                  <p>
                    Review documents submitted by teachers
                  </p>

                </div>


                <div className="approval-tabs">

                  <button
                    type="button"
                    className={
                      activeTab === "PENDING"
                        ? "tab-active"
                        : ""
                    }
                    onClick={() =>
                      setActiveTab("PENDING")
                    }
                  >
                    Pending
                  </button>

                  <button
                    type="button"
                    className={
                      activeTab === "APPROVED"
                        ? "tab-active"
                        : ""
                    }
                    onClick={() =>
                      setActiveTab("APPROVED")
                    }
                  >
                    Approved
                  </button>

                  <button
                    type="button"
                    className={
                      activeTab === "REJECTED"
                        ? "tab-active"
                        : ""
                    }
                    onClick={() =>
                      setActiveTab("REJECTED")
                    }
                  >
                    Rejected
                  </button>

                  <button
                    type="button"
                    className={
                      activeTab === "ALL"
                        ? "tab-active"
                        : ""
                    }
                    onClick={() =>
                      setActiveTab("ALL")
                    }
                  >
                    All
                  </button>

                </div>

              </div>


              {/* TABLE */}

              <div className="approval-table-wrapper">

                <table className="approval-table">

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
                        Status
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

                    {displayedDocuments.length === 0 ? (

                      <tr>

                        <td
                          colSpan="6"
                          className="empty-table"
                        >
                          No documents found.
                        </td>

                      </tr>

                    ) : (

                      displayedDocuments.map((doc) => (

                        <tr key={doc.id}>

                          {/* DOCUMENT */}

                          <td>

                            <div className="document-cell">

                              <div className="document-type-icon">

                                {doc.type === "Report" ? (
                                  <FileSpreadsheet
                                    size={19}
                                  />
                                ) : (
                                  <FileText
                                    size={19}
                                  />
                                )}

                              </div>


                              <div>

                                <strong>
                                  {doc.title}
                                </strong>

                                <span>
                                  {doc.details ||
                                    "Workflow document"}
                                </span>

                              </div>

                            </div>

                          </td>


                          {/* TEACHER */}

                          <td>
                            {doc.author ||
                              "Teacher"}
                          </td>


                          {/* SUBMITTED */}

                          <td>
                            {doc.submittedAt ||
                              doc.date}
                          </td>


                          {/* STATUS */}

                          <td>

                            <span
                              className={`approval-status ${
                                doc.status?.toLowerCase()
                              }`}
                            >
                              {doc.status}
                            </span>

                          </td>


                          {/* PRINCIPAL STATUS */}

                          <td>

                            <span
                              className={`principal-status ${
                                doc.principalStatus
                                  ? doc.principalStatus.toLowerCase()
                                  : doc.status === "APPROVED"
                                  ? "pending"
                                  : "pending"
                              }`}
                            >
                              {doc.principalStatus ||
                                "Pending"}
                            </span>

                          </td>


                          {/* ACTION */}

                          <td>

                            <button
                              type="button"
                              className="view-document-btn"
                              onClick={() =>
                                handleOpenDocument(
                                  doc
                                )
                              }
                            >
                              <Eye size={16} />
                              Review
                            </button>

                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </section>

          </div>

        </main>

      </div>


      {/* =========================================
          REVIEW MODAL
      ========================================= */}

      {selectedDocument && (

        <div
          className="approval-modal-backdrop"
          onClick={() =>
            setSelectedDocument(null)
          }
        >

          <div
            className="approval-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            <div className="approval-modal-header">

              <div>

                <h3>
                  Review Document
                </h3>

                <p>
                  {selectedDocument.type}
                </p>

              </div>


              <button
                type="button"
                className="modal-close"
                onClick={() =>
                  setSelectedDocument(null)
                }
              >
                <X size={20} />
              </button>

            </div>


            <div className="approval-modal-body">

              <h2>
                {selectedDocument.title}
              </h2>


              <div className="document-details-grid">

                <div>
                  <span>Type</span>
                  <strong>
                    {selectedDocument.type}
                  </strong>
                </div>


                <div>
                  <span>Teacher</span>
                  <strong>
                    {selectedDocument.author ||
                      "Teacher"}
                  </strong>
                </div>


                <div>
                  <span>Date</span>
                  <strong>
                    {selectedDocument.date ||
                      "-"}
                  </strong>
                </div>


                <div>
                  <span>Status</span>

                  <strong>
                    {selectedDocument.status}
                  </strong>
                </div>

              </div>


              <div className="document-description">

                <label>
                  Description
                </label>

                <p>
                  {selectedDocument.details ||
                    "No description available."}
                </p>

              </div>


              {/* CURRENT STATUS */}

              <div className="current-approval-status">

                <span>
                  Coordinator Status
                </span>

                <strong>
                  {selectedDocument.coordinatorStatus ||
                    selectedDocument.status}
                </strong>

              </div>

            </div>


            {/* =====================================
                MODAL ACTIONS
            ===================================== */}

            <div className="approval-modal-footer">

              <button
                type="button"
                className="modal-edit-btn"
                onClick={() =>
                  handleEditDocument(
                    selectedDocument
                  )
                }
              >
                <Eye size={16} />
                Open Document
              </button>


              {selectedDocument.status ===
                "PENDING" && (

                <>

                  <button
                    type="button"
                    className="modal-reject-btn"
                    onClick={() =>
                      handleReject(
                        selectedDocument
                      )
                    }
                  >
                    <XCircle size={17} />
                    Reject
                  </button>


                  <button
                    type="button"
                    className="modal-approve-btn"
                    onClick={() =>
                      handleApprove(
                        selectedDocument
                      )
                    }
                  >
                    <CheckCircle2
                      size={17}
                    />
                    Approve & Send to Principal
                  </button>

                </>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}