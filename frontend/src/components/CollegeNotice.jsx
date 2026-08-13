// src/components/CollegeNotice.jsx

import kleLogo from "../assets/kle-centenary-logo.jpg";

const styles = `
/* =====================================================
   COLLEGE NOTICE PREVIEW
===================================================== */

.college-notice-preview {
  width: 100%;
  padding: 30px;

  background: #f3eee5;

  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  overflow-x: auto;
  overflow-y: auto;
}


/* =====================================================
   A4 NOTICE PAPER
===================================================== */

.college-notice-sheet {
  position: relative;

  width: 794px;
  min-width: 794px;

  height: 1123px;
  min-height: 1123px;

  flex-shrink: 0;

  margin: 0 auto;

  background: white;

  padding: 55px 55px 65px;

  box-sizing: border-box;

  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.12);

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  color: #111;
}


/* =====================================================
   CORNER MARKS
===================================================== */

.college-notice-sheet .corner {
  position: absolute;

  width: 40px;
  height: 40px;

  pointer-events: none;
}

.college-notice-sheet .corner.top-left {
  top: 28px;
  left: 28px;

  border-top: 1px solid #777;
  border-left: 1px solid #777;
}

.college-notice-sheet .corner.top-right {
  top: 28px;
  right: 28px;

  border-top: 1px solid #777;
  border-right: 1px solid #777;
}

.college-notice-sheet .corner.bottom-left {
  bottom: 28px;
  left: 28px;

  border-bottom: 1px solid #777;
  border-left: 1px solid #777;
}

.college-notice-sheet .corner.bottom-right {
  bottom: 28px;
  right: 28px;

  border-bottom: 1px solid #777;
  border-right: 1px solid #777;
}


/* =====================================================
   COLLEGE HEADER
===================================================== */

.college-header {
  display: flex;

  width: 100%;

  align-items: flex-start;

  margin-top: 8px;

  box-sizing: border-box;
}


/* =====================================================
   LOGO
===================================================== */

.college-logo-area {
  width: 150px;

  flex: 0 0 150px;

  display: flex;

  justify-content: center;

  align-items: flex-start;

  padding-top: 5px;

  box-sizing: border-box;
}

.college-logo {
  width: 105px;
  height: 105px;

  object-fit: contain;

  display: block;
}


/* =====================================================
   HEADER TEXT
===================================================== */

.college-header-content {
  flex: 1;

  text-align: center;

  min-width: 0;

  overflow: hidden;
}

.society-name {
  margin: 0 0 5px;

  font-size: 15px;

  font-weight: 700;

  color: #111;
}

.college-name {
  margin: 0;

  font-size: 27px;

  line-height: 1.15;

  font-weight: 800;

  color: #e00000;

  letter-spacing: 0.4px;

  white-space: nowrap;
}

.autonomous {
  margin: 7px 0 4px;

  font-size: 17px;

  line-height: 1.2;

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

  line-height: 1.35;

  font-weight: 700;

  color: #96372d;
}

.address-line {
  margin: 3px 0 0;

  font-size: 15px;

  line-height: 1.25;

  font-weight: 700;

  color: #96372d;
}


/* =====================================================
   HEADER RULES
===================================================== */

.header-rule {
  width: 100%;

  border: 0;

  border-top: 1.5px solid #222;

  margin: 18px 0 9px;
}

.department-bar {
  width: 100%;

  text-align: center;

  font-size: 17px;

  font-weight: 800;

  letter-spacing: 0.2px;

  margin: 0;
}

.header-rule-bottom {
  width: 100%;

  border: 0;

  border-top: 1.5px solid #222;

  margin: 9px 0 0;
}


/* =====================================================
   DATE
===================================================== */

.notice-date-row {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-top: 25px;

  font-size: 15px;

  font-weight: 700;
}

.notice-date-value {
  font-weight: 600;
}


/* =====================================================
   NOTICE TITLE
===================================================== */

.notice-heading {
  text-align: center;

  margin-top: 24px;

  font-size: 25px;

  font-weight: 800;

  text-decoration: underline;
}


/* =====================================================
   NOTICE BODY
===================================================== */

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


/* =====================================================
   SCHEDULE TABLE
===================================================== */

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

  word-wrap: break-word;
}

.schedule-table th {
  font-weight: 800;

  background: #fafafa;
}


/* =====================================================
   NOTE
===================================================== */

.notice-note {
  margin-top: 28px;

  font-size: 15px;

  line-height: 1.5;

  font-weight: 700;
}


/* =====================================================
   SIGNATURES
===================================================== */

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


/* =====================================================
   PRINT
===================================================== */

@media print {

  .college-notice-preview {
    width: 210mm;

    padding: 0;

    margin: 0;

    background: white;

    overflow: visible;

    display: block;
  }

  .college-notice-sheet {
    width: 210mm;

    min-width: 210mm;

    height: 297mm;

    min-height: 297mm;

    margin: 0;

    padding: 18mm;

    box-shadow: none;
  }
}
`;


