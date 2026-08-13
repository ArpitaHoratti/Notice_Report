import { useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./dashboard/Dashboard";

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
        <Dashboard user={loggedInUser} />
      )}
    </>
  );
}

export default App;