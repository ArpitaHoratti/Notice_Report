import { useState } from "react";

import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import Notice from "./pages/Notice";
import CreateReport from "./pages/CreateReport";

import ApprovalDashboard from "./components/ApprovalDashboard";
import PrincipalDashboard from "./components/PrincipalDashboard";
import ManagementDashboard from "./components/ManagementDashboard";

function App() {
  // =========================================
  // CURRENT PAGE
  // login | teacher | notice | report
  // coordinator | principal | management
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
  // MANAGEMENT DASHBOARD NAVIGATION
  //
  // IMPORTANT:
  // Management Dashboard is completely isolated.
  //
  // If ManagementDashboard tries to navigate
  // to "notice", "report", "teacher", etc.,
  // it will ALWAYS stay on management dashboard.
  // =========================================
  const handleManagementNavigation = () => {
    setCurrentPage("management");
  };

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

            // Creating a NEW notice/report
            if (page === "notice" || page === "report") {
              setSelectedDocForEdit(null);
            }

            setCurrentPage(page);
          }}
          setLoggedInUser={setLoggedInUser}
          setSelectedDocForEdit={setSelectedDocForEdit}
        />
      )}

      {/* =========================================
          NOTICE CREATOR
      ========================================= */}
      {currentPage === "notice" && (
        <Notice
          user={loggedInUser}
          setCurrentPage={setCurrentPage}
          editingDoc={selectedDocForEdit}
        />
      )}

      {/* =========================================
          REPORT CREATOR
      ========================================= */}
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
          
          IMPORTANT:
          This dashboard is isolated from:
          - Teacher Dashboard
          - Notice Creator
          - Report Creator
          - Principal Dashboard
          - Coordinator Dashboard
          
          Any navigation request from the
          Management Dashboard will stay here.
      ========================================= */}
      {currentPage === "management" && (
        <ManagementDashboard
          user={loggedInUser}

          // DO NOT pass the main setCurrentPage here.
          // Management navigation is isolated.
          setCurrentPage={handleManagementNavigation}

          onLogout={handleLogout}
        />
      )}

    </div>
  );
}

export default App;