import kleLogo from "../assets/kle-centenary-logo.jpg";

export default function CollegeReport({ report, photos }) {

  return (
    <div className="college-report-document">

      {/* =====================================================
          PAGE 1
      ===================================================== */}

      <section className="report-a4-page">

        <ReportHeader />

        {/* PROGRAM TITLE */}

        <div className="report-program-title">
          {report.program}
        </div>

        <div className="report-main-title">
          {report.reportTitle}
        </div>

        <div className="report-event-date">
          On {report.eventDate}
        </div>

        {/* MAIN INFORMATION TABLE */}

        <table className="report-information-table">

          <tbody>

            <tr>
              <td>Name of the Organiser</td>
              <td>{report.organiser}</td>
            </tr>

            <tr>
              <td>Name of the Event organised</td>
              <td>{report.eventName}</td>
            </tr>

            <tr>
              <td>Date of the Event</td>
              <td>{report.dateOfEvent}</td>
            </tr>

            <tr>
              <td>Participants</td>
              <td>{report.participants}</td>
            </tr>

            <tr>
              <td>
                Name of the Resource person with affiliation
              </td>

              <td>
                {report.resourcePerson}
              </td>
            </tr>

            <tr className="large-report-row">

              <td>
                Objective of the Event
              </td>

              <td className="report-body-cell">
                {report.objective}
              </td>

            </tr>

            <tr className="large-report-row">

              <td>
                Outcome of the Event
              </td>

              <td className="report-body-cell">
                {report.outcome}
              </td>

            </tr>

            <tr>

              <td
                colSpan="2"
                className="report-description-cell"
              >

                <p>
                  {report.eventDescription
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <span key={index}>
                        {paragraph}

                        {index <
                          report.eventDescription.split("\n\n")
                            .length - 1 && (
                          <>
                            <br />
                            <br />
                          </>
                        )}
                      </span>
                    ))}
                </p>

                <p className="vote-of-thanks">
                  {report.voteOfThanks}
                </p>

              </td>

            </tr>

          </tbody>

        </table>

      </section>

      {/* =====================================================
          PAGE 2
      ===================================================== */}

      <section className="report-a4-page report-page-two">

        <ReportHeader />

        <div className="report-page-two-content">

          {/* CONTINUATION */}

          <div className="report-continuation">

            <p>
              {getContinuationText(report.eventDescription)}
            </p>

            <p className="continuation-vote">
              {report.voteOfThanks}
            </p>

          </div>

          {/* PHOTO GALLERY */}

          <div className="photo-gallery-title">
            Photo Gallery
          </div>

          <div className="photo-gallery">

            {[0, 1, 2, 3].map((index) => (

              <div
                className="photo-gallery-cell"
                key={index}
              >

                {photos[index] ? (

                  <img
                    src={photos[index].src}
                    alt={`Report photo ${index + 1}`}
                  />

                ) : (

                  <div className="photo-empty">
                    Photo {index + 1}
                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>
  );
}


/* =========================================================
   COLLEGE HEADER
========================================================= */

function ReportHeader() {

  return (
    <div className="college-report-header">

      <div className="college-header-logo">

        <img
          src={kleLogo}
          alt="KLE Society Emblem"
        />

      </div>

      <div className="college-header-center">

        <div className="society-name">
          KLE SOCIETY’S
        </div>

        <div className="college-name">
          P. C. JABIN SCIENCE COLLEGE
        </div>

        <div className="autonomous">
          AUTONOMOUS
        </div>

        <div className="affiliation">
          AFFILIATED TO KARNATAK UNIVERSITY DHARWAD
        </div>

        <div className="approval">
          APPROVED BY UNIVERSITY GRANTS COMMISSION, NEW DELHI AND
          <br />
          GOVERNMENT OF KARNATAKA
        </div>

        <div className="naac">
          Accredited at ‘A++’ Grade with 3.54 CGPA by NAAC
        </div>

        <div className="address">
          VIDYANAGAR, HUBBALLI-580031
        </div>

      </div>

      <div className="college-contact">

        <div>
          <span>Estd.</span>
          <b>: 1957</b>
        </div>

        <div>
          <span>Phone</span>
          <b>: 0836-2372285</b>
        </div>

        <div>
          <span>Principal</span>
          <b>: 0836-2376943</b>
        </div>

        <div>
          <span>e-mail</span>
          <b>: jabincollege@gmail.com</b>
        </div>

        <div>
          <span>website</span>
          <b>: www.jabincollege.com</b>
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   CONTINUATION TEXT
========================================================= */

function getContinuationText(text) {

  const paragraphs = text.split("\n\n");

  if (paragraphs.length <= 1) {
    return "";
  }

  return paragraphs[paragraphs.length - 1];
}