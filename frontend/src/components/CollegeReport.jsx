import { useRef } from "react";

function formatDate(date) {
  if (!date) return "";

  const parts = date.split("-");

  if (parts.length !== 3) return date;

  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function formatLongDate(date) {
  if (!date) return "";

  const parts = date.split("-");

  if (parts.length !== 3) return "";

  const day = Number(parts[2]);
  const year = parts[0];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[Number(parts[1]) - 1];

  let suffix = "th";

  if (day % 10 === 1 && day !== 11) {
    suffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
    suffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    suffix = "rd";
  }

  return `${day}${suffix} ${month} ${year}`;
}

export default function CollegeReport({
  report,
  photos,
  setPhotos,
}) {
  const galleryInputRef = useRef(null);

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files || []);

    const newPhotos = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setPhotos((previous) => [
      ...previous,
      ...newPhotos,
    ]);

    event.target.value = "";
  };

  const removePhoto = (id) => {
    setPhotos((previous) =>
      previous.filter((photo) => photo.id !== id)
    );
  };

  return (
    <div
      className="report-preview-wrapper"
      style={{
        fontFamily: '"Times New Roman", Times, serif',
        color: "#000",
      }}
    >

      {/* =====================================================
          PAGE 1
      ===================================================== */}

      <section className="report-page">

        {/* ================= COLLEGE HEADER ================= */}

        <header
  style={{
    position: "relative",
    width: "100%",
    height: "180px",
    boxSizing: "border-box",
    borderBottom: "1px solid #000",
    background: "#fff",
    overflow: "hidden",
    fontFamily: '"Times New Roman", Times, serif',
  }}
>

  {/* =====================================================
      COLLEGE LOGO
      LEFT SIDE OF PAGE
  ====================================================== */}

  <img
    src="/college-logo.png"
    alt="P C Jabin Science College Logo"
    style={{
      position: "absolute",
      left: "105px",
      top: "28px",
      width: "115px",
      height: "115px",
      objectFit: "contain",
      mixBlendMode: "multiply",
      zIndex: 2,
    }}
  />


  {/* =====================================================
      COLLEGE HEADER
      PERFECTLY CENTERED TO THE WHOLE PAGE
  ====================================================== */}

  <div
    style={{
      position: "absolute",
      left: "0",
      top: "18px",
      width: "100%",
      textAlign: "center",
      boxSizing: "border-box",
      zIndex: 1,
      pointerEvents: "none",
    }}
  >

    {/* KLE SOCIETY'S */}

    <div
      style={{
        fontSize: "15px",
        fontWeight: "bold",
        lineHeight: "18px",
        color: "#000",
        margin: 0,
      }}
    >
      KLE SOCIETY'S
    </div>


    {/* COLLEGE NAME */}

    <div
      style={{
        fontSize: "30px",
        fontWeight: "bold",
        lineHeight: "34px",
        color: "#ff7777",
        margin: 0,
        whiteSpace: "nowrap",
      }}
    >
      P. C. JABIN SCIENCE COLLEGE
    </div>


    {/* AUTONOMOUS */}

    <div
      style={{
        fontSize: "18px",
        fontWeight: "bold",
        lineHeight: "22px",
        color: "#4b9bd5",
        margin: 0,
      }}
    >
      AUTONOMOUS
    </div>


    {/* AFFILIATION */}

    <div
      style={{
        fontSize: "10px",
        fontWeight: "bold",
        lineHeight: "12px",
        color: "#4b9bd5",
        margin: 0,
      }}
    >
      AFFILIATED TO KARNATAK UNIVERSITY DHARWAD
    </div>


    {/* APPROVAL */}

    <div
      style={{
        fontSize: "10px",
        fontWeight: "bold",
        lineHeight: "12px",
        color: "#4b9bd5",
        margin: 0,
      }}
    >
      APPROVED BY UNIVERSITY GRANTS COMMISSION, NEW DELHI AND
    </div>


    <div
      style={{
        fontSize: "10px",
        fontWeight: "bold",
        lineHeight: "12px",
        color: "#4b9bd5",
        margin: 0,
      }}
    >
      GOVERNMENT OF KARNATAKA
    </div>


    {/* NAAC */}

    <div
      style={{
        fontSize: "16px",
        fontWeight: "bold",
        lineHeight: "20px",
        color: "#d79b9b",
        marginTop: "5px",
      }}
    >
      Accredited at ‘A<sup>++</sup>’ Grade with 3.54 CGPA by NAAC
    </div>


    {/* ADDRESS */}

    <div
      style={{
        fontSize: "16px",
        fontWeight: "bold",
        lineHeight: "20px",
        color: "#d79b9b",
        margin: 0,
      }}
    >
      VIDYANAGAR, HUBBALLI-580031
    </div>

  </div>

</header>

        {/* ================= BCA ================= */}

        <div className="report-bca">
          BACHELOR OF COMPUTER APPLICATION
        </div>


        {/* ================= REPORT TITLE ================= */}

        <div className="report-title">
          Program Report on “{report.eventName}” Seminar
        </div>


        {/* ================= DATE ================= */}

        <div className="report-on-date">
          On {formatLongDate(report.eventDate)}
        </div>


        {/* =====================================================
            MAIN REPORT TABLE
        ===================================================== */}

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #000",
            marginTop: "20px",
            tableLayout: "fixed",
            fontSize: "12pt",
          }}
        >

          <tbody>

            {/* =================================================
                ORGANISER
            ================================================= */}

            <tr>

              <td
                style={{
                  width: "32%",
                  border: "1px solid #000",
                  padding: "9px 10px",
                  fontWeight: "bold",
                  verticalAlign: "top",
                }}
              >
                Name of the Organiser
              </td>

              <td
                style={{
                  width: "68%",
                  border: "1px solid #000",
                  padding: "9px 10px",
                  verticalAlign: "top",
                }}
              >
                {report.organiser}
              </td>

            </tr>


            {/* =================================================
                EVENT NAME
            ================================================= */}

            <tr>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "9px 10px",
                  fontWeight: "bold",
                  verticalAlign: "top",
                }}
              >
                Name of the Event organised
              </td>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "9px 10px",
                  verticalAlign: "top",
                }}
              >
                {report.eventName}
              </td>

            </tr>


            {/* =================================================
                DATE
            ================================================= */}

            <tr>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "9px 10px",
                  fontWeight: "bold",
                  verticalAlign: "top",
                }}
              >
                Date of the Event
              </td>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "9px 10px",
                  verticalAlign: "top",
                }}
              >
                {formatDate(report.eventDate)}
              </td>

            </tr>


            {/* =================================================
                PARTICIPANTS
            ================================================= */}

            <tr>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "9px 10px",
                  fontWeight: "bold",
                  verticalAlign: "top",
                }}
              >
                Participants
              </td>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "9px 10px",
                  verticalAlign: "top",
                }}
              >
                {report.participants}
              </td>

            </tr>


            {/* =================================================
                RESOURCE PERSON
            ================================================= */}

            <tr>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "9px 10px",
                  fontWeight: "bold",
                  verticalAlign: "top",
                  lineHeight: "1.4",
                }}
              >
                Name of the Resource person with
                <br />
                affiliation
              </td>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "9px 10px",
                  verticalAlign: "top",
                  lineHeight: "1.4",
                }}
              >
                {report.resourcePerson}
              </td>

            </tr>


            {/* =================================================
                OBJECTIVE
            ================================================= */}

            <tr>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "9px 10px",
                  fontWeight: "bold",
                  verticalAlign: "top",
                }}
              >
                Objective of the Event
              </td>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "9px 10px",
                  verticalAlign: "top",
                  textAlign: "justify",
                  lineHeight: "1.5",
                  whiteSpace: "pre-line",
                }}
              >
                {report.objective}
              </td>

            </tr>


            {/* =================================================
                OUTCOME
            ================================================= */}

            <tr>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "9px 10px",
                  fontWeight: "bold",
                  verticalAlign: "top",
                }}
              >
                Outcome of the Event
              </td>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "9px 10px",
                  verticalAlign: "top",
                  textAlign: "justify",
                  lineHeight: "1.5",
                  whiteSpace: "pre-line",
                }}
              >
                {report.outcome}
              </td>

            </tr>


            {/* =================================================
                EVENT DESCRIPTION
                FULL WIDTH
                NO TITLE
            ================================================= */}

            <tr>

              <td
                colSpan="2"
                style={{
                  border: "1px solid #000",
                  padding: "10px",
                  verticalAlign: "top",
                  textAlign: "justify",
                  lineHeight: "1.55",
                  whiteSpace: "pre-line",
                  fontSize: "12pt",
                }}
              >
                {report.description}
              </td>

            </tr>

          </tbody>

        </table>

      </section>


      {/* =====================================================
          PAGE 2
      ===================================================== */}

      <section className="report-page report-page-two">

        {/* ================= COLLEGE HEADER ================= */}
        <header
  style={{
    position: "relative",
    width: "100%",
    height: "180px",
    boxSizing: "border-box",
    borderBottom: "1px solid #000",
    background: "#fff",
    overflow: "hidden",
    fontFamily: '"Times New Roman", Times, serif',
  }}
