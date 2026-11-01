import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { salesData } from "../../data/dashboardData";
import { TrendingUp } from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        padding: "10px 14px",
        boxShadow: "var(--shadow-lg)",
      }}>
        <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>{label}</p>
        <p style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-primary)" }}>
          ₹{Number(payload[0].value).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

function SalesChart() {
  return (
    <div className="chart-card">
      <div className="card-header">
        <div>
          <h3>Revenue Overview</h3>
          <p>Monthly revenue trend for this year</p>
        </div>
        <span className="card-badge">
          <TrendingUp size={12} />
          +12.5%
        </span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={salesData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border)", strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#2563eb"
            strokeWidth={2.5}
            fill="url(#salesGrad)"
            dot={{ fill: "#2563eb", strokeWidth: 2, r: 4, stroke: "var(--surface)" }}
            activeDot={{ r: 6, fill: "#2563eb", stroke: "var(--surface)", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;