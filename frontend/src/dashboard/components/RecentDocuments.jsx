import {
    FileText,
    Bell,
  } from "lucide-react";
  
  function RecentDocuments() {
  
    const documents = [
      {
        id: 1,
        title: "Monthly Attendance Report - Aug 2024",
        submitted: "Submitted 2 hours ago",
        status: "PENDING",
        type: "report",
      },
      {
        id: 2,
        title: "Notice: Internal Examination Schedule",
        submitted: "Submitted yesterday",
        status: "APPROVED",
        type: "notice",
      },
      {
        id: 3,
        title: "Department Meeting Report",
        submitted: "Submitted 2 days ago",
        status: "APPROVED",
        type: "report",
      },
    ];
  
    return (
      <section className="dashboard-recent">
  
        <div className="dashboard-recent-header">
  
          <h2>
            Recent Documents
          </h2>
  
          <button>
            View all activity
          </button>
  
        </div>
  
        <div className="dashboard-document-list">
  
          {documents.map((document) => (
  
            <div
              key={document.id}
              className="dashboard-document"
            >
  
              <div className="dashboard-document-left">
  
                <div className="dashboard-document-icon">
  
                  {document.type === "report" ? (
                    <FileText size={14} />
                  ) : (
                    <Bell size={14} />
                  )}
  
                </div>
  
                <div className="dashboard-document-info">
  
                  <h3>
                    {document.title}
                  </h3>
  
                  <p>
                    {document.submitted}
                  </p>
  
                </div>
  
              </div>
  
              <span
                className={`dashboard-status ${
                  document.status === "APPROVED"
                    ? "status-approved"
                    : "status-pending"
                }`}
              >
                {document.status}
              </span>
  
            </div>
  
          ))}
  
        </div>
  
      </section>
    );
  }
  
  export default RecentDocuments;