/**
 * Client-side document store for the demo.
 *
 * This file currently stores documents and notifications
 * in browser localStorage.
 *
 * Later, these functions can be connected to:
 * Express + MongoDB backend APIs.
 */

import {
  DOC_STATUS,
  findDocType,
} from "../constants/documents";


// =====================================================
// LOCAL STORAGE KEYS
// =====================================================

const KEY = "workflow.documents.v2";
const NOTIF_KEY = "workflow.notifications.v2";


// =====================================================
// STORE STATE
// =====================================================

const listeners = new Set();

let state = {
  documents: [],
  notifications: [],
};

let loaded = false;


// =====================================================
// LOAD DATA FROM LOCAL STORAGE
// =====================================================

function load() {
  if (loaded || typeof window === "undefined") {
    return;
  }

  loaded = true;

  try {
    state = {
      documents: JSON.parse(
        window.localStorage.getItem(KEY) || "[]"
      ),

      notifications: JSON.parse(
        window.localStorage.getItem(NOTIF_KEY) || "[]"
      ),
    };
  } catch (error) {
    console.error(
      "Could not load workflow data:",
      error
    );

    state = {
      documents: [],
      notifications: [],
    };
  }
}


// =====================================================
// SAVE DATA TO LOCAL STORAGE
// =====================================================

function persist() {
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify(state.documents)
    );

    window.localStorage.setItem(
      NOTIF_KEY,
      JSON.stringify(state.notifications)
    );
  } catch (error) {
    console.error(
      "Could not save workflow data:",
      error
    );
  }

  // Create a new state reference
  // so React subscribers can detect changes.
  state = {
    ...state,
  };

  listeners.forEach((fn) => fn());
}


// =====================================================
// SUBSCRIBE TO STORE CHANGES
// =====================================================

export function subscribe(fn) {
  load();

  listeners.add(fn);

  return () => {
    listeners.delete(fn);
  };
}


// =====================================================
// GET CURRENT STORE STATE
// =====================================================

export function getSnapshot() {
  load();

  return state;
}


// =====================================================
// SERVER SNAPSHOT
// =====================================================

const EMPTY = {
  documents: [],
  notifications: [],
};

export function getServerSnapshot() {
  return EMPTY;
}


// =====================================================
// CURRENT TIME
// =====================================================

const now = () => {
  return new Date().toISOString();
};


// =====================================================
// FORMAT DATE/TIME
// =====================================================

export function formatStamp(iso) {
  if (!iso) {
    return "";
  }

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}


// =====================================================
// CREATE REFERENCE ID
// =====================================================

function makeRefId(type = "") {
  const prefix = type.includes("notice")
    ? "NTC"
    : "RPT";

  const year = new Date().getFullYear();

  const random = Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase();

  return `KLE/BCA/${prefix}/${year}/${random}`;
}


// =====================================================
// CREATE NOTIFICATION
// =====================================================

function notify(userId, title, body) {
  if (!userId) {
    return;
  }

  state.notifications = [
    {
      id: `n-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 6)}`,

      userId,

      title,

      body,

      read: false,

      at: now(),
    },

    ...state.notifications,
  ];
}


// =====================================================
// ADD HISTORY ENTRY
// =====================================================

function log(doc, action, by) {
  doc.history = [
    ...(doc.history || []),

    {
      action,
      by,
      at: now(),
    },
  ];
}


// =====================================================
// REPLACE EXISTING DOCUMENT
// =====================================================

function replace(next) {
  state.documents = state.documents.map(
    (document) =>
      document.id === next.id
        ? next
        : document
  );
}


// =====================================================
// GET ALL DOCUMENTS
// =====================================================

export function listDocuments() {
  return getSnapshot().documents;
}


// =====================================================
// GET DOCUMENT BY ID
// =====================================================

export function getDocument(id) {
  return (
    getSnapshot().documents.find(
      (document) => document.id === id
    ) || null
  );
}


// =====================================================
// DOCUMENTS CREATED BY TEACHER
// =====================================================

export function documentsForAuthor(authorId) {
  return listDocuments().filter(
    (document) =>
      document.authorId === authorId
  );
}


// =====================================================
// PENDING COORDINATOR APPROVAL
// =====================================================

export function pendingForCoordinator(
  coordinatorId
) {
  return listDocuments().filter(
    (document) =>
      document.status ===
        DOC_STATUS.PENDING_COORDINATOR &&
      (
        !coordinatorId ||
        document.coordinatorId ===
          coordinatorId
      )
  );
}


// =====================================================
// DOCUMENTS ASSIGNED TO COORDINATOR
// =====================================================

