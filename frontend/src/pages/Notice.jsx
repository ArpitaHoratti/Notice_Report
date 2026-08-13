// src/pages/Notice.jsx

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

    time2: "",

    division2: "",

    eventDate: "",

    day: "",

    classroom: "",

    note: "",

    coordinatorTitle: "",

    coordinatorName: "",

    academicTitle: "",

    academicName: "",

    principalTitle: "",

    principalName: "",

  });


  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setValues((prev) => ({

      ...prev,

      [name]: value,

    }));

  };


  return (

    <div className="notice-page">


      {/* =================================================
          LEFT SIDE - CREATE NOTICE
      ================================================= */}

      <aside className="notice-form">

        <button
          type="button"
          className="back-btn"
          onClick={() =>
            setCurrentPage("teacher")
          }
        >

          <ArrowLeft size={18} />

          <span>
            Dashboard
          </span>

        </button>


        <h1>
          Create Notice
        </h1>


        {/* NOTICE DATE */}

        <label>
          Notice Date
        </label>

        <input
          type="date"
          name="noticeDate"
          value={values.noticeDate}
          onChange={handleChange}
        />


        {/* CLASS */}

        <label>
          Class
        </label>

        <input
          type="text"
          name="className"
          placeholder="BCA II Semester"
          value={values.className}
          onChange={handleChange}
        />


        {/* DIVISION */}

        <label>
          Division
        </label>

        <input
          type="text"
          name="division"
          placeholder="A1, A2, A3"
          value={values.division}
          onChange={handleChange}
        />


        {/* ACTIVITY */}

        <label>
          Activity
        </label>

        <input
          type="text"
          name="activityName"
          placeholder="Cloud Computing Seminar"
          value={values.activityName}
          onChange={handleChange}
        />


        {/* TIME */}

        <label>
          Time
        </label>

        <input
          type="text"
          name="time"
          placeholder="10:00 am to 1:00 pm"
          value={values.time}
          onChange={handleChange}
        />


        {/* EVENT DATE */}

        <label>
          Event Date
        </label>

        <input
          type="date"
          name="eventDate"
          value={values.eventDate}
          onChange={handleChange}
        />


        {/* DAY */}

        <label>
          Day
        </label>

        <input
          type="text"
          name="day"
          placeholder="Tuesday"
          value={values.day}
          onChange={handleChange}
        />


        {/* CLASSROOM */}

        <label>
          Classroom
        </label>

        <input
          type="text"
          name="classroom"
          placeholder="Hall No. 03"
          value={values.classroom}
          onChange={handleChange}
        />


        {/* NOTE */}

        <label>
          Note
        </label>

        <textarea
          name="note"
          rows="4"
          placeholder="Attendance is Mandatory."
          value={values.note}
          onChange={handleChange}
        />


      </aside>


      {/* =================================================
          RIGHT SIDE - NOTICE PREVIEW
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