function GoogleButton({ setCurrentPage, setLoggedInUser }) {
  const handleGoogleLogin = () => {
    const defaultUser = {
      name: "Arpita Horatti",
      email: "arpitahoratti@klebca.in",
      role: "Teacher",
    };
    if (setLoggedInUser) setLoggedInUser(defaultUser);
    if (setCurrentPage) setCurrentPage("teacher");
  };

  return (
    <button className="google-btn" type="button" onClick={handleGoogleLogin}>
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
      />
      Continue with Google
    </button>
  );
}

export default GoogleButton;