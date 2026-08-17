import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import GoogleButton from "./GoogleButton";

function LoginForm({ setCurrentPage, setLoggedInUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const users = [
    {
      name: "Arpita Horatti",
      email: "arpitahoratti@klebca.in",
      password: "1234^#hsh",
      role: "Teacher",
    },
    {
      name: "Karthik Topkar",
      email: "karthiktopkar@klebca.in",
      password: "e365478()4#",
      role: "Teacher",
    },
    {
      name: "Manoj Ghantikeri",
      email: "manojghantikeri@klebca.in",
      password: "te76w88*&($%",
      role: "Coordinator",
    },
    {
      name: "Pushpa Yantaii",
      email: "pushpayantaii@klebca.in",
      password: "353$^&^*(",
      role: "Coordinator",
    },
    {
      name: "Siddu",
      email: "siddu@klebca.in",
      password: "$%^&*VG()",
      role: "Principal",
    },
    {
      name: "Management",
      email: "management@klebca.in",
      password: "Admin@123",
      role: "Management",
    },
  ];

  const handleLogin = () => {
    setMessage("");

    const enteredEmail = email.trim().toLowerCase();
    const enteredPassword = password.trim();

    // Empty fields
    if (!enteredEmail || !enteredPassword) {
      setMessage("Please enter both email and password.");
      setMessageType("error");
      return;
    }

    // Check domain
    if (!enteredEmail.endsWith("@klebca.in")) {
      setMessage(
        "Please use your official KLE BCA email address (@klebca.in)."
      );
      setMessageType("error");
      return;
    }

    // Find user
    const user = users.find(
      (u) => u.email.trim().toLowerCase() === enteredEmail
    );

    console.log("Entered Email:", enteredEmail);
    console.log("Matched User:", user);

    if (!user) {
      setMessage("No account found with this email address.");
      setMessageType("error");
      return;
    }

    // Password check
    if (user.password !== enteredPassword) {
      setMessage("Incorrect password.");
      setMessageType("error");
      return;
    }

    // Success
    setMessage(`Welcome ${user.name}`);
    setMessageType("success");

    setTimeout(() => {
      setLoggedInUser(user);

      switch (user.role) {
        case "Teacher":
          setCurrentPage("teacher");
          break;

        case "Coordinator":
          setCurrentPage("coordinator");
          break;

        case "Principal":
          setCurrentPage("principal");
          break;

        case "Management":
          setCurrentPage("management");
          break;

        default:
          setCurrentPage("login");
      }
    }, 1000);
  };

  return (
    <>
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <div className="form-group">
        <label>OFFICIAL EMAIL ADDRESS</label>

        <div className="input-box">
          <Mail size={20} className="icon" />

          <input
            type="email"
            placeholder="example@klebca.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label>PASSWORD</label>

        <div className="input-box">
          <Lock size={20} className="icon" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {showPassword ? (
            <Eye
              size={20}
              className="eye-icon"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeOff
              size={20}
              className="eye-icon"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
      </div>

      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>

      <div className="divider">
        <span>OR CONTINUE WITH</span>
      </div>

      <GoogleButton setCurrentPage={setCurrentPage} setLoggedInUser={setLoggedInUser} />
    </>
  );
}

export default LoginForm;