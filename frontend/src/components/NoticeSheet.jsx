import "./NoticeSheet.css";
import {
  SheetHead,
  SheetSignatures,
  Slot,
  formatNoticeDate,
  formatEventDate,
} from "./SheetParts";

export default function NoticeSheet({
  values,
  kind = "activity",
  doc = null,
}) {
  const noun =
    kind === "movie"
      ? "movie screening"
      : "activity";

  return (
    <div className="notice-sheet-wrapper">

      <article className="wf-sheet">

        {/* College Letter Head */}
        <SheetHead />

        {/* Notice Title */}
        <h2 className="wf-title">
          NOTICE
        </h2>

        {/* Date */}
        <div className="wf-date-row">
          <span>Date :</span>

          <Slot
            value={formatNoticeDate(values.noticeDate)}
            placeholder="dd-mm-yyyy"
          />
        </div>

        {/* Body */}

        <div className="wf-body">

          <p>

            All the students of

            <Slot
              value={values.className}
              placeholder="BCA I Year"
            />

            <Slot
              value={values.division}
              placeholder="A-4"
            />

            division are hereby informed to attend the

            <strong>
              {" "}
              {noun}{" "}
            </strong>

            <Slot
              value={values.activityName}
              placeholder="Activity Name"
            />

            at

            <Slot
              value={values.time}
              placeholder="3.15 PM - 5.15 PM"
            />

            dated

            <Slot
              value={formatEventDate(values.eventDate)}
              placeholder="19 Sep 2024"
            />

            on

            <Slot
              value={values.day}
              placeholder="Thursday"
            />

            which is conducted in

            <Slot
              value={values.classroom}
              placeholder="ANDROID"
            />

            classroom.

          </p>

        </div>

        {/* Note */}

        <div className="wf-note">

          <strong>Note :</strong>

          <Slot
            value={values.note}
            placeholder="Attendance should be maintained compulsory."
          />

        </div>

        {/* Signatures */}

        <SheetSignatures
          doc={doc}
        />

      </article>

    </div>
  );
}