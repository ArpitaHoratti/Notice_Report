
import { useState } from "react";
import { Plus, Trash2, Save, Printer, Download, CheckCircle2 } from "lucide-react";

import CollegeReport from "../components/CollegeReport";
import { saveDocument } from "../utils/storage";
import "../components/CollegeReport.css";

export default function Report({ setCurrentPage, user }) {
  const [toast, setToast] = useState(null);

  const [report, setReport] = useState({
    program: "BACHELOR OF COMPUTER APPLICATION",

    reportTitle: 'Program Report on "Cloud Computing" Seminar',

    eventDate: "19th May 2026",

    organiser: "Department of BCA",

    eventName: "Cloud Computing",

    dateOfEvent: "19/05/2026",

    participants: "298",

    resourcePerson: "Miss. Nagaveni Neelgar",

    objective:
      "The Cloud Computing seminar helps students understand the basic concepts and importance of cloud technology in today's digital world. It introduces key topics such as cloud services, data storage, virtualization, and cloud deployment models. The seminar creates awareness about the applications of cloud computing in businesses and various industries. It also encourages students to explore career opportunities and develop skills in emerging cloud technologies.",

    outcome:
      "Participants gained a clear understanding of the fundamental concepts and architecture of cloud computing. They learned about different cloud service models, deployment models, and their real-world applications. The seminar enhanced their awareness of emerging cloud technologies, data storage, virtualization, and security practices. Attendees developed insights into how cloud computing supports business operations, scalability, and digital transformation. Overall, the event improved students' technical knowledge and encouraged them to explore career opportunities in cloud-based technologies.",

    eventDescription:
      'The seminar on “Cloud Computing” was held on 19th May 2026. Ms. Tanmaya delivered the welcome speech, and Mr. Mayur introduced the resource person, Ms. Nagveni Neelgar. Students actively participated in the seminar and showed keen interest throughout the session.\n\nThe seminar focused on introducing the concepts and importance of cloud computing in the modern digital era. Participants gained valuable knowledge about cloud services, data storage, virtualization, cloud deployment models, and their practical applications across various industries. The resource person shared insights into emerging cloud technologies and explained how cloud computing supports business operations and digital transformation. The session also highlighted the growing demand for cloud professionals and the career opportunities available in this field. Overall, the seminar was informative and beneficial, enhancing students’ technical knowledge and awareness of cloud-based technologies.',

    voteOfThanks:
      "The seminar concluded with a vote of thanks by Mr. Gagan.",
  });

  const [photos, setPhotos] = useState([]);

  // =========================================================
  // TOAST
  // =========================================================

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (field, value) => {
    setReport((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // =========================================================
  // PHOTO UPLOAD
  // =========================================================

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files || []);

    const newPhotos = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      src: URL.createObjectURL(file),
      name: file.name,
    }));

    setPhotos((previous) => [...previous, ...newPhotos].slice(0, 4));

    event.target.value = "";
  };

  // =========================================================
  // REMOVE PHOTO
  // =========================================================

  const removePhoto = (id) => {
    setPhotos((previous) => {
      const photo = previous.find((item) => item.id === id);

      if (photo) {
        URL.revokeObjectURL(photo.src);
      }

      return previous.filter((item) => item.id !== id);
    });
  };

  // =========================================================
  // SAVE REPORT
  // =========================================================

  const handleSave = () => {
    saveDocument({
      title: report.reportTitle,
      type: "Report",
      status: "PENDING",
      submittedAt: "Just now",
      date: report.dateOfEvent,
      author: user?.name || "Arpita Horatti",
      details: `Event: ${report.eventName} | Organiser: ${report.organiser}`,
    });

    showToast("Report saved successfully and queued for approval.");
  };

  // =========================================================
  // PRINT
  // =========================================================

  const printReport = () => {
    window.print();
  };

  // =========================================================
  // DOWNLOAD
  // =========================================================

  const downloadPDF = () => {
    window.print();
  };

  return (
    <div className="report-page">

      {/* =====================================================
          TOAST
      ===================================================== */}

      {toast && (
        <div className={`report-toast ${toast.type}`}>
          <CheckCircle2 size={18} />
          <span>{toast.message}</span>
        </div>
      )}

      {/* =====================================================
          MAIN WORKSPACE
          SAME STRUCTURE AS CREATE NOTICE
      ===================================================== */}

      <div className="report-workspace">

        {/* ===================================================
            LEFT EDITOR
        =================================================== */}

        <aside className="report-editor">

          {/* =================================================
              BACK TO DASHBOARD
          ================================================= */}

          <button
            type="button"
            className="report-back-button"
            onClick={() => setCurrentPage("teacher")}
          >
            <span className="report-back-arrow">←</span>
            <span>Dashboard</span>
          </button>

          {/* =================================================
              PAGE TITLE
          ================================================= */}

          <div className="report-editor-heading">

            <h1>Create Report</h1>

          </div>

          {/* =================================================
              BASIC INFORMATION
          ================================================= */}

          <section className="report-form-section">

            <h2>Basic Information</h2>

            {/* PROGRAM */}

            <div className="report-field">

              <label>Program</label>

              <input
                type="text"
                value={report.program}
                onChange={(e) =>
                  handleChange("program", e.target.value)
                }
              />

            </div>

            {/* REPORT TITLE */}

            <div className="report-field">

              <label>Report Title</label>

              <input
                type="text"
                value={report.reportTitle}
                onChange={(e) =>
                  handleChange("reportTitle", e.target.value)
                }
              />

            </div>

            {/* EVENT DATE */}

            <div className="report-field">

              <label>Event Date</label>

              <input
                type="text"
                placeholder="dd-mm-yyyy"
                value={report.eventDate}
                onChange={(e) =>
                  handleChange("eventDate", e.target.value)
                }
              />

            </div>

            {/* ORGANISER */}

            <div className="report-field">

              <label>Name of the Organiser</label>

              <input
                type="text"
                value={report.organiser}
                onChange={(e) =>
                  handleChange("organiser", e.target.value)
                }
              />

            </div>

            {/* EVENT NAME */}

            <div className="report-field">

              <label>Name of the Event Organised</label>

              <input
                type="text"
                value={report.eventName}
                onChange={(e) =>
                  handleChange("eventName", e.target.value)
                }
              />

            </div>

            {/* DATE OF EVENT */}

            <div className="report-field">

              <label>Date of the Event</label>

              <input
                type="text"
                placeholder="dd-mm-yyyy"
                value={report.dateOfEvent}
                onChange={(e) =>
                  handleChange("dateOfEvent", e.target.value)
                }
              />

            </div>

            {/* PARTICIPANTS */}

            <div className="report-field">

              <label>Participants</label>

              <input
                type="text"
                value={report.participants}
                onChange={(e) =>
                  handleChange("participants", e.target.value)
                }
              />

            </div>

            {/* RESOURCE PERSON */}

            <div className="report-field">

              <label>Resource Person with Affiliation</label>

              <input
                type="text"
                value={report.resourcePerson}
                onChange={(e) =>
                  handleChange("resourcePerson", e.target.value)
                }
              />

            </div>

          </section>

          {/* =================================================
              OBJECTIVE
          ================================================= */}

          <section className="report-form-section">

            <h2>Objective of the Event</h2>

            <div className="report-field">

              <textarea
                rows="8"
                value={report.objective}
                onChange={(e) =>
                  handleChange("objective", e.target.value)
                }
              />

            </div>

          </section>

          {/* =================================================
              OUTCOME
          ================================================= */}

          <section className="report-form-section">

            <h2>Outcome of the Event</h2>

            <div className="report-field">

              <textarea
                rows="9"
                value={report.outcome}
                onChange={(e) =>
                  handleChange("outcome", e.target.value)
                }
              />

            </div>

          </section>

          {/* =================================================
              EVENT DESCRIPTION
          ================================================= */}

          <section className="report-form-section">

            <h2>Event Description</h2>

            <div className="report-field">

              <textarea
                rows="12"
                value={report.eventDescription}
                onChange={(e) =>
                  handleChange("eventDescription", e.target.value)
                }
              />

            </div>

          </section>

          {/* =================================================
              VOTE OF THANKS
          ================================================= */}

          <section className="report-form-section">

            <h2>Vote of Thanks</h2>

            <div className="report-field">

              <textarea
                rows="4"
                value={report.voteOfThanks}
                onChange={(e) =>
                  handleChange("voteOfThanks", e.target.value)
                }
              />

            </div>

          </section>

          {/* =================================================
              PHOTO GALLERY
          ================================================= */}

          <section className="report-form-section">

            <h2>Photo Gallery</h2>

            <p className="photo-help">
              Upload up to 4 photos. They will appear in the
              official 2 × 2 gallery.
            </p>

            <label className="photo-upload-button">

              <Plus size={17} />

              <span>Add Photos</span>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
              />

            </label>

            {/* UPLOADED PHOTOS */}

            <div className="uploaded-photo-list">

              {photos.map((photo) => (

                <div
                  className="uploaded-photo-item"
                  key={photo.id}
                >

                  <img
                    src={photo.src}
                    alt={photo.name}
                  />

                  <div className="uploaded-photo-details">

                    <span>
                      {photo.name}
                    </span>

                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </section>

          {/* =================================================
              ACTION BUTTONS
          ================================================= */}

          <section className="report-form-actions">

            <button
              type="button"
              className="report-save-button"
              onClick={handleSave}
            >
              <Save size={17} />
              Save Report
            </button>

            <button
              type="button"
              className="report-print-button"
              onClick={printReport}
            >
              <Printer size={17} />
              Print
            </button>

            <button
              type="button"
              className="report-download-button"
              onClick={downloadPDF}
            >
              <Download size={17} />
              Download
            </button>

          </section>

        </aside>

        {/* ===================================================
            RIGHT PREVIEW
        =================================================== */}

        <main className="report-preview-area">

          <div className="report-preview-toolbar">
            Report Preview
          </div>

          <div className="report-preview-scroll">

            <CollegeReport
              report={report}
              photos={photos}
            />

          </div>

        </main>

      </div>

    </div>
  );
}

