import { MapPin } from "lucide-react";

function WelcomeHeader({ user }) {
  return (
    <section className="dashboard-welcome">

      <h2>
        Welcome back, {user?.name || "Dr. Anil Kumar"}
      </h2>

      <div className="dashboard-location">

        <MapPin size={13} />

        <span>
          Department of Computer Science
        </span>

        <span className="dashboard-dot">
          •
        </span>

        <strong>
          {user?.role || "Teacher"}
        </strong>

      </div>

    </section>
  );
}

export default WelcomeHeader;