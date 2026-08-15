// src/components/SheetParts.jsx

import kleLogo from "../assets/kle-centenary-logo.jpg";

import {
  COLLEGE_LETTERHEAD as L,
  formatEventDate,
  formatNoticeDate,
} from "../constants/noticeTemplate";

// =====================================================
// EDITABLE / EMPTY FIELD
// =====================================================

export function Slot({ value, placeholder }) {
  if (value) {
    return (
      <strong className="wf-slot">
        {value}
      </strong>
    );
  }

  return (
    <span className="wf-slot wf-slot--empty">
      {placeholder}
    </span>
  );
}

// =====================================================
// SIGNATURE SLOT
// =====================================================

export function SignatureSlot({ role, signature }) {
  return (
    <div className="wf-sig">

      <div className="wf-sig__ink">
        {signature ? (
          <img
            src={signature}
            alt={`${role} signature`}
          />
        ) : null}
      </div>

      <div className="wf-sig__line" />

      {!signature && (
        <span className="wf-sig__pending">
          Signature Pending
        </span>
      )}

      <span className="wf-sig__role">
        {role}
      </span>

    </div>
  );
}

// =====================================================
// COLLEGE LETTERHEAD
// =====================================================

export function SheetHead() {
  return (
    <>
      <header className="wf-sheet__head">

        <img
          className="wf-sheet__logo"
          src={kleLogo}
          alt="KLE Centenary emblem"
        />

        <div className="wf-sheet__titles">

          <p className="wf-sheet__society">
            {L.society}
          </p>

          <p className="wf-sheet__college">
            {L.name}
          </p>

          <p className="wf-sheet__autonomy">
            {L.autonomy}
          </p>

          <p className="wf-sheet__small">
            {L.affiliation}
          </p>

          <p className="wf-sheet__small">
            {L.approval}
          </p>

          <p className="wf-sheet__naac">
            {L.accreditation}
          </p>

          <p className="wf-sheet__naac">
            {L.address}
          </p>

        </div>

      </header>

      <hr className="wf-sheet__rule" />

      <p className="wf-sheet__dept">
        {L.department}
      </p>
    </>
  );
}

// =====================================================
// SIGNATURES
// =====================================================

export function SheetSignatures({ doc }) {
  return (
    <footer className="wf-sheet__signrow">

      <SignatureSlot
        role="Class Teacher"
        signature={doc?.authorSignature}
      />

      <SignatureSlot
        role="Coordinator"
        signature={doc?.coordinatorSignature}
      />

      <SignatureSlot
        role="Principal"
        signature={doc?.principalSignature}
      />

    </footer>
  );
}

// =====================================================
// DOCUMENT META
// =====================================================

// We are NOT using DOC_STATUS or formatStamp here.
// This keeps the Notice template independent from
// the document workflow system.

export function SheetMeta({ doc }) {
  if (!doc) {
    return null;
  }

  return (
    <div className="wf-sheet__meta wf-noprint">

      {doc.refId && (
        <span>
          Ref ID: {doc.refId}
        </span>
      )}

      {doc.authorName && (
        <span>
          {doc.authorName}
        </span>
      )}

      {doc.status && (
        <span>
          Status: {doc.status}
        </span>
      )}

    </div>
  );
}

// =====================================================
// DATE FORMATTERS
// =====================================================

export {
  formatEventDate,
  formatNoticeDate,
};