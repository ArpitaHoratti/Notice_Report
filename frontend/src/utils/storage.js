// =========================================================
// STORAGE UTILITY
// Teacher → Coordinator → Principal → Approved
// =========================================================

const STORAGE_KEY = "kle_workflow_documents";

// =========================================================
// INITIAL DOCUMENTS
// =========================================================

const INITIAL_DOCUMENTS = [
  {
    id: "doc-1",
    title: "Monthly Attendance Report - Aug 2024",
    type: "Report",

    // Document is waiting for Coordinator
    status: "PENDING",
    currentApprover: "COORDINATOR",

    submittedAt: "Submitted 2 hours ago",
    date: "13-08-2026",

    author: "Arpita Horatti",

    details:
      "Monthly attendance report for BCA II & IV Semesters.",
  },

  {
    id: "doc-2",
    title: "Notice: Internal Examination Schedule",
    type: "Notice",

    status: "APPROVED",
    currentApprover: null,

    coordinatorStatus: "APPROVED",
    principalStatus: "APPROVED",

    submittedAt: "Approved yesterday",
    date: "12-08-2026",

    author: "Arpita Horatti",

    details:
      "First Internal Assessment Test schedule for all BCA divisions.",
  },

  {
    id: "doc-3",
    title: "Notice: Cloud Computing Seminar",
    type: "Notice",

    status: "APPROVED",
    currentApprover: null,

    coordinatorStatus: "APPROVED",
    principalStatus: "APPROVED",

    submittedAt: "Approved 3 days ago",
    date: "10-08-2026",

    author: "Arpita Horatti",

    details:
      "Special technical seminar on Cloud Infrastructure & DevOps.",
  },

  {
    id: "doc-4",
    title: "Notice: Guest Lecture on Cyber Security",
    type: "Notice",

    status: "REJECTED",
    currentApprover: null,

    coordinatorStatus: "REJECTED",
    principalStatus: null,

    submittedAt: "Rejected 4 days ago",
    date: "09-08-2026",

    author: "Arpita Horatti",

    details:
      "Guest lecture for final year students.",
  },

  {
    id: "doc-5",
    title: "Lab Practical Marks Report",
    type: "Report",

    // Waiting for Coordinator
    status: "PENDING",
    currentApprover: "COORDINATOR",

    submittedAt: "Submitted 1 day ago",
    date: "11-08-2026",

    author: "Arpita Horatti",

    details:
      "Python & Data Structures lab examination scores.",
  },
];

// =========================================================
// GET ALL DOCUMENTS
// =========================================================

export function getDocuments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    // First time application is opened
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(INITIAL_DOCUMENTS)
      );

      return INITIAL_DOCUMENTS;
    }

    return JSON.parse(raw);
  } catch (error) {
    console.error(
      "Error reading documents from storage:",
      error
    );

    return INITIAL_DOCUMENTS;
  }
}

// =========================================================
// SAVE DOCUMENT
// =========================================================

export function saveDocument(newDoc) {
  try {
    const docs = getDocuments();

    const existingIndex = docs.findIndex(
      (doc) => doc.id === newDoc.id
    );

    let updatedDocs;

    // =====================================================
    // UPDATE EXISTING DOCUMENT
    // =====================================================

    if (existingIndex >= 0) {
      updatedDocs = [...docs];

      updatedDocs[existingIndex] = {
        ...updatedDocs[existingIndex],
        ...newDoc,
      };
    }

    // =====================================================
    // CREATE NEW DOCUMENT
    // =====================================================

    else {
      const newDocument = {
        id: `doc-${Date.now()}`,

        title: newDoc.title || "Untitled Document",

        type: newDoc.type || "Notice",

        status: "PENDING",

        // New documents always go to Coordinator first
        currentApprover: "COORDINATOR",

        coordinatorStatus: "PENDING",

        principalStatus: null,

        submittedAt: "Just now",

        author: newDoc.author || "Teacher",

        createdAt: new Date().toISOString(),

        ...newDoc,

        // Make sure workflow values cannot accidentally
        // be overwritten by values from the form
        status: "PENDING",
        currentApprover: "COORDINATOR",
      };

      updatedDocs = [
        newDocument,
        ...docs,
      ];
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedDocs)
    );

    return updatedDocs;
  } catch (error) {
    console.error(
      "Error saving document:",
      error
    );

    return [];
  }
}

// =========================================================
// DELETE DOCUMENT
// =========================================================

export function deleteDocument(id) {
  try {
    const docs = getDocuments();

    const updatedDocuments = docs.filter(
      (doc) => doc.id !== id
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedDocuments)
    );

    return updatedDocuments;
  } catch (error) {
    console.error(
      "Error deleting document:",
      error
    );

    return [];
  }
}

// =========================================================
// GET DOCUMENTS WAITING FOR COORDINATOR
// =========================================================

