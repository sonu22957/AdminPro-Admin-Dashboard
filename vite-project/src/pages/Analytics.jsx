import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import { TrendingUp, Users, Eye, MousePointer, Activity, Download } from "lucide-react";

const analyticsStats = [
  { label: "Total Visits",   value: "2.4M", change: "+18%", icon: Eye,         color: "#6366f1" },
  { label: "Engagement",     value: "74.8%",change: "+9%",  icon: MousePointer, color: "#0ea5e9" },
  { label: "New Users",      value: "12.3k",change: "+23%", icon: Users,        color: "#10b981" },
  { label: "Active Sessions",value: "3,891",change: "+5%",  icon: Activity,     color: "#f59e0b" },
];

const trafficData = [
  { day: "Mon", visits: 3200 },
  { day: "Tue", visits: 4100 },
  { day: "Wed", visits: 3800 },
  { day: "Thu", visits: 5300 },
  { day: "Fri", visits: 4900 },
  { day: "Sat", visits: 6200 },
  { day: "Sun", visits: 5800 },
];

const trafficSources = [
  { name: "Organic Search", percent: 46, color: "#2563eb" },
  { name: "Direct",         percent: 29, color: "#7c3aed" },
  { name: "Referral",       percent: 15, color: "#0ea5e9" },
  { name: "Social Media",   percent: 10, color: "#10b981" },
];

const filters = ["7 Days", "30 Days", "3 Months", "This Year"];

function Analytics() {
  const [activeFilter, setActiveFilter] = useState("7 Days");

  return (
    <div className="analytics-page">

      {/* Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1>Analytics</h1>
          <p>Deep insights into your platform performance.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary" style={{ fontSize: "13px" }}>
            <Download size={15} />
            Export
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${activeFilter === f ? "active" : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        {analyticsStats.map((s) => {
          const Icon = s.icon;
          return (
            <div className="stat-card" key={s.label}>
              <div className="stat-card-top">
                <div>
                  <p>{s.label}</p>
                  <h2>{s.value}</h2>
                </div>
                <div className="stat-icon" style={{ background: s.color }}>
                  <Icon size={22} />
                </div>
              </div>
              <div className="stat-change">
                <span className="stat-change-badge positive">
                  <TrendingUp size={11} />
                  {s.change}
                </span>
                <span>vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="analytics-charts">

        {/* Traffic Chart */}
        <div className="analytics-chart-card">
          <div className="card-header">
            <div>
              <h3>Daily Traffic</h3>
              <p>Visits per day this week</p>
            </div>
            <span className="card-badge">
              <TrendingUp size={12} />
              +18%
            </span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={trafficData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={1} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "var(--text-muted)", fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--text-muted)", fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} width={36} />
              <Tooltip
                contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", boxShadow: "var(--shadow-lg)", fontSize: "13px" }}
                labelStyle={{ color: "var(--text-muted)", fontWeight: 600 }}
                itemStyle={{ color: "var(--text-primary)", fontWeight: 700 }}
                formatter={(v) => [`${v.toLocaleString()} visits`]}
                cursor={{ fill: "var(--border-subtle)" }}
              />
              <Bar dataKey="visits" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources */}
        <div className="analytics-chart-card">
          <div className="card-header">
            <div>
              <h3>Traffic Sources</h3>
              <p>Where your visitors come from</p>
            </div>
          </div>

          <div className="traffic-sources">
            {trafficSources.map((src) => (
              <div key={src.name} className="traffic-source-item">
                <div className="traffic-source-label">
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: src.color, flexShrink: 0 }} />
                    <span className="traffic-source-name">{src.name}</span>
                  </div>
                  <span className="traffic-source-percent">{src.percent}%</span>
                </div>
                <div className="traffic-bar">
                  <div
                    className="traffic-bar-fill"
                    style={{ width: `${src.percent}%`, background: src.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mini Stats */}
          <div className="analytics-mini-stats">
            <div className="mini-stat">
              <div className="mini-stat-value">88.2%</div>
              <div className="mini-stat-label">Retention Rate</div>
            </div>
            <div className="mini-stat">
              <div className="mini-stat-value">3m 24s</div>
              <div className="mini-stat-label">Avg Session</div>
            </div>
            <div className="mini-stat">
              <div className="mini-stat-value">2.8%</div>
              <div className="mini-stat-label">Bounce Rate</div>
            </div>
            <div className="mini-stat">
              <div className="mini-stat-value">4.6★</div>
              <div className="mini-stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
