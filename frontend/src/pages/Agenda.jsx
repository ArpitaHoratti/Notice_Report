import { useState } from "react";
import { ArrowLeft, Trash2, Plus, Save } from "lucide-react";

import "./Notice.css";

import CollegeAgenda from "../components/CollegeAgenda";

import { saveDocument } from "../utils/storage";
import { downloadAgendaAsWord } from "../utils/downloadAgenda";

export default function Agenda({ user, setCurrentPage, editingDoc }) {
  // =====================================================
  // AGENDA DATA
  // =====================================================

  const [values, setValues] = useState(
    editingDoc?.agendaValues || {
      courseTitle: "BACHELOR OF COMPUTER APPLICATION",
      topic: "Cloud Computing",

      rows: [
        { time: "19/05/2026  10:00 AM", activity: "Inauguration", person: "" },
        { time: "10:10AM", activity: "Welcome Speech to Resource person", person: "Ms.Tanmaya" },
        { time: "10:15AM", activity: "Guest introduction", person: "Mr.Mayur" },
        { time: "10:25 AM to 5:00 PM", activity: "Session Conducted", person: "Ms.Namita" },
        { time: "5:00PM", activity: "Vote of Thanks", person: "Mr.Gagan" },
      ],
    }
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
  // HANDLE AGENDA ROW
  // =====================================================

  const handleRowChange = (index, field, value) => {
    setValues((prev) => {
      const updatedRows = [...prev.rows];

      updatedRows[index] = {
        ...updatedRows[index],
        [field]: value,
      };

      return {
        ...prev,
        rows: updatedRows,
      };
    });
  };

  // =====================================================
  // ADD NEW ROW
  // =====================================================

  const addRow = () => {
    setValues((prev) => ({
      ...prev,

      rows: [
        ...prev.rows,
        { time: "", activity: "", person: "" },
      ],
    }));
  };

  // =====================================================
  // DELETE ROW
  // =====================================================

  const deleteRow = (index) => {
    setValues((prev) => {
      if (prev.rows.length <= 1) {
        return prev;
      }

      return {
        ...prev,

        rows: prev.rows.filter((_, i) => i !== index),
      };
    });
  };

  // =====================================================
  // SAVE (queues it on the Teacher Dashboard, like Report)
  // =====================================================

  const handleSave = () => {
    saveDocument({
      id: editingDoc?.id,
      title: `Agenda: ${values.topic}`,
      type: "Agenda",
      date: new Date().toLocaleDateString("en-GB"),
      author: user?.name || "Teacher",
      details: `${values.rows.length} agenda item(s) • ${values.courseTitle}`,
      agendaValues: values,
    });

    alert("Agenda saved and queued for approval!");
  };

  // =====================================================
  // DOWNLOAD WORD
  // =====================================================

  const handleDownloadWord = () => {
    downloadAgendaAsWord(values);
  };

  return (
    <div className="notice-page">

      {/* =================================================
          LEFT SIDE - CREATE AGENDA
      ================================================= */}

      <aside className="notice-form">

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          type="button"
          className="back-btn"
          onClick={() => setCurrentPage("teacher")}
        >
          <ArrowLeft size={18} />

          <span>Dashboard</span>
        </button>

        {/* =================================================
            TITLE
        ================================================= */}

        <h1>Create Agenda</h1>

        {/* =================================================
            COURSE TITLE
        ================================================= */}

        <label>Course Title</label>

        <input
          type="text"
          name="courseTitle"
          placeholder="BACHELOR OF COMPUTER APPLICATION"
          value={values.courseTitle}
          onChange={handleChange}
        />

        {/* =================================================
            TOPIC
        ================================================= */}

        <label>Topic</label>

        <input
          type="text"
          name="topic"
          placeholder="Cloud Computing"
          value={values.topic}
          onChange={handleChange}
        />

        {/* =================================================
            AGENDA ROWS
        ================================================= */}

        <h3 className="schedule-title">Agenda Items</h3>

        <table className="schedule-table">

          <thead>
            <tr>
              <th>Time</th>
              <th>Activity</th>
              <th>Person</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {values.rows.map((row, index) => (
              <tr key={index}>

                {/* TIME */}

                <td>
                  <input
                    type="text"
                    placeholder="10:10AM"
                    value={row.time}
                    onChange={(e) =>
                      handleRowChange(index, "time", e.target.value)
                    }
                  />
                </td>

                {/* ACTIVITY */}

                <td>
                  <input
                    type="text"
                    placeholder="Guest introduction"
                    value={row.activity}
                    onChange={(e) =>
                      handleRowChange(index, "activity", e.target.value)
                    }
                  />
                </td>

                {/* PERSON */}

                <td>
                  <input
                    type="text"
                    placeholder="Mr.Mayur"
                    value={row.person}
                    onChange={(e) =>
                      handleRowChange(index, "person", e.target.value)
                    }
                  />
                </td>

                {/* DELETE */}

                <td>
                  <button
                    type="button"
                    className="delete-row-btn"
                    onClick={() => deleteRow(index)}
                    title="Delete row"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

        {/* =================================================
            ADD NEW ROW
        ================================================= */}

        <button
          type="button"
          className="add-row-btn"
          onClick={addRow}
        >
          <Plus size={17} />
          Add Agenda Row
        </button>

        {/* =================================================
            SAVE
        ================================================= */}

        <button
          type="button"
          className="send-coordinator-btn"
          onClick={handleSave}
        >
          <Save size={16} style={{ marginRight: 6 }} />
          Save Agenda
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
          RIGHT SIDE - AGENDA PREVIEW
      ================================================= */}

      <main className="notice-preview-container">

        <div className="notice-preview-title">Agenda Preview</div>

        <div className="notice-preview-content">
          <CollegeAgenda values={values} />
        </div>

      </main>

    </div>
  );
}