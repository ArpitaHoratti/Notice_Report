import { useState } from "react";

import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import Notice from "./pages/Notice";
import Agenda from "./pages/Agenda";
import ClgFormatPage from "./pages/ClgFormat";
import Report from "./pages/Report";

import ApprovalDashboard from "./components/ApprovalDashboard";
import PrincipalDashboard from "./components/PrincipalDashboard";
import ManagementDashboard from "./components/ManagementDashboard";

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

  // =========================================
  // LOGOUT
  // =========================================
  const handleLogout = () => {
    setLoggedInUser(null);
    setSelectedDocForEdit(null);
    setCurrentPage("login");
  };

  // =========================================
  // MANAGEMENT NAVIGATION
  // =========================================
  const handleManagementNavigation = (page) => {
    /*
      Management dashboard is kept isolated.

      Only allow navigation back to management.
      Other dashboard/page navigation is not allowed
      from the management section.
    */

    if (page === "management") {
      setCurrentPage("management");
    }
  };

  // =========================================
  // PAGE RENDER
  // =========================================
  return (
    <div className="app">

      {/* =========================================
          LOGIN PAGE
      ========================================= */}
      {currentPage === "login" && (
        <Login
          setCurrentPage={setCurrentPage}
          setLoggedInUser={setLoggedInUser}
        />
      )}

      {/* =========================================
          TEACHER DASHBOARD
      ========================================= */}
      {currentPage === "teacher" && (
        <TeacherDashboard
          user={loggedInUser}
          setCurrentPage={(page) => {
            // Clear previously selected document when
            // creating a completely new document.
            if (
              page === "notice" ||
              page === "report" ||
              page === "agenda" ||
              page === "clgformat"
            ) {
              setSelectedDocForEdit(null);
            }

            setCurrentPage(page);
          }}
          setLoggedInUser={setLoggedInUser}
          setSelectedDocForEdit={setSelectedDocForEdit}
        />
      )}

      {/* =========================================
          NOTICE GENERATOR
      ========================================= */}
      {currentPage === "notice" && (
        <Notice
          user={loggedInUser}
          setCurrentPage={setCurrentPage}
          editingDoc={selectedDocForEdit}
        />
      )}

      {/* =========================================
          REPORT GENERATOR
      ========================================= */}
      {currentPage === "report" && (
        <Report
          user={loggedInUser}
          setCurrentPage={setCurrentPage}
          editingDoc={selectedDocForEdit}
        />
      )}

      {/* =========================================
          AGENDA GENERATOR
      ========================================= */}
      {currentPage === "agenda" && (
        <Agenda
          user={loggedInUser}
          setCurrentPage={setCurrentPage}
          editingDoc={selectedDocForEdit}
        />
      )}

      {/* =========================================
          COLLEGE FORMAT GENERATOR
      ========================================= */}
      {currentPage === "clgformat" && (
        <ClgFormatPage
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
          setCurrentPage={setCurrentPage}
          onLogout={handleLogout}
        />
      )}

      {/* =========================================
          PRINCIPAL DASHBOARD
      ========================================= */}
      {currentPage === "principal" && (
        <PrincipalDashboard
          user={loggedInUser}
          setCurrentPage={setCurrentPage}
          onLogout={handleLogout}
        />
      )}

      {/* =========================================
          MANAGEMENT DASHBOARD

          Management is isolated from:

          - Teacher Dashboard
          - Notice Creator
          - Report Creator
          - Agenda Creator
          - College Format Creator
          - Coordinator Dashboard
          - Principal Dashboard
      ========================================= */}
      {currentPage === "management" && (
        <ManagementDashboard
          user={loggedInUser}
          setCurrentPage={handleManagementNavigation}
          onLogout={handleLogout}
        />
      )}

    </div>
  );
}

export default App;