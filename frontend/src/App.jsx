import { useState } from "react";

import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <>
      {currentPage === "login" && (
        <Login
          setCurrentPage={setCurrentPage}
          setLoggedInUser={setLoggedInUser}
        />
      )}

      {currentPage === "teacher" && (
        <TeacherDashboard user={loggedInUser} />
      )}
    </>
  );
}

export default App;