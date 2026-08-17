// src/components/CollegeNotice.jsx

import "./CollegeNotice.css";
import kleSocietyLogo from "../assets/kle-centenary-logo.jpg";





export default function CollegeNotice({ values = {} }) {

  const formatDate = (date) => {
    if (!date) return "";

    const parts = date.split("-");

    if (parts.length !== 3) {
      return date;
    }

    const [year, month, day] = parts;

    return `${day}/${month}/${year}`;
  };

  // Notice.jsx keeps schedule rows in values.schedule (an array),
  // not fixed time/time2/division/division2 fields. Fall back to
  // two placeholder rows only if nothing has been entered yet.
  const scheduleRows =
    values.schedule && values.schedule.length > 0
      ? values.schedule
      : [
          { timing: "10:00 am to 1:00 am", date: "", division: "A1, A2, A3" },
          { timing: "2:00 pm to 5:00 pm", date: "", division: "A4, A5, A6" },
        ];

  return (
    <div className="college-notice-page">

      {/* =====================================================
          COLLEGE HEADER (letterhead)
      ===================================================== */}

      <div className="college-notice-header">

        <img
          src={kleSocietyLogo}
          alt="KLE Society Logo"
          className="college-notice-logo"
        />

        <div className="kle-society">
          KLE SOCIETY’S
        </div>

        <div className="college-name">
          P. C. JABIN SCIENCE COLLEGE
        </div>

        <div className="autonomous">
          AUTONOMOUS
        </div>

        <div className="header-small">
          AFFILIATED TO KARNATAK UNIVERSITY DHARWAD
        </div>

        <div className="header-small">
          APPROVED BY UNIVERSITY GRANTS COMMISSION, NEW DELHI AND
        </div>

        <div className="header-small">
          GOVERNMENT OF KARNATAKA
        </div>

        <div className="header-small accreditation">
          Accredited at ‘A<sup>++</sup>’ Grade with 3.54 CGPA by NAAC
        </div>

        <div className="address">
          VIDYANAGAR, HUBBALLI-580031
        </div>

      </div>

      <div className="bca-title">
        BACHELOR OF COMPUTER APPLICATION
      </div>


      {/* =====================================================
          DATE
      ===================================================== */}

      <div className="college-notice-date">
        <strong>Date:</strong>{" "}
        {formatDate(values.noticeDate)}
      </div>


      {/* =====================================================
          NOTICE TITLE
      ===================================================== */}

      <div className="college-notice-heading">
        Notice
      </div>


      {/* =====================================================
          NOTICE CONTENT
      ===================================================== */}

      <div className="college-notice-body">

        All the students of{" "}

        <strong>
          {values.semester || "II semester"}
        </strong>{" "}

        are hereby informed to attend{" "}

        {values.activityType || "Seminar"} on “
        <strong className="topic-bold">
          {values.topic || "Cloud Computing"}
        </strong>
        ” in {values.classroom || "Hall no 03"} on{" "}

        <strong>
          {formatDate(values.eventDate) || "19/05/2026"}
        </strong>.

      </div>


      {/* =====================================================
          SEMINAR SCHEDULE
      ===================================================== */}

      <table className="college-notice-schedule">

        <thead>

          <tr>
            <th colSpan="3">
              {values.scheduleTitle || "Seminar Schedule"}
            </th>
          </tr>

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
          </tr>

        </thead>


        <tbody>

          {scheduleRows.map((row, index) => (
            <tr key={index}>

              <td>
                {row.timing || "—"}
              </td>

              <td>
                {formatDate(row.date) ||
                  formatDate(values.eventDate) ||
                  "19/05/2026"}
              </td>

              <td>
                {row.division || "—"}
              </td>

            </tr>
          ))}

        </tbody>

      </table>


      {/* =====================================================
          NOTE
      ===================================================== */}

      <div className="college-notice-note">

        <strong>NOTE:</strong>{" "}

        {values.note || "Attendance is Mandatory."}

      </div>


      {/* =====================================================
          SIGNATURES
      ===================================================== */}

      <div className="college-notice-signatures">

        <span>Seminar Coordinators</span>

        <span>Academic Coordinator</span>

        <span>Principal</span>

      </div>

    </div>
  );
}