export function documentsForCoordinator(
  coordinatorId
) {
  return listDocuments().filter(
    (document) =>
      document.coordinatorId ===
      coordinatorId
  );
}


// =====================================================
// PENDING PRINCIPAL APPROVAL
// =====================================================

export function pendingForPrincipal() {
  return listDocuments().filter(
    (document) =>
      document.status ===
      DOC_STATUS.PENDING_PRINCIPAL
  );
}


// =====================================================
// COMPLETED DOCUMENTS
// =====================================================

export function completedDocuments() {
  return listDocuments().filter(
    (document) =>
      document.status ===
      DOC_STATUS.COMPLETED
  );
}


// =====================================================
// SAVE DOCUMENT
//
// Creates a new document or updates an existing
// teacher draft.
// =====================================================

export function saveDocument({
  id,
  type,
  values,
  photos = [],
  author,
}) {
  load();

  // -----------------------------------------------
  // UPDATE EXISTING DOCUMENT
  // -----------------------------------------------

  const existing = id
    ? getDocument(id)
    : null;

  if (existing) {
    const next = {
      ...existing,

      values,

      photos,

      status: DOC_STATUS.SAVED,

      updatedAt: now(),
    };

    next.title =
      values.activityName ||
      existing.title;

    log(
      next,
      "Saved",
      author?.name || "Teacher"
    );

    replace(next);

    persist();

    return next;
  }


  // -----------------------------------------------
  // CREATE NEW DOCUMENT
  // -----------------------------------------------

  const docType = findDocType(type);

  const doc = {
    id: `doc-${Date.now()}`,

    refId: makeRefId(type),

    type,

    typeLabel: docType
      ? docType.label
      : "Document",

    title:
      values.activityName ||
      (docType
        ? docType.label
        : "Untitled"),

    values,

    photos,

    status: DOC_STATUS.SAVED,

    authorId: author?.id || null,

    authorName:
      author?.name || "Teacher",

    authorDesignation:
      author?.designation ||
      "Class Teacher",

    authorDepartment:
      author?.department ||
      "BCA",

    // ---------------------------------------------
    // SIGNATURES
    // ---------------------------------------------

    authorSignature: null,

    coordinatorId: null,

    coordinatorName: null,

    coordinatorSignature: null,

    coordinatorComment: "",

    principalName: null,

    principalSignature: null,

    // ---------------------------------------------
    // REJECTION
    // ---------------------------------------------

    rejectReason: "",

    rejectedBy: "",

    // ---------------------------------------------
    // DATES
    // ---------------------------------------------

    createdAt: now(),

    updatedAt: now(),

    submittedAt: null,

    coordinatorApprovedAt: null,

    approvedAt: null,

    // ---------------------------------------------
    // HISTORY
    // ---------------------------------------------

    history: [],
  };


  log(
    doc,
    "Created",
    author?.name || "Teacher"
  );

  state.documents = [
    doc,
    ...state.documents,
  ];

  persist();

  return doc;
}


// =====================================================
// CLASS TEACHER SIGNATURE
// =====================================================

export function signAsAuthor(
  id,
  author,
  signature
) {
  load();

  const doc = getDocument(id);

  if (!doc) {
    return null;
  }

  const next = {
    ...doc,

    authorSignature: signature,

    updatedAt: now(),
  };

  log(
    next,
    "Signed by Class Teacher",
    author?.name || "Class Teacher"
  );

  replace(next);

  persist();

  return next;
}


// =====================================================
// SEND DOCUMENT TO COORDINATOR
// =====================================================

export function sendToCoordinator(
  id,
  coordinator,
  author
) {
  load();

  const doc = getDocument(id);

  if (!doc) {
    return null;
  }

  const next = {
    ...doc,

    status:
      DOC_STATUS.PENDING_COORDINATOR,

    coordinatorId:
      coordinator.id,

    coordinatorName:
      coordinator.name,

    rejectReason: "",

    rejectedBy: "",

    submittedAt: now(),

    updatedAt: now(),
  };

  log(
    next,
    `Sent to ${coordinator.name}`,
    author?.name || "Teacher"
  );

  replace(next);


  // Notify coordinator
  notify(
    coordinator.id,
    "New document to review",
    `${author?.name || "Teacher"} sent “${next.title}” for your approval.`
  );


  // Notify teacher
  notify(
    author?.id,
    "Sent to coordinator",
    `“${next.title}” is now pending ${coordinator.name}'s approval.`
  );

  persist();

  return next;
}


// =====================================================
// COORDINATOR APPROVE
// =====================================================

