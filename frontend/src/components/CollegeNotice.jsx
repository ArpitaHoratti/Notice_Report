// src/components/CollegeNotice.jsx

import kleLogo from "../assets/kle-centenary-logo.jpg";

const styles = `
.college-notice-preview {
  width: 100%;
  min-height: 100%;
  padding: 30px;
  background: #f3eee5;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  overflow: auto;
}

.college-notice-sheet {
  position: relative;
  width: 794px;
  min-width: 794px;
  min-height: 1123px;
  background: white;
  padding: 55px;
  box-sizing: border-box;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  font-family: Arial, Helvetica, sans-serif;
  color: #111;
}

.corner {
  position: absolute;
  width: 40px;
  height: 40px;
}

.top-left {
  top: 28px;
  left: 28px;
  border-top: 1px solid #777;
  border-left: 1px solid #777;
}

.top-right {
  top: 28px;
  right: 28px;
  border-top: 1px solid #777;
  border-right: 1px solid #777;
}

.bottom-left {
  bottom: 28px;
  left: 28px;
  border-bottom: 1px solid #777;
  border-left: 1px solid #777;
}

.bottom-right {
  bottom: 28px;
  right: 28px;
  border-bottom: 1px solid #777;
  border-right: 1px solid #777;
}

.college-header {
  display: flex;
  width: 100%;
  align-items: flex-start;
}

.college-logo-area {
  width: 150px;
  flex: 0 0 150px;
  display: flex;
  justify-content: center;
}

.college-logo {
  width: 105px;
  height: 105px;
  object-fit: contain;
}

.college-header-content {
  flex: 1;
  text-align: center;
}

.society-name {
  margin: 0 0 5px;
  font-size: 15px;
  font-weight: 700;
}

.college-name {
  margin: 0;
  font-size: 27px;
  font-weight: 800;
  color: #e00000;
}

.autonomous {
  margin: 7px 0 4px;
  font-size: 17px;
  font-weight: 800;
  color: #0068b3;
}

.header-line {
  margin: 2px 0;
  font-size: 10px;
  line-height: 1.35;
  font-weight: 700;
  color: #0068b3;
}

.naac-line {
  margin: 9px 0 0;
  font-size: 14px;
  font-weight: 700;
  color: #96372d;
}

.address-line {
  margin: 3px 0 0;
  font-size: 15px;
  font-weight: 700;
  color: #96372d;
}

.header-rule {
  width: 100%;
  border: 0;
  border-top: 1.5px solid #222;
  margin: 18px 0 9px;
}

.department-bar {
  text-align: center;
  font-size: 17px;
  font-weight: 800;
}

.header-rule-bottom {
  width: 100%;
  border: 0;
  border-top: 1.5px solid #222;
  margin: 9px 0 0;
}

/* DATE */

.notice-date-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 25px;
  font-size: 15px;
  font-weight: 700;
}

.date-label {
  font-weight: 800;
}

.notice-date-value {
  font-weight: 600;
}

/* NOTICE */

.notice-heading {
  text-align: center;
  margin-top: 24px;
  font-size: 25px;
  font-weight: 800;
  text-decoration: underline;
}

.notice-body {
  margin-top: 28px;
  font-size: 16px;
  line-height: 1.9;
  text-align: left;
}

.notice-body p {
  margin: 0;
}

.notice-value {
  font-weight: 700;
}

/* SCHEDULE */

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  font-size: 14px;
  table-layout: fixed;
}

.schedule-table caption {
  caption-side: top;
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 8px;
}

.schedule-table th,
.schedule-table td {
  border: 1px solid #222;
  padding: 11px 8px;
  text-align: center;
  vertical-align: middle;
}

.schedule-table th {
  font-weight: 800;
  background: #fafafa;
}

/* NOTE */

.notice-note {
  margin-top: 28px;
  font-size: 15px;
  font-weight: 700;
}

/* SIGNATURES */

.notice-signatures {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-top: 100px;
}

.signature-box {
  width: 31%;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
}

.signature-name {
  margin-top: 5px;
  font-size: 13px;
  font-weight: 500;
  color: #444;
}

@media print {

  .college-notice-preview {
    width: 210mm;
    padding: 0;
    background: white;
  }

  .college-notice-sheet {
    width: 210mm;
    min-width: 210mm;
    min-height: 297mm;
    padding: 18mm;
    box-shadow: none;
  }
}
`;


// =====================================================
// DATE FORMATTER
// =====================================================

function formatDate(value) {

  if (!value) {
    return "";
  }

  if (typeof value !== "string") {
    return "";
  }

  const parts = value.split("-");

  if (parts.length !== 3) {
    return value;
  }

  const [year, month, day] = parts;

  return `${day}-${month}-${year}`;
}


// =====================================================
// MAIN COMPONENT
// =====================================================

