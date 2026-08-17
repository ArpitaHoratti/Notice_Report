// src/components/ClgFormat.jsx

import "./ClgFormat.css";
import kleSocietyLogo from "../assets/kle-centenary-logo.jpg";

export default function ClgFormat({ values = {} }) {

  const enclosedItems = (values.enclosedWithReport || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="clg-format-page">

      <div className="clg-format-header">

        <div className="clg-format-logo-col">
          <img
            src={kleSocietyLogo}
            alt="KLE Society Logo"
            className="clg-format-logo"
          />
        </div>

        <div className="clg-format-center-col">

          <div className="clg-kle-society">KLE SOCIETY’S</div>

          <div className="clg-college-name">P. C. JABIN SCIENCE COLLEGE</div>

          <div className="clg-autonomous">AUTONOMOUS</div>

          <div className="clg-header-small">
            AFFILIATED TO KARNATAK UNIVERSITY DHARWAD
          </div>

          <div className="clg-header-small">
            APPROVED BY UNIVERSITY GRANTS COMMISSION, NEW DELHI AND
          </div>

          <div className="clg-header-small">GOVERNMENT OF KARNATAKA</div>

          <div className="clg-header-small clg-accreditation">
            Accredited at ‘A<sup>++</sup>’ Grade with 3.54 CGPA by NAAC
          </div>

          <div className="clg-address">VIDYANAGAR, HUBBALLI-580031</div>

        </div>

        <div className="clg-format-contact">
          <div><span>Estd.</span><span>: 1957</span></div>
          <div><span>Phone</span><span>: 0836-2372285</span></div>
          <div><span>Principal</span><span>: 0836- 2376943</span></div>
          <div><span>e-mail</span><span>: jabincollege@gmail.com</span></div>
          <div><span>website</span><span>: www.jabincollege.com</span></div>
        </div>

      </div>

      {/* Course title is fixed — not editable from the form */}
      <div className="clg-bca-title">
        BACHELOR OF COMPUTER APPLICATION
      </div>


      <div className="clg-subtitle">
        Seminar on “{values.topic || "Cloud Computing"}”
      </div>


      <table className="clg-format-table">
        <tbody>

          <tr>
            <td className="clg-label">Date of Workshop</td>
            <td className="clg-value">{values.dateOfWorkshop || "—"}</td>
          </tr>

          <tr>
            <td className="clg-label">Time and Duration</td>
            <td className="clg-value">{values.timeAndDuration || "—"}</td>
          </tr>

          <tr>
            <td className="clg-label">Seminar Organized For</td>
            <td className="clg-value">{values.organizedFor || "—"}</td>
          </tr>

          <tr>
            <td className="clg-label">Objective</td>
            <td className="clg-value">{values.objective || "—"}</td>
          </tr>

          <tr>
            <td className="clg-label">Resource Person’s Details</td>
            <td className="clg-value">{values.resourcePersonDetails || "—"}</td>
          </tr>

          <tr>
            <td className="clg-label">Faculty Coordinator</td>
            <td className="clg-value">{values.facultyCoordinator || "—"}</td>
          </tr>

          <tr>
            <td className="clg-label">
              Resource Person’s Receival &amp; Hospitality Managed by
            </td>
            <td className="clg-value">{values.receivalHospitality || "—"}</td>
          </tr>

          <tr>
            <td className="clg-label">Resource Person Introduction by</td>
            <td className="clg-value">{values.introductionBy || "—"}</td>
          </tr>

          <tr>
            <td className="clg-label">Vote of Thanks Delivered by</td>
            <td className="clg-value">{values.voteOfThanks || "—"}</td>
          </tr>

          <tr>
            <td className="clg-label">Photography Managed by</td>
            <td className="clg-value">{values.photography || "—"}</td>
          </tr>

          <tr>
            <td className="clg-label">Feedback Link shared by</td>
            <td className="clg-value">{values.feedbackLink || "—"}</td>
          </tr>

          <tr>
            <td className="clg-label">Number of Students Present</td>
            <td className="clg-value">{values.studentsPresent || "—"}</td>
          </tr>

          <tr>
            <td className="clg-label">Enclosed with Report</td>
            <td className="clg-value">
              {enclosedItems.length > 0
                ? enclosedItems.map((line, i) => <p key={i}>{line}</p>)
                : <p>—</p>}
            </td>
          </tr>

        </tbody>
      </table>


      <div className="clg-signature-block">
        <div className="clg-signature-line" />
        <div className="clg-signature-label">
          Signature of Faculty Coordinators
        </div>
      </div>

    </div>
  );
}