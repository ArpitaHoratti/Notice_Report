// src/constants/documents.js

export const COLLEGE_NAME =
  "KLE BCA PC Jabin Science College";

export const APP_NAME =
  "Workflow";

export const TAGLINE =
  "Create and Manage Activity & Movie Screening Documents Professionally.";


// =====================================================
// DOCUMENT CATEGORIES
// =====================================================

export const DOC_CATEGORIES = [
  {
    id: "activity",

    label: "Activity",

    description:
      "Departmental events, workshops, guest lectures and student activities.",

    types: [
      {
        id: "activity-report",

        label: "Activity Report",

        blurb:
          "Post-event official report with objectives, summary, photos and conclusion.",
      },

      {
        id: "activity-notice",

        label: "Activity Notice",

        blurb:
          "Pre-event circular announcing the activity to students and staff.",
      },
    ],
  },

  {
    id: "movie-screening",

    label: "Movie Screening",

    description:
      "Film screening sessions organised for academic and cultural learning.",

    types: [
      {
        id: "movie-report",

        label: "Screening Report",

        blurb:
          "Report of the screening with takeaways, photos and conclusion.",
      },

      {
        id: "movie-notice",

        label: "Screening Notice",

        blurb:
          "Notice announcing the movie, venue, timing and participating classes.",
      },
    ],
  },
];


// =====================================================
// DOCUMENT STATUS
// =====================================================

export const DOC_STATUS = {
  DRAFT: "Draft",

  SAVED: "Saved",

  PENDING_COORDINATOR:
    "Pending Coordinator Approval",

  COORDINATOR_APPROVED:
    "Coordinator Approved",

  PENDING_PRINCIPAL:
    "Pending Principal Approval",

  PRINCIPAL_APPROVED:
    "Principal Approved",

  COMPLETED:
    "Completed",

  REJECTED:
    "Rejected",
};


// =====================================================
// STATUS FLOW
// =====================================================

export const STATUS_FLOW = [
  DOC_STATUS.DRAFT,

  DOC_STATUS.SAVED,

  DOC_STATUS.PENDING_COORDINATOR,

  DOC_STATUS.COORDINATOR_APPROVED,

  DOC_STATUS.PENDING_PRINCIPAL,

  DOC_STATUS.PRINCIPAL_APPROVED,

  DOC_STATUS.COMPLETED,
];


// =====================================================
// CSS CLASS FOR EACH STATUS
// =====================================================

export const STATUS_CLASS = {
  [DOC_STATUS.DRAFT]:
    "wf-status--draft",

  [DOC_STATUS.SAVED]:
    "wf-status--draft",

  [DOC_STATUS.PENDING_COORDINATOR]:
    "wf-status--pending",

  [DOC_STATUS.COORDINATOR_APPROVED]:
    "wf-status--approved",

  [DOC_STATUS.PENDING_PRINCIPAL]:
    "wf-status--principal",

  [DOC_STATUS.PRINCIPAL_APPROVED]:
    "wf-status--approved",

  [DOC_STATUS.COMPLETED]:
    "wf-status--completed",

  [DOC_STATUS.REJECTED]:
    "wf-status--rejected",
};


// =====================================================
// STATUSES WHERE TEACHER CAN EDIT
// =====================================================

export const EDITABLE_STATUSES = [
  DOC_STATUS.DRAFT,

  DOC_STATUS.SAVED,

  DOC_STATUS.REJECTED,
];


// =====================================================
// CHECK WHETHER DOCUMENT CAN BE EDITED
// =====================================================

export function isEditable(status) {
  return EDITABLE_STATUSES.includes(status);
}


// =====================================================
// FIND DOCUMENT TYPE
// =====================================================

export function findDocType(typeId) {
  for (const category of DOC_CATEGORIES) {
    const type = category.types.find(
      (item) => item.id === typeId
    );

    if (type) {
      return {
        ...type,
        category,
      };
    }
  }

  return null;
}


// =====================================================
// CHECK WHETHER DOCUMENT IS A REPORT
// =====================================================

export function isReport(typeId = "") {
  return typeId.includes("report");
}