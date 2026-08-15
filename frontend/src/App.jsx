import { useState } from "react";

import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import Notice from "./pages/Notice";
import CreateReport from "./pages/CreateReport";
import ApprovalDashboard from "./components/ApprovalDashboard";

function App() {
  // =========================================
  // CURRENT PAGE
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
              setSelectedDocForEdit(null);
            }

            setCurrentPage(page);
          }}
          setLoggedInUser={setLoggedInUser}
          setSelectedDocForEdit={setSelectedDocForEdit}
        />
      )}

      {/* NOTICE PAGE */}
      {currentPage === "notice" && (
        <Notice
          user={loggedInUser}
          setCurrentPage={setCurrentPage}
          editingDoc={selectedDocForEdit}
        />
      )}

      {/* REPORT PAGE */}
      {currentPage === "report" && (
        <CreateReport
          user={loggedInUser}
          setCurrentPage={setCurrentPage}
          editingDoc={selectedDocForEdit}
        />
      )}

      {/* =========================================
          COORDINATOR DASHBOARD
      ========================================= */}
      {currentPage === "coordinator" && (
        <ApprovalDashboard
          user={loggedInUser}
          onLogout={() => {
            setLoggedInUser(null);
            setCurrentPage("login");
          }}
        />
      )}

    </div>
  );
}

export default App;