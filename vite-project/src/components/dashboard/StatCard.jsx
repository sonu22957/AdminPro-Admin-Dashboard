import {
  IndianRupee,
  Users,
  ShoppingCart,
  Package,
  TrendingUp,
  TrendingDown
} from "lucide-react";

const iconMap = {
  revenue: { Icon: IndianRupee, cls: "revenue" },
  users:   { Icon: Users,        cls: "users"   },
  orders:  { Icon: ShoppingCart, cls: "orders"  },
  products:{ Icon: Package,      cls: "products"},
};

function StatCard({ title, value, change, icon }) {
  const { Icon, cls } = iconMap[icon] || iconMap.products;
  const isPositive = !change || change.startsWith("+");

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div>
          <p>{title}</p>
          <h2>{value}</h2>
        </div>
        <div className={`stat-icon ${cls}`}>
          <Icon size={22} />
        </div>
      </div>

      <div className="stat-change">
        <span className={`stat-change-badge ${isPositive ? "positive" : "negative"}`}>
          {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {change}
        </span>
        <span>vs last month</span>
      </div>
    </div>
  );
}

export default StatCard;