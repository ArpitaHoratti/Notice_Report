import { ArrowRight } from "lucide-react";

function StatCard({
  type,
  icon: Icon,
  title,
  description,
  buttonText,
  count,
  variant,
}) {
  const isPending = variant === "pending";
  const isApproved = variant === "approved";

  return (
    <article
      className={`dashboard-stat-card ${
        type === "count" ? "dashboard-count-card" : ""
      }`}
    >

      {/* ICON */}

      <div
        className={`dashboard-stat-icon ${
          isPending
            ? "pending-icon"
            : isApproved
            ? "approved-icon"
            : "default-icon"
        }`}
      >
        <Icon size={18} strokeWidth={1.8} />
      </div>

      {/* TITLE */}

      <h3>
        {title}
      </h3>

      {/* ACTION CARD */}

      {type === "action" && (
        <>
          <p>
            {description}
          </p>

          <button className="dashboard-open-button">
            <span>
              {buttonText}
            </span>

            <ArrowRight size={14} />
          </button>
        </>
      )}

      {/* COUNT CARD */}

      {type === "count" && (
        <div className="dashboard-count-content">

          <div className="dashboard-count">
            {count}
          </div>

          <p>
            {description}
          </p>

        </div>
      )}

    </article>
  );
}

export default StatCard;