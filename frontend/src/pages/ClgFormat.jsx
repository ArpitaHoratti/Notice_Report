import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";

import "./Notice.css";

import ClgFormat from "../components/ClgFormat";

import { saveDocument } from "../utils/storage";
import { downloadClgFormatAsWord } from "../utils/downloadClgFormat";

export default function ClgFormatPage({ user, setCurrentPage, editingDoc }) {
  const [values, setValues] = useState(
    editingDoc?.clgFormatValues || {
      topic: "Cloud Computing",
      dateOfWorkshop: "19th  May 2026",
      timeAndDuration: "10:00am to 5:00pm",
      organizedFor: "II Semester A1,A2,A3,A4,A5 and A6 Division",
      objective:
        "The Cloud Computing seminar helps students understand the basic concepts and importance of cloud technology in today's digital world. It introduces key topics such as cloud services, data storage, virtualization, and cloud deployment models. The seminar creates awareness about the applications of cloud computing in businesses and various industries. It also encourages students to explore career opportunities and develop skills in emerging cloud technologies.",
      resourcePersonDetails: "Miss Nagveni Neelgar",
      facultyCoordinator: "Prof. Pooja P, Prof. Poornima C, Prof.Suraksha B",
      receivalHospitality: "Ms. Vaishnavi",
      introductionBy: "Ms. Meghana",
      voteOfThanks: "Mr. Gagan",
      photography: "Ms.Srushti",
      feedbackLink: "Mr.Veeresh",
      studentsPresent: "298",
      enclosedWithReport:
        "[1] Resource Person Profile.\n[2] Photos\n[3] Feedback Analysis\n[4] Attendance Sheet.",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    saveDocument({
      id: editingDoc?.id,
      title: `College Format: ${values.topic}`,
      type: "College Format",
      date: new Date().toLocaleDateString("en-GB"),
      author: user?.name || "Teacher",
      details: `Seminar report • ${values.dateOfWorkshop}`,
      clgFormatValues: values,
    });

    alert("College Format saved and queued for approval!");
  };

  const handleDownloadWord = () => {
    downloadClgFormatAsWord(values);
  };

  return (
    <div className="notice-page">

      <aside className="notice-form">

        <button
          type="button"
          className="back-btn"
          onClick={() => setCurrentPage("teacher")}
        >
          <ArrowLeft size={18} />
          <span>Dashboard</span>
        </button>

        <h1>Create College Format</h1>

        <label>Topic</label>
        <input
          type="text"
          name="topic"
          placeholder="Cloud Computing"
          value={values.topic}
          onChange={handleChange}
        />

        <label>Date of Workshop</label>
        <input
          type="text"
          name="dateOfWorkshop"
          placeholder="19th  May 2026"
          value={values.dateOfWorkshop}
          onChange={handleChange}
        />

        <label>Time and Duration</label>
        <input
          type="text"
          name="timeAndDuration"
          placeholder="10:00am to 5:00pm"
          value={values.timeAndDuration}
          onChange={handleChange}
        />

        <label>Seminar Organized For</label>
        <input
          type="text"
          name="organizedFor"
          placeholder="II Semester A1,A2,A3,A4,A5 and A6 Division"
          value={values.organizedFor}
          onChange={handleChange}
        />

        <label>Objective</label>
        <textarea
          name="objective"
          rows={5}
          placeholder="Objective paragraph..."
          value={values.objective}
          onChange={handleChange}
        />

        <label>Resource Person’s Details</label>
        <input
          type="text"
          name="resourcePersonDetails"
          placeholder="Miss Nagveni Neelgar"
          value={values.resourcePersonDetails}
          onChange={handleChange}
        />

        <label>Faculty Coordinator</label>
        <input
          type="text"
          name="facultyCoordinator"
          placeholder="Prof. Pooja P, Prof. Poornima C"
          value={values.facultyCoordinator}
          onChange={handleChange}
        />

        <label>Resource Person’s Receival &amp; Hospitality Managed by</label>
        <input
          type="text"
          name="receivalHospitality"
          placeholder="Ms. Vaishnavi"
          value={values.receivalHospitality}
          onChange={handleChange}
        />

        <label>Resource Person Introduction by</label>
        <input
          type="text"
          name="introductionBy"
          placeholder="Ms. Meghana"
          value={values.introductionBy}
          onChange={handleChange}
        />

        <label>Vote of Thanks Delivered by</label>
        <input
          type="text"
          name="voteOfThanks"
          placeholder="Mr. Gagan"
          value={values.voteOfThanks}
          onChange={handleChange}
        />

        <label>Photography Managed by</label>
        <input
          type="text"
          name="photography"
          placeholder="Ms.Srushti"
          value={values.photography}
          onChange={handleChange}
        />

        <label>Feedback Link shared by</label>
        <input
          type="text"
          name="feedbackLink"
          placeholder="Mr.Veeresh"
          value={values.feedbackLink}
          onChange={handleChange}
        />

        <label>Number of Students Present</label>
        <input
          type="text"
          name="studentsPresent"
          placeholder="298"
          value={values.studentsPresent}
          onChange={handleChange}
        />

        <label>Enclosed with Report (one per line)</label>
        <textarea
          name="enclosedWithReport"
          rows={4}
          placeholder={"[1] Resource Person Profile.\n[2] Photos"}
          value={values.enclosedWithReport}
          onChange={handleChange}
        />

        <button
          type="button"
          className="send-coordinator-btn"
          onClick={handleSave}
        >
          <Save size={16} style={{ marginRight: 6 }} />
          Save College Format
        </button>

        <button
          type="button"
          className="download-word-btn"
          onClick={handleDownloadWord}
        >
          Download Word
        </button>

      </aside>

      <main className="notice-preview-container">
        <div className="notice-preview-title">College Format Preview</div>
        <div className="notice-preview-content">
          <ClgFormat values={values} />
        </div>
      </main>

    </div>
  );
}