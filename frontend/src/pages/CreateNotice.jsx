import { useState } from "react";
import "./CreateNotice.css";

import NoticeSheet from "../components/NoticeSheet";

import {
  NOTICE_DEFAULTS,
  dayFromDate,
} from "../constants/noticeTemplate";

function CreateNotice({
  setCurrentPage,
}) {

  // ============================================
  // FORM STATE
  // ============================================

  const [values, setValues] =
    useState(NOTICE_DEFAULTS);

  // ============================================
  // INPUT CHANGE
  // ============================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    let next = {
      ...values,
      [name]: value,
    };

    // Automatically calculate day
    if (name === "eventDate") {
      next.day = dayFromDate(value);
    }

    setValues(next);

  };

  // ============================================
  // SAVE
  // ============================================

  const handleSave = () => {

    console.log(values);

    alert("Notice Saved Successfully");

  };

  // ============================================
  // CANCEL
  // ============================================

  const handleCancel = () => {

    setCurrentPage("teacher");

  };

  return (

    <div className="notice-page">

      {/* ============================
          LEFT PANEL
      ============================ */}

      <div className="notice-form">

        <button
          className="back-btn"
          onClick={handleCancel}
        >
          ← Dashboard
        </button>

        <h2>Create Notice</h2>

        <p className="form-description">
          Fill the editable fields.
          The official notice updates
          automatically.
        </p>

        {/* Notice Date */}

        <div className="form-group">

          <label>
            Notice Date
          </label>

          <input
            type="date"
            name="noticeDate"
            value={values.noticeDate}
            onChange={handleChange}
          />

        </div>

        {/* Class */}

        <div className="form-group">

          <label>
            Class
          </label>

          <input
            type="text"
            name="className"
            placeholder="BCA I Year"
            value={values.className}
            onChange={handleChange}
          />

        </div>

        {/* Division */}

        <div className="form-group">

          <label>
            Division
          </label>

          <input
            type="text"
            name="division"
            placeholder="A-4"
            value={values.division}
            onChange={handleChange}
          />

        </div>

        {/* Activity */}

        <div className="form-group">

          <label>
            Activity Name
          </label>

          <input
            type="text"
            name="activityName"
            placeholder="MATRIX"
            value={values.activityName}
            onChange={handleChange}
          />

        </div>

        {/* Time */}

        <div className="form-group">

          <label>
            Time
          </label>

          <input
            type="text"
            name="time"
            placeholder="3.15 PM - 5.15 PM"
            value={values.time}
            onChange={handleChange}
          />

        </div>

        {/* Event Date */}

        <div className="form-group">

          <label>
            Event Date
          </label>

          <input
            type="date"
            name="eventDate"
            value={values.eventDate}
            onChange={handleChange}
          />

        </div>

        {/* Day */}

        <div className="form-group">

          <label>
            Day
          </label>

          <input
            type="text"
            name="day"
            value={values.day}
            readOnly
          />

        </div>

        {/* Classroom */}

        <div className="form-group">

          <label>
            Classroom
          </label>

          <input
            type="text"
            name="classroom"
            placeholder="ANDROID"
            value={values.classroom}
            onChange={handleChange}
          />

        </div>

        {/* Note */}

        <div className="form-group">

          <label>
            Note
          </label>

          <textarea
            rows="4"
            name="note"
            value={values.note}
            onChange={handleChange}
          />

        </div>

                {/* BUTTONS */}

        <div className="button-row">

          <button
            className="cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Notice
          </button>

        </div>

      </div>

      {/* ===================================
          RIGHT SIDE
      =================================== */}

      <div className="notice-preview">

        <h2 className="preview-title">
          Notice Preview
        </h2>

        <NoticeSheet
          values={values}
        />

      </div>

    </div>

  );

}

export default CreateNotice;