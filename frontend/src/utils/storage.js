


// Storage utility for Notice and Report documents

const STORAGE_KEY = "kle_workflow_documents";

const INITIAL_DOCUMENTS = [
  {
    id: "doc-1",
    title: "Monthly Attendance Report - Aug 2024",
    type: "Report",
    status: "PENDING",
    submittedAt: "Submitted 2 hours ago",
    date: "13-08-2026",
    author: "Arpita Horatti",
    details: "Monthly attendance report for BCA II & IV Semesters."
  },
  {
    id: "doc-2",
    title: "Notice: Internal Examination Schedule",
    type: "Notice",
    status: "APPROVED",
    submittedAt: "Approved yesterday",
    date: "12-08-2026",
    author: "Arpita Horatti",
    details: "First Internal Assessment Test schedule for all BCA divisions."
  },
  {
    id: "doc-3",
    title: "Notice: Cloud Computing Seminar",
    type: "Notice",
    status: "APPROVED",
    submittedAt: "Approved 3 days ago",
    date: "10-08-2026",
    author: "Arpita Horatti",
    details: "Special technical seminar on Cloud Infrastructure & DevOps."
  },
  {
    id: "doc-4",
    title: "Notice: Guest Lecture on Cyber Security",
    type: "Notice",
    status: "REJECTED",
    submittedAt: "Rejected 4 days ago",
    date: "09-08-2026",
    author: "Arpita Horatti",
    details: "Guest lecture for final year students."
  },
  {
    id: "doc-5",
    title: "Lab Practical Marks Report",
    type: "Report",
    status: "PENDING",
    submittedAt: "Submitted 1 day ago",
    date: "11-08-2026",
    author: "Arpita Horatti",
    details: "Python & Data Structures lab examination scores."
  }
];

export function getDocuments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DOCUMENTS));
      return INITIAL_DOCUMENTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading documents from storage", e);
    return INITIAL_DOCUMENTS;
  }
}

export function saveDocument(newDoc) {
  try {
    const docs = getDocuments();
    const existingIndex = docs.findIndex(d => d.id === newDoc.id);
    let updatedDocs;
    if (existingIndex >= 0) {
      updatedDocs = [...docs];
      updatedDocs[existingIndex] = { ...updatedDocs[existingIndex], ...newDoc };
    } else {
      updatedDocs = [
        {
          id: `doc-${Date.now()}`,
          status: "PENDING",
          submittedAt: "Just now",
          author: newDoc.author || "Arpita Horatti",
          ...newDoc,
        },
        ...docs,
      ];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDocs));
    return updatedDocs;
  } catch (e) {
    console.error("Error saving document to storage", e);
    return [];
  }
}

export function deleteDocument(id) {
  try {
    const docs = getDocuments();
    const updated = docs.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Error deleting document", e);
    return [];
  }
}
