import LoginForm from "./LoginForm";

function LoginCard({ setCurrentPage, setLoggedInUser }) {
  return (
    <div className="login-page">
      <div className="login-card">

        <img
          src="/logo.png"
          alt="College Logo"
          className="logo"
        />

        <h1 className="college-title">
          KLE BCA PC Jabin Science
          <br />
          College
        </h1>

        <p className="subtitle">
          WORKFLOW MANAGEMENT SYSTEM
        </p>

        <LoginForm
          setCurrentPage={setCurrentPage}
          setLoggedInUser={setLoggedInUser}
        />

      </div>
    </div>
  );
}

export default LoginCard;