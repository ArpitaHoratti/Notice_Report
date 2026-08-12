import LoginCard from "../components/LoginCard";

function Login({ setCurrentPage, setLoggedInUser }) {
  return (
    <LoginCard
      setCurrentPage={setCurrentPage}
      setLoggedInUser={setLoggedInUser}
    />
  );
}

export default Login;