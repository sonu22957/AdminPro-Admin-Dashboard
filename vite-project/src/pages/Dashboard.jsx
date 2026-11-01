import StatCard from "../components/dashboard/StatCard";
import SalesChart from "../components/dashboard/SalesChart";
import RecentOrders from "../components/dashboard/RecentOrders";
import { dashboardStats } from "../data/dashboardData";
import { Activity } from "lucide-react";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1>Dashboard Overview</h1>
          <p>Here's what's happening with your store today.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary" style={{ fontSize: "13px" }}>
            <Activity size={15} />
            Live View
          </button>
          <button className="btn btn-primary" style={{ fontSize: "13px" }}>
            Download Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Chart */}
      <SalesChart />

      {/* Recent Orders */}
      <RecentOrders />

    </div>
  );
}

export default Dashboard;