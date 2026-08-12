import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import WelcomeSection from "../components/WelcomeSection";
import DashboardCard from "../components/DashboardCard";
import RecentDocuments from "../components/RecentDocuments";
import "./TeacherDashboard.css";

import {
  FilePlus,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react";

function TeacherDashboard() {
  // Temporary user (Later we'll get this from Login/MongoDB)
  const user = {
    name: "Arpita Horatti",
    role: "Teacher",
  };

  return (
    <div className="teacher-dashboard">

      {/* Navbar */}
      <Navbar user={user} />

      <div className="dashboard-container">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="dashboard-content">

          {/* Welcome */}
          <WelcomeSection user={user} />

          {/* Cards */}
          <div className="dashboard-cards">

            <DashboardCard
              icon={FilePlus}
              title="Create Notice"
              description="Create a new college notice using the official template."
              buttonText="Open"
            />

            <DashboardCard
              icon={FileText}
              title="Create Report"
              description="Draft comprehensive academic or administrative reports."
              buttonText="Open"
            />

            <DashboardCard
              icon={Clock}
              title="Pending Approval"
              count="05"
              color="#D97706"
              bgColor="#FEF3C7"
            />

            <DashboardCard
              icon={CheckCircle}
              title="Approved"
              count="24"
              color="#059669"
              bgColor="#D1FAE5"
            />

          </div>

          {/* Recent Documents */}
          <RecentDocuments />

        </main>

      </div>

    </div>
  );
}

export default TeacherDashboard;