export function getCoordinatorDocuments() {
  try {
    const docs = getDocuments();

    return docs.filter(
      (doc) =>
        doc.currentApprover === "COORDINATOR" &&
        doc.status === "PENDING"
    );
  } catch (error) {
    console.error(
      "Error getting coordinator documents:",
      error
    );

    return [];
  }
}

// =========================================================
// GET DOCUMENTS WAITING FOR PRINCIPAL
// =========================================================

export function getPrincipalDocuments() {
  try {
    const docs = getDocuments();

    return docs.filter(
      (doc) =>
        doc.currentApprover === "PRINCIPAL" &&
        doc.status === "PENDING"
    );
  } catch (error) {
    console.error(
      "Error getting principal documents:",
      error
    );

    return [];
  }
}

// =========================================================
// COORDINATOR APPROVES DOCUMENT
// =========================================================
// Teacher
//    ↓
// Coordinator APPROVES
//    ↓
// Principal
// =========================================================

export function coordinatorApproveDocument(id) {
  try {
    const docs = getDocuments();

    const updatedDocuments = docs.map((doc) => {

      if (doc.id !== id) {
        return doc;
      }

      return {
        ...doc,

        // Still pending because Principal needs to approve
        status: "PENDING",

        // Move document to Principal
        currentApprover: "PRINCIPAL",

        // Coordinator has approved
        coordinatorStatus: "APPROVED",

        coordinatorApprovedAt:
          new Date().toISOString(),

        submittedAt:
          "Approved by Coordinator",

        // Clear any previous rejection information
        rejectionReason: null,
        rejectedBy: null,
        rejectedAt: null,
      };
    });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedDocuments)
    );

    return updatedDocuments;
  } catch (error) {
    console.error(
      "Error approving document by Coordinator:",
      error
    );

    return [];
  }
}

// =========================================================
// COORDINATOR REJECTS DOCUMENT
// =========================================================

export function coordinatorRejectDocument(
  id,
  rejectionReason = ""
) {
  try {
    const docs = getDocuments();

    const updatedDocuments = docs.map((doc) => {

      if (doc.id !== id) {
        return doc;
      }

      return {
        ...doc,

        // Workflow ends here
        status: "REJECTED",

        currentApprover: null,

        coordinatorStatus: "REJECTED",

        principalStatus: null,

        rejectionReason:
          rejectionReason ||
          "Rejected by Coordinator.",

        rejectedBy: "COORDINATOR",

        rejectedAt:
          new Date().toISOString(),

        submittedAt:
          "Rejected by Coordinator",
      };
    });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedDocuments)
    );

    return updatedDocuments;
  } catch (error) {
    console.error(
      "Error rejecting document by Coordinator:",
      error
    );

    return [];
  }
}

// =========================================================
// PRINCIPAL APPROVES DOCUMENT
// =========================================================
// Teacher
//    ↓
// Coordinator APPROVED
//    ↓
// Principal APPROVES
//    ↓
// FINAL APPROVED
// =========================================================

export function principalApproveDocument(id) {
  try {
    const docs = getDocuments();

    const updatedDocuments = docs.map((doc) => {

      if (doc.id !== id) {
        return doc;
      }

      return {
        ...doc,

        // FINAL STATUS
        status: "APPROVED",

        // No more approver
        currentApprover: null,

        // Keep coordinator approval
        coordinatorStatus: "APPROVED",

        // Principal approval
        principalStatus: "APPROVED",

        principalApprovedAt:
          new Date().toISOString(),

        submittedAt:
          "Approved by Principal",

        rejectionReason: null,
        rejectedBy: null,
        rejectedAt: null,
      };
    });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedDocuments)
    );

    return updatedDocuments;
  } catch (error) {
    console.error(
      "Error approving document by Principal:",
      error
    );

    return [];
  }
}

// =========================================================
// PRINCIPAL REJECTS DOCUMENT
// =========================================================

export function principalRejectDocument(
  id,
  rejectionReason = ""
) {
  try {
    const docs = getDocuments();

    const updatedDocuments = docs.map((doc) => {

      if (doc.id !== id) {
        return doc;
      }

      return {
        ...doc,

        // Workflow ends
        status: "REJECTED",

        currentApprover: null,

        // Coordinator already approved it
        coordinatorStatus: "APPROVED",

        // Principal rejected it
        principalStatus: "REJECTED",

        rejectionReason:
          rejectionReason ||
          "Rejected by Principal.",

        rejectedBy: "PRINCIPAL",

        rejectedAt:
          new Date().toISOString(),

        submittedAt:
          "Rejected by Principal",
      };
    });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedDocuments)
    );

    return updatedDocuments;
  } catch (error) {
    console.error(
      "Error rejecting document by Principal:",
      error
    );

    return [];
  }
}

// =========================================================
// RESET STORAGE
// =========================================================
// Useful during development/testing.
// =========================================================

export function resetDocuments() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(INITIAL_DOCUMENTS)
    );

    return INITIAL_DOCUMENTS;
  } catch (error) {
    console.error(
      "Error resetting documents:",
      error
    );

    return [];
  }
}