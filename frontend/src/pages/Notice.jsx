import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import "./Notice.css";

import CollegeNotice from "../components/CollegeNotice";

export default function Notice({ setCurrentPage }) {
  const [values, setValues] = useState({
    noticeDate: "",
    className: "",
    division: "",
    activityName: "",
    time: "",
    eventDate: "",
    day: "",
    classroom: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="notice-page">

      {/* ================================
          LEFT SIDE - CREATE NOTICE FORM
      ================================= */}

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

        <div className="form-group">
          <label>Notice Date</label>
          <input
            type="date"
            name="noticeDate"
            value={values.noticeDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Class</label>
          <input
            type="text"
            name="className"
            placeholder="BCA II Semester"
            value={values.className}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Division</label>
          <input
            type="text"
            name="division"
            placeholder="A1, A2, A3"
            value={values.division}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Activity</label>
          <input
            type="text"
            name="activityName"
            placeholder="Cloud Computing Seminar"
            value={values.activityName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Time</label>
          <input
            type="text"
            name="time"
            placeholder="10:00 AM to 1:00 PM"
            value={values.time}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Event Date</label>
          <input
            type="date"
            name="eventDate"
            value={values.eventDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Day</label>
          <input
            type="text"
            name="day"
            placeholder="Tuesday"
            value={values.day}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Classroom</label>
          <input
            type="text"
            name="classroom"
            placeholder="Hall No. 03"
            value={values.classroom}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Note</label>
          <textarea
            name="note"
            rows="4"
            placeholder="Attendance is Mandatory."
            value={values.note}
            onChange={handleChange}
          />
        </div>

      </aside>


      {/* ================================
          RIGHT SIDE - NOTICE PREVIEW
      ================================= */}

      <main className="notice-preview">

        <div className="preview-heading">
          Notice Preview
        </div>

        <div className="preview-scroll">

          <CollegeNotice values={values} />

        </div>

      </main>

    </div>
  );
}