>

  {/* =====================================================
      COLLEGE LOGO
      LEFT SIDE OF PAGE
  ====================================================== */}

  <img
    src="/college-logo.png"
    alt="P C Jabin Science College Logo"
    style={{
      position: "absolute",
      left: "105px",
      top: "28px",
      width: "115px",
      height: "115px",
      objectFit: "contain",
      mixBlendMode: "multiply",
      zIndex: 2,
    }}
  />


  {/* =====================================================
      COLLEGE HEADER
      PERFECTLY CENTERED TO THE WHOLE PAGE
  ====================================================== */}

  <div
    style={{
      position: "absolute",
      left: "0",
      top: "18px",
      width: "100%",
      textAlign: "center",
      boxSizing: "border-box",
      zIndex: 1,
      pointerEvents: "none",
    }}
  >

    {/* KLE SOCIETY'S */}

    <div
      style={{
        fontSize: "15px",
        fontWeight: "bold",
        lineHeight: "18px",
        color: "#000",
        margin: 0,
      }}
    >
      KLE SOCIETY'S
    </div>


    {/* COLLEGE NAME */}

    <div
      style={{
        fontSize: "30px",
        fontWeight: "bold",
        lineHeight: "34px",
        color: "#ff7777",
        margin: 0,
        whiteSpace: "nowrap",
      }}
    >
      P. C. JABIN SCIENCE COLLEGE
    </div>


    {/* AUTONOMOUS */}

    <div
      style={{
        fontSize: "18px",
        fontWeight: "bold",
        lineHeight: "22px",
        color: "#4b9bd5",
        margin: 0,
      }}
    >
      AUTONOMOUS
    </div>


    {/* AFFILIATION */}

    <div
      style={{
        fontSize: "10px",
        fontWeight: "bold",
        lineHeight: "12px",
        color: "#4b9bd5",
        margin: 0,
      }}
    >
      AFFILIATED TO KARNATAK UNIVERSITY DHARWAD
    </div>


    {/* APPROVAL */}

    <div
      style={{
        fontSize: "10px",
        fontWeight: "bold",
        lineHeight: "12px",
        color: "#4b9bd5",
        margin: 0,
      }}
    >
      APPROVED BY UNIVERSITY GRANTS COMMISSION, NEW DELHI AND
    </div>


    <div
      style={{
        fontSize: "10px",
        fontWeight: "bold",
        lineHeight: "12px",
        color: "#4b9bd5",
        margin: 0,
      }}
    >
      GOVERNMENT OF KARNATAKA
    </div>


    {/* NAAC */}

    <div
      style={{
        fontSize: "16px",
        fontWeight: "bold",
        lineHeight: "20px",
        color: "#d79b9b",
        marginTop: "5px",
      }}
    >
      Accredited at ‘A<sup>++</sup>’ Grade with 3.54 CGPA by NAAC
    </div>


    {/* ADDRESS */}

    <div
      style={{
        fontSize: "16px",
        fontWeight: "bold",
        lineHeight: "20px",
        color: "#d79b9b",
        margin: 0,
      }}
    >
      VIDYANAGAR, HUBBALLI-580031
    </div>

  </div>

