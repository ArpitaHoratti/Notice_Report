import { MapPin } from "lucide-react";

function WelcomeSection({ user }) {
  return (
    <div className="welcome-section">

      <h2 className="welcome-title">
        Welcome back, {user.name}
      </h2>

      <p className="welcome-subtitle">
        <MapPin size={16} />

        Department of Computer Science

        <span className="welcome-role">
          • {user.role}
        </span>
      </p>

    </div>
  );
}

export default WelcomeSection;