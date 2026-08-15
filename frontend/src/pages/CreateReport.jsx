import { useState } from "react";
import {
  ArrowLeft,
  Save,
  Printer,
  Download,
  FileSpreadsheet,
  CheckCircle2,
} from "lucide-react";

import CollegeReport from "../components/CollegeReport";

import "./Report.css";

function getCurrentDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
}

export default function CreateReport({
  setCurrentPage,
  user,
  editingDoc,
}) {

  const [toast, setToast] = useState(null);

  const [report, setReport] = useState({

    eventName:
      "Cloud Computing",

    eventDate:
      "2026-05-19",

    organiser:
      "Department of BCA",

    participants:
      "298",

    resourcePerson:
      "Miss. Nagaveni Neelgar",

    objective:
      "The Cloud Computing seminar helps students understand the basic concepts and importance of cloud technology in today's digital world. It introduces key topics such as cloud services, data storage, virtualization, and cloud deployment models. The seminar creates awareness about the applications of cloud computing in businesses and various industries. It also encourages students to explore career opportunities and develop skills in emerging cloud technologies.",

    outcome:
      "Participants gained a clear understanding of the fundamental concepts and architecture of cloud computing. They learned about different cloud service models, deployment models, and their real-world applications. The seminar enhanced their awareness of emerging cloud technologies, data storage, virtualization, and security practices. Attendees developed insights into how cloud computing supports business operations, scalability, and digital transformation. Overall, the event improved students' technical knowledge and encouraged them to explore career opportunities in cloud-based technologies.",

    description:
      "The seminar on “Cloud Computing” was held on 19th May 2026. Ms. Tanmaya delivered the welcome speech, and Mr. Mayur introduced the resource person, Ms. Nagveni Neelgar. Students actively participated in the seminar and showed keen interest throughout the session.",

    description2:
      "The seminar focused on introducing the concepts and importance of cloud computing in the modern digital era. Participants gained valuable knowledge about cloud services, data storage, virtualization, cloud deployment models, and their practical applications across various industries. The resource person shared insights into emerging cloud technologies and explained how cloud computing supports business operations and digital transformation. The session also highlighted the growing demand for cloud professionals and the career opportunities available in this field. Overall, the seminar was informative and beneficial, enhancing students’ technical knowledge and awareness of cloud-based technologies.",

    voteOfThanks:
      "The seminar concluded with a vote of thanks by Mr. Gagan.",

  });


  const [photos, setPhotos] = useState([]);


  const handleChange = (field, value) => {

    setReport((previous) => ({
      ...previous,
      [field]: value,
    }));

  };


  const showToast = (message, type = "success") => {

    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);

  };


  const handleSave = () => {

    /*
      Keep your existing storage/API integration here
      if you already have backend saving implemented.
    */

    showToast(
      "Report saved successfully.",
      "success"
    );

  };


  const handlePrint = () => {

    window.print();

  };


  const handleDownload = () => {

    window.print();

  };


  return (

    <div className="report-builder-page">


      {/* ==================================================
          TOAST
      ================================================== */}

      {toast && (

        <div
          className={`report-toast ${toast.type}`}
        >

          <CheckCircle2 size={18} />

          <span>
            {toast.message}
          </span>

        </div>

      )}


      {/* ==================================================
          TOP BAR
      ================================================== */}

      <header className="report-topbar">

        <button
          type="button"
          className="report-back-button"
          onClick={() => setCurrentPage("teacher")}
        >

          <ArrowLeft size={18} />

          <span>
            Dashboard
          </span>

        </button>


        <div className="report-topbar-title">

          <FileSpreadsheet size={19} />

          <span>
            Create Report
          </span>

        </div>


        <div className="report-actions">

          <button
            type="button"
            onClick={handleSave}
            className="report-save-button"
          >

            <Save size={16} />

            Save

          </button>


          <button
            type="button"
            onClick={handlePrint}
            className="report-print-button"
          >

            <Printer size={16} />

            Print

          </button>


          <button
            type="button"
            onClick={handleDownload}
            className="report-download-button"
          >

            <Download size={16} />

            PDF

          </button>

        </div>

      </header>


      {/* ==================================================
          MAIN WORKSPACE
      ================================================== */}

      <div className="report-workspace">


        {/* ==================================================
            LEFT EDITOR
        ================================================== */}

        <aside className="report-editor">


          <div className="report-editor-header">

            <h2>
              Report Details
            </h2>

            <p>
              Edit the fields below. The report on the right
              updates automatically.
            </p>

          </div>


          {/* EVENT */}

          <div className="report-editor-section">

            <h3>
              Basic Information
            </h3>


            <label>
              Name of the Event
            </label>

            <input
              type="text"
              value={report.eventName}
              onChange={(e) =>
                handleChange(
                  "eventName",
                  e.target.value
                )
              }
            />


            <label>
              Date of the Event
            </label>

            <input
              type="date"
              value={report.eventDate}
              onChange={(e) =>
                handleChange(
                  "eventDate",
                  e.target.value
                )
              }
            />


            <label>
              Name of the Organiser
            </label>

            <input
              type="text"
              value={report.organiser}
              onChange={(e) =>
                handleChange(
                  "organiser",
                  e.target.value
                )
              }
            />


            <label>
              Participants
            </label>

            <input
              type="text"
              value={report.participants}
              onChange={(e) =>
                handleChange(
                  "participants",
                  e.target.value
                )
              }
            />


            <label>
              Resource Person with Affiliation
            </label>

            <textarea
              value={report.resourcePerson}
              onChange={(e) =>
                handleChange(
                  "resourcePerson",
                  e.target.value
                )
              }
              rows="3"
            />

          </div>


          {/* OBJECTIVE */}

          <div className="report-editor-section">

            <h3>
              Objective
            </h3>

            <textarea
              value={report.objective}
              onChange={(e) =>
                handleChange(
                  "objective",
                  e.target.value
                )
              }
              rows="8"
            />

          </div>


          {/* OUTCOME */}

          <div className="report-editor-section">

            <h3>
              Outcome
            </h3>

            <textarea
              value={report.outcome}
              onChange={(e) =>
                handleChange(
                  "outcome",
                  e.target.value
                )
              }
              rows="9"
            />

          </div>


          {/* DESCRIPTION */}

          <div className="report-editor-section">

            <h3>
              Event Description
            </h3>

            <textarea
              value={report.description}
              onChange={(e) =>
                handleChange(
                  "description",
                  e.target.value
                )
              }
              rows="8"
            />

          </div>


          {/* CONTINUATION */}

          <div className="report-editor-section">

            <h3>
              Event Details - Continued
            </h3>

            <textarea
              value={report.description2}
              onChange={(e) =>
                handleChange(
                  "description2",
                  e.target.value
                )
              }
              rows="10"
            />

          </div>


          {/* VOTE */}

          <div className="report-editor-section">

            <h3>
              Vote of Thanks
            </h3>

            <textarea
              value={report.voteOfThanks}
              onChange={(e) =>
                handleChange(
                  "voteOfThanks",
                  e.target.value
                )
              }
              rows="4"
            />

          </div>


          {/* PHOTO */}

          <div className="report-editor-section">

            <h3>
              Photo Gallery
            </h3>

            <p className="photo-help">
              Photos can be added from the report preview.
            </p>

          </div>


        </aside>


        {/* ==================================================
            RIGHT PREVIEW
        ================================================== */}

        <main className="report-preview-container">

          <CollegeReport
            report={report}
            photos={photos}
            setPhotos={setPhotos}
          />

        </main>


      </div>

    </div>

  );
}