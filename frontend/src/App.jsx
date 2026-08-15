import { useState } from "react";

import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import Notice from "./pages/Notice";
import CreateReport from "./pages/CreateReport";

function App() {
  // =========================================
  // CURRENT PAGE ("login" | "teacher" | "notice" | "report")
  // =========================================
  const [currentPage, setCurrentPage] = useState("login");

  // =========================================
  // LOGGED-IN USER
  // =========================================
  const [loggedInUser, setLoggedInUser] = useState(null);

  // =========================================
  // SELECTED DOCUMENT FOR EDITING
  // =========================================
  const [selectedDocForEdit, setSelectedDocForEdit] = useState(null);

  // =========================================
  // RENDER
  // =========================================
  return (
    <div className="app">
      {/* LOGIN PAGE */}
      {currentPage === "login" && (
        <Login
          setCurrentPage={setCurrentPage}
          setLoggedInUser={setLoggedInUser}
        />
      )}

      {/* TEACHER DASHBOARD */}
      {currentPage === "teacher" && (
        <TeacherDashboard
          user={loggedInUser}
          setCurrentPage={(page) => {
            if (page === "notice" || page === "report") {
              // Reset edit doc if navigated directly from sidebar action buttons
            }
            setCurrentPage(page);
          }}
          setLoggedInUser={setLoggedInUser}
          setSelectedDocForEdit={setSelectedDocForEdit}
        />
      )}

      {/* NOTICE GENERATOR DASHBOARD */}
      {currentPage === "notice" && (
        <Notice
          user={loggedInUser}
          setCurrentPage={setCurrentPage}
          editingDoc={selectedDocForEdit}
        />
      )}

      {/* ACADEMIC REPORT GENERATOR */}
      {currentPage === "report" && (
        <CreateReport
          user={loggedInUser}
          setCurrentPage={setCurrentPage}
          editingDoc={selectedDocForEdit}
        />
      )}
    </div>
  );
}

export default App;