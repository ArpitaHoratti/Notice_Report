// src/constants/noticeTemplate.js

/**
 * Official KLE Society's P. C. Jabin Science College
 * NOTICE template.
 *
 * The letterhead and sentence structure are fixed.
 * Only the defined fields are editable.
 */

// =====================================================
// COLLEGE LETTERHEAD
// =====================================================

export const COLLEGE_LETTERHEAD = {
  society: "KLE SOCIETY’S",

  name: "P. C. JABIN SCIENCE COLLEGE,",

  autonomy: "AUTONOMOUS, CPE PHASE -III",

  affiliation:
    "AFFILIATED TO KARNATAK UNIVERSITY DHARWAD",

  approval:
    "APPROVED BY UNIVERSITY GRANTS COMMISSION, NEW DELHI AND GOVERNMENT OF KARNATAKA",

  accreditation:
    "Accredited at ‘A++’ Grade by NAAC",

  address:
    "VIDYANAGAR, HUBBALLI-580031",

  department:
    "Department of BCA",
};


// =====================================================
// NOTICE FIELDS
// =====================================================

export const NOTICE_FIELDS = [
  {
    name: "noticeDate",
    label: "Notice Date",
    type: "date",
    required: true,
  },

  {
    name: "className",
    label: "Class",
    type: "text",
    placeholder: "BCA 1st year",
    required: true,
  },

  {
    name: "division",
    label: "Division",
    type: "text",
    placeholder: "A-4",
    required: true,
  },

  {
    name: "activityName",
    label: "Activity Name",
    type: "text",
    placeholder: "MATRIX",
    required: true,
  },

  {
    name: "time",
    label: "Time",
    type: "text",
    placeholder: "3:15-5:15",
    required: true,
  },

  {
    name: "eventDate",
    label: "Activity Date",
    type: "date",
    required: true,
  },

  {
    name: "day",
    label: "Day",
    type: "text",
    placeholder: "Thursday",
    required: true,
  },

  {
    name: "classroom",
    label: "Class Room",
    type: "text",
    placeholder: "ANDROID",
    required: true,
  },

  {
    name: "note",
    label: "Note",
    type: "textarea",
    placeholder:
      "Attendance should be maintained compulsory.",
  },
];


// =====================================================
// MOVIE NOTICE FIELDS
// =====================================================

export const MOVIE_NOTICE_FIELDS = NOTICE_FIELDS.map(
  (field) =>
    field.name === "activityName"
      ? {
          ...field,
          label: "Movie Name",
          placeholder:
            "The Pursuit of Happyness",
        }
      : field
);


// =====================================================
// DEFAULT VALUES
// =====================================================

export const NOTICE_DEFAULTS = {
  noticeDate: "",

  className: "",

  division: "",

  activityName: "",

  time: "",

  eventDate: "",

  day: "",

  classroom: "",

  note:
    "Attendance should be maintained compulsory.",
};


// =====================================================
// HELPER
// Convert any date value to YYYY-MM-DD
// =====================================================

function toDateString(value) {
  if (!value) {
    return "";
  }

  // Already a string
  if (typeof value === "string") {
    return value;
  }

  // JavaScript Date object
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      return "";
    }

    const year = value.getFullYear();

    const month = String(
      value.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      value.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // Some date libraries / objects
  // may provide a toISOString method.
  if (
    typeof value.toISOString === "function"
  ) {
    try {
      return value.toISOString().slice(0, 10);
    } catch {
      return "";
    }
  }

  return "";
}


// =====================================================
// NOTICE DATE
// YYYY-MM-DD → DD-MM-YYYY
// =====================================================

export function formatNoticeDate(value) {
  const dateString = toDateString(value);

  if (!dateString) {
    return "";
  }

  const parts = dateString.split("-");

  if (parts.length !== 3) {
    return dateString;
  }

  const [year, month, day] = parts;

  if (!year || !month || !day) {
    return dateString;
  }

  return `${day}-${month}-${year}`;
}


// =====================================================
// EVENT DATE
// YYYY-MM-DD → 19 Sep 2024
// =====================================================

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];


export function formatEventDate(value) {
  const dateString = toDateString(value);

  if (!dateString) {
    return "";
  }

  const parts = dateString.split("-");

  if (parts.length !== 3) {
    return dateString;
  }

  const [year, month, day] = parts;

  if (!year || !month || !day) {
    return dateString;
  }

  const monthIndex = Number(month) - 1;

  const monthName =
    MONTHS[monthIndex] || month;

  return `${Number(day)} ${monthName} ${year}`;
}


// =====================================================
// GET DAY FROM DATE
// =====================================================

export function dayFromDate(value) {
  if (!value) {
    return "";
  }

  const dateString = toDateString(value);

  if (!dateString) {
    return "";
  }

  const date = new Date(
    `${dateString}T00:00:00`
  );

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
    }
  );
}