</header>


        {/* =====================================================
            CONTINUATION TABLE
        ===================================================== */}

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #000",
            tableLayout: "fixed",
            fontSize: "12pt",
          }}
        >

          <tbody>

            {/* =================================================
                CONTINUED EVENT DESCRIPTION
                FULL WIDTH - NO TITLE
            ================================================= */}

            <tr>

              <td
                colSpan="2"
                style={{
                  border: "1px solid #000",
                  padding: "10px",
                  verticalAlign: "top",
                  textAlign: "justify",
                  lineHeight: "1.55",
                  whiteSpace: "pre-line",
                }}
              >
                {report.description2}
              </td>

            </tr>


            {/* =================================================
                VOTE OF THANKS
                FULL WIDTH
            ================================================= */}

            <tr>

              <td
                colSpan="2"
                style={{
                  border: "1px solid #000",
                  padding: "10px",
                  verticalAlign: "top",
                  textAlign: "justify",
                  lineHeight: "1.55",
                  whiteSpace: "pre-line",
                }}
              >
                {report.voteOfThanks}
              </td>

            </tr>


            {/* =================================================
                PHOTO GALLERY TITLE
            ================================================= */}

            <tr>

              <td
                colSpan="2"
                style={{
                  border: "1px solid #000",
                  padding: "5px 10px",
                  fontWeight: "bold",
                  textAlign: "left",
                  fontSize: "12pt",
                }}
              >
                Photo Gallery
              </td>

            </tr>


            {/* =================================================
                PHOTO GALLERY
            ================================================= */}

            <tr>

              <td
                colSpan="2"
                style={{
                  border: "1px solid #000",
                  padding: "10px",
                }}
              >

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    width: "100%",
                  }}
                >

                  {photos.map((photo) => (

                    <div
                      key={photo.id}
                      style={{
                        position: "relative",
                        width: "100%",
                      }}
                    >

                      <img
                        src={photo.url}
                        alt={photo.name}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          objectFit: "contain",
                        }}
                      />


                      <button
                        type="button"
                        onClick={() =>
                          removePhoto(photo.id)
                        }
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          border: "none",
                          borderRadius: "50%",
                          width: "25px",
                          height: "25px",
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                      >
                        ×
                      </button>

                    </div>

                  ))}


                  {/* =================================================
                      UPLOAD PHOTO BUTTON
                  ================================================= */}

                  <button
                    type="button"
                    onClick={() =>
                      galleryInputRef.current?.click()
                    }
                    style={{
                      minHeight: "150px",
                      border: "1px dashed #777",
                      background: "transparent",
                      cursor: "pointer",
                      fontFamily:
                        '"Times New Roman", Times, serif',
                      fontSize: "14px",
                    }}
                  >

                    <div
                      style={{
                        fontSize: "35px",
                        marginBottom: "5px",
                      }}
                    >
                      +
                    </div>

                    <div>
                      Upload Photo
                    </div>

                  </button>

                </div>

              </td>

            </tr>

          </tbody>

        </table>


        {/* =====================================================
            FILE INPUT
        ===================================================== */}

        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          ref={galleryInputRef}
          onChange={handlePhotoUpload}
        />

      </section>

    </div>
  );
}