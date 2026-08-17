// src/components/CollegeAgenda.jsx

import "./CollegeAgenda.css";
import kleSocietyLogo from "../assets/kle-centenary-logo.jpg";

export default function CollegeAgenda({ values = {} }) {

  // Agenda.jsx keeps rows in values.rows (an array of
  // { time, activity, person }). Fall back to placeholder
  // rows only if nothing has been entered yet.
  const agendaRows =
    values.rows && values.rows.length > 0
      ? values.rows
      : [
          { time: "10:00 AM", activity: "Inauguration", person: "" },
          { time: "10:10AM", activity: "Welcome Speech to Resource person", person: "" },
        ];

  return (
    <div className="college-agenda-page">

      {/* =====================================================
          COLLEGE HEADER (letterhead)
      ===================================================== */}

      <div className="college-agenda-header">

        <div className="college-agenda-logo-col">
          <img
            src={kleSocietyLogo}
            alt="KLE Society Logo"
            className="college-agenda-logo"
          />
        </div>

        <div className="college-agenda-center-col">

          <div className="agenda-kle-society">
            KLE SOCIETY’S
          </div>

          <div className="agenda-college-name">
             <p> P. C. JABIN SCIENCE COLLEGE</p>
          </div>

          <div className="agenda-autonomous">
            AUTONOMOUS
          </div>

          <div className="agenda-header-small">
            AFFILIATED TO KARNATAK UNIVERSITY DHARWAD
          </div>

          <div className="agenda-header-small">
            APPROVED BY UNIVERSITY GRANTS COMMISSION, NEW DELHI AND
          </div>

          <div className="agenda-header-small">
            GOVERNMENT OF KARNATAKA
          </div>

          <div className="agenda-header-small agenda-accreditation">
            Accredited at ‘A<sup>++</sup>’ Grade with 3.54 CGPA by NAAC
          </div>

          <div className="agenda-address">
            VIDYANAGAR, HUBBALLI-580031
          </div>

        </div>

        <div className="college-agenda-contact">

          <div><span>Estd.</span><span>: 1957</span></div>
          <div><span>Phone</span><span>: 0836-2372285</span></div>
          <div><span>Principal</span><span>: 0836- 2376943</span></div>
          <div><span>e-mail</span><span>: jabincollege@gmail.com</span></div>
          <div><span>website</span><span>: www.jabincollege.com</span></div>

        </div>

      </div>

      <div className="agenda-bca-title">
        {values.courseTitle || "BACHELOR OF COMPUTER APPLICATION"}
      </div>


      {/* =====================================================
          TOPIC + AGENDA HEADING
      ===================================================== */}

      <div className="college-agenda-topic-block">

        <div className="college-agenda-topic">
          “{values.topic || "Cloud Computing"}”
        </div>

        <div className="college-agenda-heading">
          AGENDA
        </div>

      </div>


      {/* =====================================================
          AGENDA TABLE
      ===================================================== */}

      <table className="college-agenda-table">

        <thead>
          <tr>
            <th>Time</th>
            <th>Specifications</th>
          </tr>
        </thead>

        <tbody>

          {agendaRows.map((row, index) => (
            <tr key={index}>

              <td>
                {row.time || "—"}
              </td>

              <td>
                <p>{row.activity || "—"}</p>
                {row.person && <p>{row.person}</p>}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}