export function coordinatorApprove(
  id,
  coordinator,
  signature,
  comment
) {
  load();

  const doc = getDocument(id);

  if (!doc) {
    return null;
  }

  const next = {
    ...doc,

    status:
      DOC_STATUS.PENDING_PRINCIPAL,

    coordinatorSignature:
      signature,

    coordinatorComment:
      comment || "",

    coordinatorApprovedAt:
      now(),

    updatedAt:
      now(),
  };

  log(
    next,
    "Coordinator Approved",
    coordinator?.name ||
      "Coordinator"
  );

  log(
    next,
    "Forwarded to Principal",
    coordinator?.name ||
      "Coordinator"
  );

  replace(next);


  notify(
    doc.authorId,
    "Coordinator approved",
    `${coordinator?.name || "Coordinator"} approved “${doc.title}” and forwarded it to the Principal.`
  );

  persist();

  return next;
}


// =====================================================
// COORDINATOR REJECT
// =====================================================

export function coordinatorReject(
  id,
  coordinator,
  reason
) {
  load();

  const doc = getDocument(id);

  if (!doc) {
    return null;
  }

  const next = {
    ...doc,

    status:
      DOC_STATUS.REJECTED,

    rejectReason:
      reason || "",

    rejectedBy:
      coordinator?.name ||
      "Coordinator",

    updatedAt:
      now(),
  };

  log(
    next,
    `Rejected: ${reason || "No reason provided"}`,
    coordinator?.name ||
      "Coordinator"
  );

  replace(next);


  notify(
    doc.authorId,
    "Document rejected",
    `${coordinator?.name || "Coordinator"} rejected “${doc.title}”. Reason: ${reason || "No reason provided"}`
  );

  persist();

  return next;
}


// =====================================================
// PRINCIPAL APPROVE
// =====================================================

export function principalApprove(
  ids,
  principal,
  signature
) {
  load();

  const list = Array.isArray(ids)
    ? ids
    : [ids];

  list.forEach((id) => {
    const doc = getDocument(id);

    if (
      !doc ||
      doc.status !==
        DOC_STATUS.PENDING_PRINCIPAL
    ) {
      return;
    }

    const next = {
      ...doc,

      status:
        DOC_STATUS.COMPLETED,

      principalName:
        principal?.name ||
        "Principal",

      principalSignature:
        signature ||
        doc.principalSignature,

      approvedAt:
        now(),

      updatedAt:
        now(),
    };

    log(
      next,
      "Principal Approved",
      principal?.name ||
        "Principal"
    );

    log(
      next,
      "Completed",
      principal?.name ||
        "Principal"
    );

    replace(next);


    // Notify teacher
    notify(
      doc.authorId,
      "Final approval",
      `“${doc.title}” is Final Approved. Ref ${doc.refId}. You can download the PDF.`
    );


    // Notify coordinator
    notify(
      doc.coordinatorId,
      "Principal approved",
      `“${doc.title}” was finalised by ${principal?.name || "Principal"}.`
    );
  });

  persist();

  return list.length;
}


// =====================================================
// PRINCIPAL REJECT
// =====================================================

export function principalReject(
  id,
  principal,
  reason
) {
  load();

  const doc = getDocument(id);

  if (!doc) {
    return null;
  }

  const next = {
    ...doc,

    status:
      DOC_STATUS.REJECTED,

    rejectReason:
      reason || "",

    rejectedBy:
      principal?.name ||
      "Principal",

    updatedAt:
      now(),
  };

  log(
    next,
    `Rejected: ${reason || "No reason provided"}`,
    principal?.name ||
      "Principal"
  );

  replace(next);


  // Notify teacher
  notify(
    doc.authorId,
    "Document rejected",
    `${principal?.name || "Principal"} rejected “${doc.title}”.`
  );


  // Notify coordinator
  notify(
    doc.coordinatorId,
    "Document rejected",
    `${principal?.name || "Principal"} rejected “${doc.title}”.`
  );

  persist();

  return next;
}


// =====================================================
// GET USER NOTIFICATIONS
// =====================================================

export function notificationsFor(
  userId
) {
  return getSnapshot().notifications.filter(
    (notification) =>
      notification.userId === userId
  );
}


// =====================================================
// MARK NOTIFICATIONS AS READ
// =====================================================

export function markNotificationsRead(
  userId
) {
  load();

  const hasUnread =
    state.notifications.some(
      (notification) =>
        notification.userId === userId &&
        !notification.read
    );

  if (!hasUnread) {
    return;
  }

  state.notifications =
    state.notifications.map(
      (notification) =>
        notification.userId === userId
          ? {
              ...notification,
              read: true,
            }
          : notification
    );

  persist();
}