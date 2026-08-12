import { ArrowRight } from "lucide-react";

function DashboardCard({
  icon: Icon,
  title,
  description,
  buttonText,
  count,
  color = "#7A1F2B",
  bgColor = "#F8F3EB",
}) {
  return (
    <div className="dashboard-card">

      <div
        className="card-icon"
        style={{
          backgroundColor: bgColor,
          color: color,
        }}
      >
        {Icon && <Icon size={28} />}
      </div>

      <h3 className="card-title">{title}</h3>

      {description && (
        <p className="card-description">
          {description}
        </p>
      )}

      {count ? (
        <div className="card-count-section">
          <h1 className="card-count">
            {count}
          </h1>

          <p className="card-small-text">
            Documents
          </p>
        </div>
      ) : (
        <button className="card-button">
          {buttonText}

          <ArrowRight size={18} />
        </button>
      )}

    </div>
  );
}

export default DashboardCard;