export default function CollegeNotice({
  values = {},
}) {

  const noticeDate =
    formatDate(values.noticeDate) ||
    "18-05-2026";

  const eventDate =
    formatDate(values.eventDate) ||
    "19-05-2026";

  const className =
    values.className ||
    "II semester";

  const activityName =
    values.activityName ||
    "Cloud Computing";

  const classroom =
    values.classroom ||
    "Hall no 03";

  const time =
    values.time ||
    "10:00 am to 1:00 am";

  const time2 =
    values.time2 ||
    "2:00 pm to 5:00 pm";

  const division =
    values.division ||
    "A1, A2, A3";

  const division2 =
    values.division2 ||
    "A4, A5, A6";

  const note =
    values.note ||
    "Attendance is Mandatory.";

    return (
      <>
        <style>{styles}</style>
    
        <div className="college-notice-preview">

      <article className="college-notice-sheet">


        {/* =================================================
            CORNER MARKS
        ================================================= */}

        <div className="corner top-left"></div>
        <div className="corner top-right"></div>
        <div className="corner bottom-left"></div>
        <div className="corner bottom-right"></div>


        {/* =================================================
            COLLEGE HEADER
        ================================================= */}

        <header className="college-header">

          <div className="college-logo-area">

            <img
              className="college-logo"
              src={kleLogo}
              alt="KLE Society crest"
            />

          </div>


          <div className="college-header-content">

            <p className="society-name">
              KLE SOCIETY’S
            </p>

            <p className="college-name">
              P. C. JABIN SCIENCE COLLEGE
            </p>

            <p className="autonomous">
              AUTONOMOUS
            </p>

            <p className="header-line">
              AFFILIATED TO KARNATAK UNIVERSITY DHARWAD
            </p>

            <p className="header-line">
              APPROVED BY UNIVERSITY GRANTS COMMISSION,
              NEW DELHI AND
              <br />
              GOVERNMENT OF KARNATAKA
            </p>

            <p className="naac-line">
              Accredited at ‘A<sup>++</sup>’ Grade with
              3.54 CGPA by NAAC
            </p>

            <p className="address-line">
              VIDYANAGAR, HUBBALLI-580031
            </p>

          </div>

        </header>


        {/* =================================================
            DEPARTMENT
        ================================================= */}

        <hr className="header-rule" />

        <div className="department-bar">
          BACHELOR OF COMPUTER APPLICATION
        </div>

        <hr className="header-rule-bottom" />


        {/* =================================================
            DATE
        ================================================= */}

        <div className="notice-date-row">

          <span className="date-label">
            Date:
          </span>

          <span className="notice-date-value">
            {noticeDate}
          </span>

        </div>


        {/* =================================================
            NOTICE TITLE
        ================================================= */}

        <div className="notice-heading">
          Notice
        </div>


        {/* =================================================
            NOTICE BODY
        ================================================= */}

        <div className="notice-body">

          <p>

            All the students of{" "}

            <span className="notice-value">
              {className}
            </span>

            {" "}are hereby informed to attend Seminar on “
            
            <span className="notice-value">
              {activityName}
            </span>

            ” in{" "}

            <span className="notice-value">
              {classroom}
            </span>

            {" "}on{" "}

            <span className="notice-value">
              {eventDate}
            </span>

            .

          </p>

        </div>


        {/* =================================================
            SEMINAR SCHEDULE
        ================================================= */}

        <table className="schedule-table">

          <caption>
            Seminar Schedule
          </caption>

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

            </tr>

          </thead>


          <tbody>

            <tr>

              <td>
                {time}
              </td>

              <td rowSpan="2">
                {eventDate}
              </td>

              <td>
                {division}
              </td>

            </tr>


            <tr>

              <td>
                {time2}
              </td>

              <td>
                {division2}
              </td>

            </tr>

          </tbody>

        </table>


        {/* =================================================
            NOTE
        ================================================= */}

        <p className="notice-note">

          <strong>
            NOTE:
          </strong>{" "}

          {note}

        </p>


        {/* =================================================
            SIGNATURES
        ================================================= */}

        <div className="notice-signatures">


          <div className="signature-box">

            <div>
              {values.coordinatorTitle ||
                "Seminar Coordinator"}
            </div>

            {values.coordinatorName && (

              <div className="signature-name">
                {values.coordinatorName}
              </div>

            )}

          </div>


          <div className="signature-box">

            <div>
              {values.academicTitle ||
                "Academic Coordinator"}
            </div>

            {values.academicName && (

              <div className="signature-name">
                {values.academicName}
              </div>

            )}

          </div>


          <div className="signature-box">

            <div>
              {values.principalTitle ||
                "Principal"}
            </div>

            {values.principalName && (

              <div className="signature-name">
                {values.principalName}
              </div>

            )}

          </div>


        </div>


      </article>

      </div>
  </>
  );
}