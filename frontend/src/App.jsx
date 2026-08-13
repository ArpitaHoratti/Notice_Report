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
  // LOGOUT
  // =========================================
  const handleLogout = () => {
    setLoggedInUser(null);
    setCurrentPage("login");
  };

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
          setCurrentPage={setCurrentPage}
          setLoggedInUser={setLoggedInUser}
        />
      )}

      {/* NOTICE GENERATOR DASHBOARD */}
      {currentPage === "notice" && (
        <Notice
          user={loggedInUser}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* ACADEMIC REPORT GENERATOR */}
      {currentPage === "report" && (
        <CreateReport
          user={loggedInUser}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default App;