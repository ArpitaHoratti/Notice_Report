// src/pages/Notice.jsx

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import "./Notice.css";
import CollegeNotice from "../components/CollegeNotice";

export default function Notice({ setCurrentPage, editingDoc }) {

  const [values, setValues] = useState({
    noticeDate: "",
    className: "",
    division: "",
    activityName: "",
    time: "",
    time2: "",
    division2: "",
    eventDate: "",
    classroom: "",
    note: "",

    coordinatorTitle: "Seminar Coordinator",
    coordinatorName: "",

    academicTitle: "Academic Coordinator",
    academicName: "",

    principalTitle: "Principal",
    principalName: "",
  });

  // =========================================
  // HANDLE INPUT CHANGES
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="notice-page">

      {/* =================================================
          LEFT SIDE - EDITABLE FORM
      ================================================= */}

      <aside className="notice-form">

        <button
          type="button"
          className="back-btn"
          onClick={() => setCurrentPage("teacher")}
        >
          <ArrowLeft size={18} />
          <span>Dashboard</span>
        </button>

        <h1>Create Notice</h1>

        {/* ===============================
            NOTICE DATE
        =============================== */}

        <label>Notice Date</label>

        <input
          type="date"
          name="noticeDate"
          value={values.noticeDate}
          onChange={handleChange}
        />


        {/* ===============================
            CLASS
        =============================== */}

        <label>Class</label>

        <input
          type="text"
          name="className"
          placeholder="II semester"
          value={values.className}
          onChange={handleChange}
        />


        {/* ===============================
            ACTIVITY
        =============================== */}

        <label>Activity / Seminar Name</label>

        <input
          type="text"
          name="activityName"
          placeholder="Cloud Computing"
          value={values.activityName}
          onChange={handleChange}
        />


        {/* ===============================
            CLASSROOM
        =============================== */}

        <label>Hall / Classroom</label>

        <input
          type="text"
          name="classroom"
          placeholder="Hall no 03"
          value={values.classroom}
          onChange={handleChange}
        />


        {/* ===============================
            EVENT DATE
        =============================== */}

        <label>Event Date</label>

        <input
          type="date"
          name="eventDate"
          value={values.eventDate}
          onChange={handleChange}
        />


        {/* ===============================
            FIRST SCHEDULE ROW
        =============================== */}

        <h3 className="form-section-title">
          Seminar Schedule - Row 1
        </h3>

        <label>Timing</label>

        <input
          type="text"
          name="time"
          placeholder="10:00 am to 1:00 am"
          value={values.time}
          onChange={handleChange}
        />

        <label>Division</label>

        <input
          type="text"
          name="division"
          placeholder="A1, A2, A3"
          value={values.division}
          onChange={handleChange}
        />


        {/* ===============================
            SECOND SCHEDULE ROW
        =============================== */}

        <h3 className="form-section-title">
          Seminar Schedule - Row 2
        </h3>

        <label>Timing</label>

        <input
          type="text"
          name="time2"
          placeholder="2:00 pm to 5:00 pm"
          value={values.time2}
          onChange={handleChange}
        />

        <label>Division</label>

        <input
          type="text"
          name="division2"
          placeholder="A4, A5, A6"
          value={values.division2}
          onChange={handleChange}
        />


        {/* ===============================
            NOTE
        =============================== */}

        <label>Note</label>

        <textarea
          name="note"
          rows="4"
          placeholder="Attendance is Mandatory."
          value={values.note}
          onChange={handleChange}
        />


        {/* ===============================
            SIGNATURES
        =============================== */}

        <h3 className="form-section-title">
          Signatures
        </h3>

        <label>Seminar Coordinator Name</label>

        <input
          type="text"
          name="coordinatorName"
          placeholder="Coordinator name"
          value={values.coordinatorName}
          onChange={handleChange}
        />

        <label>Academic Coordinator Name</label>

        <input
          type="text"
          name="academicName"
          placeholder="Academic Coordinator name"
          value={values.academicName}
          onChange={handleChange}
        />

        <label>Principal Name</label>

        <input
          type="text"
          name="principalName"
          placeholder="Principal name"
          value={values.principalName}
          onChange={handleChange}
        />

      </aside>


      {/* =================================================
          RIGHT SIDE - LIVE NOTICE PREVIEW
      ================================================= */}

      <main className="notice-preview-container">

        <div className="notice-preview-title">
          Notice Preview
        </div>

        <div className="notice-preview-content">

          <CollegeNotice
            values={values}
          />

        </div>

      </main>

    </div>
  );
}