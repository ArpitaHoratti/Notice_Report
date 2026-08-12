import { CheckCircle2 } from "lucide-react";

function SuccessMessage() {
  return (
    <div className="success-box">
      <CheckCircle2 size={22} />
      <span>Login successful. Redirecting...</span>
    </div>
  );
}

export default SuccessMessage;