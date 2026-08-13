import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  FilePlus,
  FileText,
  Clock,
  CheckCircle,
  MapPin,
  User,
  LogOut,
  LayoutDashboard,
  XCircle,
  Trash2,
  Eye,
  FileSpreadsheet,
} from "lucide-react";
import { getDocuments, deleteDocument } from "../utils/storage";
import "./TeacherDashboard.css";

function TeacherDashboard({ user, setCurrentPage, setLoggedInUser }) {
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    setDocuments(getDocuments());
  }, []);

  const handleLogout = () => {
    setLoggedInUser(null);
    setCurrentPage("login");
  };

  const handleCreateNotice = () => {
    setCurrentPage("notice");
  };

  const handleCreateReport = () => {
    setCurrentPage("report");
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const updated = deleteDocument(id);
    setDocuments(updated);
    if (selectedDoc?.id === id) {
      setSelectedDoc(null);
    }
  };

  const pendingCount = documents.filter((d) => d.status === "PENDING").length;
  const approvedCount = documents.filter((d) => d.status === "APPROVED").length;
  const rejectedCount = documents.filter((d) => d.status === "REJECTED").length;

  const filteredDocs =
    activeTab === "ALL"
      ? documents
      : documents.filter((d) => d.status === activeTab);

  return (
    <div className="teacher-dashboard">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="dashboard-layout">
        {/* ================= SIDEBAR ================= */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <button
              type="button"
              className={`sidebar-link ${activeTab === "ALL" ? "active" : ""}`}
              onClick={() => setActiveTab("ALL")}
            >
              <LayoutDashboard size={21} />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              className="sidebar-link"
              onClick={handleCreateNotice}
            >
              <FilePlus size={21} />
              <span>Create Notice</span>
            </button>

            <button
              type="button"
              className="sidebar-link"
              onClick={handleCreateReport}
            >
              <FileText size={21} />
              <span>Create Report</span>
            </button>

            <button
              type="button"
              className={`sidebar-link ${activeTab === "PENDING" ? "active" : ""}`}
              onClick={() => setActiveTab("PENDING")}
            >
              <Clock size={21} />
              <span>Pending Approval</span>
            </button>

            <button
              type="button"
              className={`sidebar-link ${activeTab === "APPROVED" ? "active" : ""}`}
              onClick={() => setActiveTab("APPROVED")}
            >
              <CheckCircle size={21} />
              <span>Approved Documents</span>
            </button>

            <button
              type="button"
              className={`sidebar-link ${activeTab === "REJECTED" ? "active" : ""}`}
              onClick={() => setActiveTab("REJECTED")}
            >
              <XCircle size={21} />
              <span>Rejected Documents</span>
            </button>

            <div className="sidebar-divider"></div>

            <button
              type="button"
              className="sidebar-link"
              onClick={() => alert(`User Profile: ${user?.name || "Teacher"}\nEmail: ${user?.email || "teacher@klebca.in"}\nRole: Teacher`)}
            >
              <User size={21} />
              <span>Profile</span>
            </button>

            <button
              type="button"
              className="sidebar-link logout-sidebar"
              onClick={handleLogout}
            >
              <LogOut size={21} />
              <span>Logout</span>
            </button>
          </nav>

          <div className="sidebar-footer">© 2026 KLE SOCIETY</div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="dashboard-main">
          <div className="dashboard-content">
            {/* WELCOME SECTION */}
            <section className="welcome-section">
              <h2>Welcome back, {user?.name || "Teacher"}</h2>
              <p>
                <MapPin size={14} />
                <span>Department of Computer Science</span>
                <span>•</span>
                <strong>Teacher</strong>
              </p>
            </section>

            {/* DASHBOARD CARDS */}
            <section className="dashboard-cards">
              {/* CREATE NOTICE CARD */}
              <div className="dashboard-card action-card" onClick={handleCreateNotice}>
                <div className="card-icon notice-icon">
                  <FilePlus size={20} />
                </div>
                <h3>Create Notice</h3>
                <p>Create official college notices using the Jabin Science College template with Word & PDF export.</p>
                <button type="button" className="open-btn">
                  <span>Create Notice</span>
                  <span>→</span>
                </button>
              </div>

              {/* CREATE REPORT CARD */}
              <div className="dashboard-card action-card" onClick={handleCreateReport}>
                <div className="card-icon report-icon">
                  <FileSpreadsheet size={20} />
                </div>
                <h3>Create Report</h3>
                <p>Draft academic progress reports and departmental performance evaluations.</p>
                <button type="button" className="open-btn">
                  <span>Create Report</span>
                  <span>→</span>
                </button>
              </div>

              {/* PENDING APPROVAL CARD */}
              <div
                className={`dashboard-card filter-card ${activeTab === "PENDING" ? "card-selected" : ""}`}
                onClick={() => setActiveTab("PENDING")}
              >
                <div className="card-icon pending-icon">
                  <Clock size={20} />
                </div>
                <h3>Pending Approval</h3>
                <div className="card-number">{String(pendingCount).padStart(2, "0")}</div>
                <p className="card-bottom-text">Documents awaiting Coordinator/Principal approval</p>
              </div>

              {/* APPROVED CARD */}
              <div
                className={`dashboard-card filter-card ${activeTab === "APPROVED" ? "card-selected" : ""}`}
                onClick={() => setActiveTab("APPROVED")}
              >
                <div className="card-icon approved-icon">
                  <CheckCircle size={20} />
                </div>
                <h3>Approved</h3>
                <div className="card-number">{String(approvedCount).padStart(2, "0")}</div>
                <p className="card-bottom-text">Documents verified and approved</p>
              </div>
            </section>

            {/* WORKFLOW DOCUMENTS LIST */}
            <section className="recent-documents">
              <div className="recent-header">
                <div>
                  <h3>
                    {activeTab === "ALL"
                      ? "Recent Workflow Documents"
                      : `${activeTab.charAt(0) + activeTab.slice(1).toLowerCase()} Documents`}
                  </h3>
                  <p className="recent-subtitle">
                    Showing {filteredDocs.length} document{filteredDocs.length === 1 ? "" : "s"}
                  </p>
                </div>

                <div className="filter-pills">
                  <button
                    type="button"
                    className={`pill-btn ${activeTab === "ALL" ? "pill-active" : ""}`}
                    onClick={() => setActiveTab("ALL")}
                  >
                    All ({documents.length})
                  </button>
                  <button
                    type="button"
                    className={`pill-btn ${activeTab === "PENDING" ? "pill-active" : ""}`}
                    onClick={() => setActiveTab("PENDING")}
                  >
                    Pending ({pendingCount})
                  </button>
                  <button
                    type="button"
                    className={`pill-btn ${activeTab === "APPROVED" ? "pill-active" : ""}`}
                    onClick={() => setActiveTab("APPROVED")}
                  >
                    Approved ({approvedCount})
                  </button>
                  <button
                    type="button"
                    className={`pill-btn ${activeTab === "REJECTED" ? "pill-active" : ""}`}
                    onClick={() => setActiveTab("REJECTED")}
                  >
                    Rejected ({rejectedCount})
                  </button>
                </div>
              </div>

              {filteredDocs.length === 0 ? (
                <div className="empty-docs-state">
                  <p>No documents found in this category.</p>
                </div>
              ) : (
                filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="document-row"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <div className="document-info">
                      <div className="document-icon">
                        {doc.type === "Report" ? <FileSpreadsheet size={16} /> : <FileText size={16} />}
                      </div>

                      <div>
                        <p className="doc-title">{doc.title}</p>
                        <span className="doc-meta">
                          {doc.author || "Teacher"} • {doc.submittedAt || doc.date} • {doc.details || "Official Workflow Document"}
                        </span>
                      </div>
                    </div>

                    <div className="doc-actions-right">
                      <span className={`status ${doc.status.toLowerCase()}-status`}>
                        {doc.status}
                      </span>

                      <button
                        type="button"
                        className="delete-doc-btn"
                        onClick={(e) => handleDelete(doc.id, e)}
                        title="Delete Document"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </section>
          </div>
        </main>
      </div>

      {/* DOCUMENT PREVIEW MODAL */}
      {selectedDoc && (
        <div className="modal-backdrop" onClick={() => setSelectedDoc(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Document Details</h3>
              <button className="close-modal-btn" onClick={() => setSelectedDoc(null)}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <h4>{selectedDoc.title}</h4>
              <p><strong>Type:</strong> {selectedDoc.type}</p>
              <p><strong>Status:</strong> <span className={`status ${selectedDoc.status.toLowerCase()}-status`}>{selectedDoc.status}</span></p>
              <p><strong>Author:</strong> {selectedDoc.author || "Arpita Horatti"}</p>
              <p><strong>Date:</strong> {selectedDoc.date}</p>
              <p><strong>Description:</strong> {selectedDoc.details || "No additional details provided."}</p>
            </div>

            <div className="modal-footer">
              <button
                className="primary-modal-btn"
                onClick={() => {
                  setSelectedDoc(null);
                  if (selectedDoc.type === "Report") {
                    setCurrentPage("report");
                  } else {
                    setCurrentPage("notice");
                  }
                }}
              >
                Open in Editor
              </button>
              <button className="secondary-modal-btn" onClick={() => setSelectedDoc(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;