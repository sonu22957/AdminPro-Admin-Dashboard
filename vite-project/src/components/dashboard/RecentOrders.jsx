import { recentOrders as defaultOrders } from "../../data/dashboardData";
import { ArrowRight } from "lucide-react";

function RecentOrders({ orders = defaultOrders, showViewAll = true }) {
  return (
    <div className="orders-card">
      <div className="card-header">
        <div>
          <h3>Recent Orders</h3>
          <p>Latest transactions from your store</p>
        </div>
        {showViewAll && (
          <button
            className="btn btn-ghost"
            style={{ fontSize: "13px", padding: "6px 12px", gap: "5px" }}
          >
            View all <ArrowRight size={14} />
          </button>
        )}
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <span style={{ fontWeight: 600, fontFamily: "monospace", color: "var(--brand-600)", fontSize: "13px" }}>
                    {order.id}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: "28px", height: "28px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "white", fontSize: "11px", fontWeight: 700, flexShrink: 0
                    }}>
                      {order.customer.charAt(0)}
                    </div>
                    <span style={{ fontWeight: 500 }}>{order.customer}</span>
                  </div>
                </td>
                <td style={{ color: "var(--text-secondary)" }}>{order.product}</td>
                <td style={{ fontWeight: 700 }}>{order.amount}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;