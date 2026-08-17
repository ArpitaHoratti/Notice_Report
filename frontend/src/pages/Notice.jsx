import { useState } from "react";
import { ArrowLeft, Trash2, Plus } from "lucide-react";

import "./Notice.css";

import CollegeNotice from "../components/CollegeNotice";

import users from "../data/users";
import { downloadNoticeAsWord } from "../utils/downloadNotice";

export default function Notice({ setCurrentPage }) {
  // =====================================================
  // NOTICE DATA
  // =====================================================

  const [values, setValues] = useState({
    noticeDate: "",
    semester: "",
    activityType: "",
    topic: "",
    classroom: "",
    eventDate: "",
    scheduleTitle: "Seminar Schedule",
    note: "",
    coordinator: "",

    schedule: [
      {
        timing: "",
        date: "",
        division: "",
      },
      {
        timing: "",
        date: "",
        division: "",
      },
    ],
  });

  // =====================================================
  // GET COORDINATORS
  // =====================================================

  const coordinators = users.filter(
    (user) => user.role === "Coordinator"
  );

  // =====================================================
  // HANDLE NORMAL INPUTS
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // HANDLE SCHEDULE ROW
  // =====================================================

  const handleScheduleChange = (
    index,
    field,
    value
  ) => {
    setValues((prev) => {
      const updatedSchedule = [...prev.schedule];

      updatedSchedule[index] = {
        ...updatedSchedule[index],
        [field]: value,
      };

      return {
        ...prev,
        schedule: updatedSchedule,
      };
    });
  };

  // =====================================================
  // ADD NEW SCHEDULE ROW
  // =====================================================

  const addScheduleRow = () => {
    setValues((prev) => ({
      ...prev,

      schedule: [
        ...prev.schedule,
        {
          timing: "",
          date: "",
          division: "",
        },
      ],
    }));
  };

  // =====================================================
  // DELETE SCHEDULE ROW
  // =====================================================

  const deleteScheduleRow = (index) => {
    setValues((prev) => {
      if (prev.schedule.length <= 1) {
        return prev;
      }

      return {
        ...prev,

        schedule: prev.schedule.filter(
          (_, i) => i !== index
        ),
      };
    });
  };

  // =====================================================
  // SEND TO COORDINATOR
  // =====================================================

  const handleSendToCoordinator = () => {
    if (!values.coordinator) {
      alert(
        "Please select a Coordinator before sending the Notice."
      );

      return;
    }

    const selectedCoordinator =
      coordinators.find(
        (coordinator) =>
          coordinator.email === values.coordinator
      );

    if (!selectedCoordinator) {
      alert(
        "Selected Coordinator was not found."
      );

      return;
    }

    console.log(
      "Notice sent to Coordinator:",
      selectedCoordinator
    );

    console.log(
      "Notice Data:",
      values
    );

    alert(
      `Notice sent to ${selectedCoordinator.name}`
    );
  };

  // =====================================================
  // DOWNLOAD WORD
  // =====================================================

  const handleDownloadWord = () => {
    downloadNoticeAsWord(values);
  };

  return (
    <div className="notice-page">

      {/* =================================================
          LEFT SIDE - CREATE NOTICE
      ================================================= */}

      <aside className="notice-form">

        {/* =================================================
            BACK BUTTON
        ================================================= */}

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

        {/* =================================================
            TITLE
        ================================================= */}

        <h1>
          Create Notice
        </h1>

        {/* =================================================
            NOTICE DATE
        ================================================= */}

        <label>
          Notice Date
        </label>

        <input
          type="date"
          name="noticeDate"
          value={values.noticeDate}
          onChange={handleChange}
        />

        {/* =================================================
            SEMESTER
        ================================================= */}

        <label>
          Semester
        </label>

        <select
          name="semester"
          value={values.semester}
          onChange={handleChange}
        >
          <option value="">
            Select Semester
          </option>

          <option value="I semester">
            I Semester
          </option>

          <option value="II semester">
            II Semester
          </option>

          <option value="III semester">
            III Semester
          </option>

          <option value="IV semester">
            IV Semester
          </option>

          <option value="V semester">
            V Semester
          </option>

          <option value="VI semester">
            VI Semester
          </option>
        </select>

        {/* =================================================
            ACTIVITY TYPE
        ================================================= */}

        <label>
          Activity Type
        </label>

        <input
          type="text"
          name="activityType"
          placeholder="Seminar"
          value={values.activityType}
          onChange={handleChange}
        />

        {/* =================================================
            TOPIC
        ================================================= */}

        <label>
          Topic
        </label>

        <input
          type="text"
          name="topic"
          placeholder="Cloud Computing"
          value={values.topic}
          onChange={handleChange}
        />

        {/* =================================================
            VENUE
        ================================================= */}

        <label>
          Venue
        </label>

        <input
          type="text"
          name="classroom"
          placeholder="Hall No. 03"
          value={values.classroom}
          onChange={handleChange}
        />

        {/* =================================================
            EVENT DATE
        ================================================= */}

        <label>
          Event Date
        </label>

        <input
          type="date"
          name="eventDate"
          value={values.eventDate}
          onChange={handleChange}
        />

        {/* =================================================
            SCHEDULE TITLE
        ================================================= */}

        <label>
          Schedule Title
        </label>

        <input
          type="text"
          name="scheduleTitle"
          placeholder="Seminar Schedule"
          value={values.scheduleTitle}
          onChange={handleChange}
        />

        {/* =================================================
            SCHEDULE
        ================================================= */}

        <h3 className="schedule-title">
          Schedule
        </h3>

        <table className="schedule-table">

          <thead>
            <tr>
              <th>
                Timing
              </th>

              <th>
                Date
              </th>

              <th>
                Division
              </th>

              <th>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {values.schedule.map(
              (row, index) => (
                <tr key={index}>

                  {/* TIMING */}

                  <td>
                    <input
                      type="text"
                      placeholder="10:00 am to 1:00 pm"
                      value={row.timing}
                      onChange={(e) =>
                        handleScheduleChange(
                          index,
                          "timing",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* DATE */}

                  <td>
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) =>
                        handleScheduleChange(
                          index,
                          "date",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* DIVISION */}

                  <td>
                    <input
                      type="text"
                      placeholder="A1, A2, A3"
                      value={row.division}
                      onChange={(e) =>
                        handleScheduleChange(
                          index,
                          "division",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* DELETE */}

                  <td>
                    <button
                      type="button"
                      className="delete-row-btn"
                      onClick={() =>
                        deleteScheduleRow(index)
                      }
                      title="Delete row"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>

                </tr>
              )
            )}
          </tbody>

        </table>

        {/* =================================================
            ADD NEW SCHEDULE ROW
        ================================================= */}

        <button
          type="button"
          className="add-row-btn"
          onClick={addScheduleRow}
        >
          <Plus size={17} />

          Add Schedule Row
        </button>

        {/* =================================================
            NOTE
        ================================================= */}

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

        {/* =================================================
            SELECT COORDINATOR
        ================================================= */}

        <label>
          Select Coordinator
        </label>

        <select
          name="coordinator"
          value={values.coordinator}
          onChange={handleChange}
        >
          <option value="">
            Select a Coordinator...
          </option>

          {coordinators.map(
            (coordinator) => (
              <option
                key={coordinator.email}
                value={coordinator.email}
              >
                {coordinator.coordinatorType} —{" "}
                {coordinator.name}
              </option>
            )
          )}
        </select>

        {/* =================================================
            SEND TO COORDINATOR
        ================================================= */}

        <button
          type="button"
          className="send-coordinator-btn"
          disabled={!values.coordinator}
          onClick={handleSendToCoordinator}
        >
          Send to Coordinator
        </button>

        {/* =================================================
            DOWNLOAD WORD
        ================================================= */}

        <button
          type="button"
          className="download-word-btn"
          onClick={handleDownloadWord}
        >
          Download Word
        </button>

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