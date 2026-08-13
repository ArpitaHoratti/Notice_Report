import DashboardNavbar from "./components/DashboardNavbar";
import DashboardSidebar from "./components/DashboardSidebar";
import WelcomeHeader from "./components/WelcomeHeader";
import StatCard from "./components/StatCard";
import RecentDocuments from "./components/RecentDocuments";

import {
  FilePlus2,
  FileText,
  Clock3,
  CircleCheck,
} from "lucide-react";

import "./Dashboard.css";

function Dashboard({ user }) {
  const dashboardUser = user || {
    name: "Dr. Anil Kumar",
    role: "TEACHER",
  };

  return (
    <div className="notice-dashboard">

      {/* TOP NAVBAR */}
      <DashboardNavbar user={dashboardUser} />

      <div className="dashboard-body">

        {/* LEFT SIDEBAR */}
        <DashboardSidebar />

        {/* MAIN CONTENT */}
        <main className="dashboard-main-content">

          {/* WELCOME */}
          <WelcomeHeader user={dashboardUser} />

          {/* STAT / ACTION CARDS */}
          <section className="dashboard-stats">

            <StatCard
              type="action"
              icon={FilePlus2}
              title="Create Notice"
              description="Create a new college notice using the official Jabin Science College template."
              buttonText="Open"
            />

            <StatCard
              type="action"
              icon={FileText}
              title="Create Report"
              description="Draft comprehensive academic or administrative reports for review."
              buttonText="Open"
            />

            <StatCard
              type="count"
              icon={Clock3}
              title="Pending Approval"
              count="05"
              description="Documents waiting for Coordinator approval"
              variant="pending"
            />

            <StatCard
              type="count"
              icon={CircleCheck}
              title="Approved"
              count="24"
              description="Documents successfully verified and finalized"
              variant="approved"
            />

          </section>

          {/* RECENT DOCUMENTS */}
          <RecentDocuments />

        </main>

      </div>

    </div>
  );
}

export default Dashboard;