/* =====================================================
   DATE FORMATTER
===================================================== */

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


/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function CollegeNotice({
  values = {},
}) {

  /* =========================
     FORM VALUES
  ========================= */

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
    "Hall No. 03";

  const time =
    values.time ||
    "10:00 am to 1:00 pm";

  const division =
    values.division ||
    "A1, A2, A3";

  const note =
    values.note ||
    "Attendance is Mandatory.";

  /* =========================
     SECOND SCHEDULE ROW
  ========================= */

  const time2 =
    values.time2 || "";

  const division2 =
    values.division2 || "";

  const hasSecondRow =
    Boolean(time2 || division2);


  return (
    <>
      <style>{styles}</style>

      <div className="college-notice-preview">

        <article className="college-notice-sheet">

          {/* =====================================
              CORNER MARKS
          ===================================== */}

          <div className="corner top-left" />
          <div className="corner top-right" />
          <div className="corner bottom-left" />
          <div className="corner bottom-right" />


          {/* =====================================
              COLLEGE HEADER
          ===================================== */}

          <header className="college-header">

            {/* LOGO */}

            <div className="college-logo-area">

              <img
                className="college-logo"
                src={kleLogo}
                alt="KLE Society crest"
              />

            </div>


            {/* HEADER TEXT */}

            <div className="college-header-content">

              <p className="society-name">
                KLE SOCIETY'S
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
                Accredited at 'A<sup>++</sup>' Grade with
                3.54 CGPA by NAAC
              </p>

              <p className="address-line">
                VIDYANAGAR, HUBBALLI-1
              </p>

            </div>

          </header>


          {/* =====================================
              DEPARTMENT
          ===================================== */}

          <hr className="header-rule" />

          <div className="department-bar">
            BACHELOR OF COMPUTER APPLICATION
          </div>

          <hr className="header-rule-bottom" />


          {/* =====================================
              DATE
          ===================================== */}

          <div className="notice-date-row">

            <span>
              Date:
            </span>

            <span className="notice-date-value">
              {noticeDate}
            </span>

          </div>


          {/* =====================================
              NOTICE TITLE
          ===================================== */}

          <div className="notice-heading">
            Notice
          </div>


          {/* =====================================
              NOTICE BODY
          ===================================== */}

          <div className="notice-body">

            <p>

              All the students of{" "}

              <span className="notice-value">
                {className}
              </span>

              {" "}are hereby informed to attend

              <br />

              Seminar on “

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


          {/* =====================================
              SCHEDULE
          ===================================== */}

          <table className="schedule-table">

            <caption>
              Seminar Schedule
            </caption>

            <thead>

              <tr>

                <th style={{ width: "34%" }}>
                  Timing
                </th>

                <th style={{ width: "33%" }}>
                  Date
                </th>

                <th style={{ width: "33%" }}>
                  Division
                </th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td>
                  {time}
                </td>

                <td rowSpan={hasSecondRow ? 2 : 1}>
                  {eventDate}
                </td>

                <td>
                  {division}
                </td>

              </tr>


              {hasSecondRow && (

                <tr>

                  <td>
                    {time2}
                  </td>

                  <td>
                    {division2}
                  </td>

                </tr>

              )}

            </tbody>

          </table>


          {/* =====================================
              NOTE
          ===================================== */}

          <p className="notice-note">
            NOTE: {note}
          </p>


          {/* =====================================
              SIGNATURES
          ===================================== */}

          <div className="notice-signatures">

            <div className="signature-box">

              {values.coordinatorTitle ||
                "Seminar Coordinator"}

              {values.coordinatorName && (
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    marginTop: "4px",
                    color: "#444",
                  }}
                >
                  ({values.coordinatorName})
                </div>
              )}

            </div>


            <div className="signature-box">

              {values.academicTitle ||
                "Academic Coordinator"}

              {values.academicName && (
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    marginTop: "4px",
                    color: "#444",
                  }}
                >
                  ({values.academicName})
                </div>
              )}

            </div>


            <div className="signature-box">

              {values.principalTitle ||
                "Principal"}

              {values.principalName && (
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    marginTop: "4px",
                    color: "#444",
                  }}
                >
                  ({values.principalName})
                </div>
              )}

            </div>

          </div>

        </article>

      </div>
    </>
  );
}