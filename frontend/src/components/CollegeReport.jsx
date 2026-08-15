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

  if (parts.length !== 3) return date;

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

  if (day % 10 === 1 && day !== 11) suffix = "st";
  else if (day % 10 === 2 && day !== 12) suffix = "nd";
  else if (day % 10 === 3 && day !== 13) suffix = "rd";

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

    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (id) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  return (
    <div className="report-preview-wrapper">

      {/* =====================================================
          PAGE 1
      ===================================================== */}

      <section className="report-page" id="report-document">

        {/* HEADER */}

        <header className="report-college-header">

          <div className="report-header-left">

            <div>Estd. : 1957</div>

            <div>Phone : 0836-2372285</div>

            <div>Principal : 0836- 2376943</div>

            <div>e-mail : jabincollege@gmail.com</div>

            <div>website : www.jabincollege.com</div>

          </div>


          <div className="report-header-main">

            <p className="report-society">
              KLE SOCIETY’S
            </p>

            <p className="report-college-name">
              P. C. JABIN SCIENCE COLLEGE
            </p>

            <p className="report-autonomous">
              AUTONOMOUS
            </p>

            <p className="report-affiliation">
              AFFILIATED TO KARNATAK UNIVERSITY DHARWAD
            </p>

            <p className="report-approval">
              APPROVED BY UNIVERSITY GRANTS COMMISSION, NEW DELHI AND
              <br />
              GOVERNMENT OF KARNATAKA
            </p>

            <p className="report-naac">
              Accredited at ‘A++’ Grade with 3.54 CGPA by NAAC
            </p>

            <p className="report-address">
              VIDYANAGAR, HUBBALLI-580031
            </p>

          </div>

        </header>


        {/* BCA */}

        <div className="report-bca">
          BACHELOR OF COMPUTER APPLICATION
        </div>


        {/* TITLE */}

        <div className="report-title">
          Program Report on “
          <span>{report.eventName}</span>
          ” Seminar
        </div>


        {/* DATE */}

        <div className="report-on-date">
          On {formatLongDate(report.eventDate)}
        </div>


        {/* BASIC INFORMATION */}

        <div className="report-information">

          <div className="report-row">

            <div className="report-label">
              Name of the Organiser
            </div>

            <div className="report-value">
              {report.organiser}
            </div>

          </div>


          <div className="report-row">

            <div className="report-label">
              Name of the Event organised
            </div>

            <div className="report-value">
              {report.eventName}
            </div>

          </div>


          <div className="report-row">

            <div className="report-label">
              Date of the Event
            </div>

            <div className="report-value">
              {formatDate(report.eventDate)}
            </div>

          </div>


          <div className="report-row">

            <div className="report-label">
              Participants
            </div>

            <div className="report-value">
              {report.participants}
            </div>

          </div>


          <div className="report-row resource-row">

            <div className="report-label">
              Name of the Resource person with
              <br />
              affiliation
            </div>

            <div className="report-value">
              {report.resourcePerson}
            </div>

          </div>

        </div>


        {/* OBJECTIVE */}

        <div className="report-content-row">

          <div className="report-content-label">
            Objective of the Event
          </div>

          <div className="report-content-text">
            {report.objective}
          </div>

        </div>


        {/* OUTCOME */}

        <div className="report-content-row">

          <div className="report-content-label">
            Outcome of the Event
          </div>

          <div className="report-content-text">
            {report.outcome}
          </div>

        </div>


        {/* CONTINUATION */}

        <p className="report-paragraph">
          {report.description}
        </p>

      </section>


      {/* =====================================================
          PAGE 2
      ===================================================== */}

      <section className="report-page report-page-two">

        {/* HEADER */}

        <header className="report-college-header report-page-header">

          <div className="report-header-left">

            <div>Estd. : 1957</div>

            <div>Phone : 0836-2372285</div>

            <div>Principal : 0836- 2376943</div>

            <div>e-mail : jabincollege@gmail.com</div>

            <div>website : www.jabincollege.com</div>

          </div>


          <div className="report-header-main">

            <p className="report-society">
              KLE SOCIETY’S
            </p>

            <p className="report-college-name">
              P. C. JABIN SCIENCE COLLEGE
            </p>

            <p className="report-autonomous">
              AUTONOMOUS
            </p>

            <p className="report-affiliation">
              AFFILIATED TO KARNATAK UNIVERSITY DHARWAD
            </p>

            <p className="report-approval">
              APPROVED BY UNIVERSITY GRANTS COMMISSION, NEW DELHI AND
              <br />
              GOVERNMENT OF KARNATAKA
            </p>

            <p className="report-naac">
              Accredited at ‘A++’ Grade with 3.54 CGPA by NAAC
            </p>

            <p className="report-address">
              VIDYANAGAR, HUBBALLI-580031
            </p>

          </div>

        </header>


        <p className="report-continuation">
          {report.description2}
        </p>


        <p className="report-vote">
          {report.voteOfThanks}
        </p>


        {/* PHOTO GALLERY */}

        <div className="photo-gallery-title">
          Photo Gallery
        </div>


        <div className="photo-gallery">

          {photos.map((photo) => (

            <div
              className="gallery-photo"
              key={photo.id}
            >

              <img
                src={photo.url}
                alt={photo.name}
              />

              <button
                type="button"
                onClick={() => removePhoto(photo.id)}
                className="remove-photo"
              >
                ×
              </button>

            </div>

          ))}


          <button
            type="button"
            className="add-photo-box"
            onClick={() => galleryInputRef.current?.click()}
          >
            <span>+</span>
            <small>Add Photo</small>
          </button>

        </div>


        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handlePhotoUpload}
        />

      </section>

    </div>
  );
}