import { FileText, Bell } from "lucide-react";

function RecentDocuments() {
  const documents = [
    {
      id: 1,
      title: "Monthly Attendance Report - Aug 2024",
      time: "Submitted 2 hours ago",
      status: "Pending",
      type: "report",
    },
    {
      id: 2,
      title: "Notice: Internal Examination Schedule",
      time: "Approved yesterday",
      status: "Approved",
      type: "notice",
    },
  ];

  return (
    <div className="recent-documents">

      <div className="recent-header">
        <h3>Recent Documents</h3>

        <button className="view-all-btn">
          View All
        </button>
      </div>

      <div className="recent-list">

        {documents.map((doc) => (
          <div className="recent-item" key={doc.id}>

            <div className="recent-left">

              <div className="recent-icon">
                {doc.type === "report" ? (
                  <FileText size={20} />
                ) : (
                  <Bell size={20} />
                )}
              </div>

              <div>
                <h4>{doc.title}</h4>
                <p>{doc.time}</p>
              </div>

            </div>

            <span
              className={
                doc.status === "Approved"
                  ? "status approved"
                  : "status pending"
              }
            >
              {doc.status}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentDocuments;