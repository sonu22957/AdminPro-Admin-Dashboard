import { useState } from "react";
import { Search, Plus, Trash2, Filter, Download } from "lucide-react";
import { initialOrders } from "../data/orderData";

const ALL_STATUSES = ["All", "Delivered", "Pending", "Cancelled", "Processing"];

function Orders() {
  const [orders] = useState(() => [
    ...initialOrders,
    { id: "#ORD005", customer: "Arjun Mehta",  product: "Gaming Keyboard",   amount: "₹3,499", date: "2026-10-29", status: "Processing" },
    { id: "#ORD006", customer: "Sneha Joshi",  product: "Bluetooth Speaker",  amount: "₹1,799", date: "2026-10-30", status: "Delivered"  },
    { id: "#ORD007", customer: "Karan Gupta",  product: "USB-C Hub",          amount: "₹999",   date: "2026-10-31", status: "Pending"    },
  ]);

  const [search, setSearch]           = useState("");
  const [activeStatus, setActiveStatus] = useState("All");

  const filtered = orders.filter((o) => {
    const matchStatus = activeStatus === "All" || o.status === activeStatus;
    const matchSearch = `${o.id} ${o.customer} ${o.product}`.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = ALL_STATUSES.reduce((acc, s) => {
    acc[s] = s === "All" ? orders.length : orders.filter((o) => o.status === s).length;
    return acc;
  }, {});

  return (
    <div className="orders-page">

      {/* Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1>Order Management</h1>
          <p>Track, filter and manage all customer orders.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary" style={{ fontSize: "13px" }}>
            <Download size={15} />
            Export
          </button>
          <button className="btn btn-primary" style={{ fontSize: "13px" }}>
            <Plus size={15} />
            New Order
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {["Delivered", "Pending", "Processing", "Cancelled"].map((s) => {
          const colorMap = {
            Delivered:  { bg: "var(--green-bg)",  color: "var(--green-text)"  },
            Pending:    { bg: "var(--yellow-bg)", color: "var(--yellow-text)" },
            Processing: { bg: "var(--blue-bg)",   color: "var(--blue-text)"   },
            Cancelled:  { bg: "var(--red-bg)",    color: "var(--red-text)"    },
          };
          const { bg, color } = colorMap[s];
          return (
            <div key={s} className="stat-card" style={{ padding: "16px 20px", cursor: "pointer" }} onClick={() => setActiveStatus(s)}>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600 }}>{s}</p>
              <h2 style={{ fontSize: "28px", marginTop: "6px" }}>{counts[s]}</h2>
              <span className={`status-badge ${s.toLowerCase()}`} style={{ marginTop: "10px" }}>{s}</span>
            </div>
          );
        })}
      </div>

      {/* Filters + Search */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "14px" }}>
        <div className="filter-bar">
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              className={`filter-btn ${activeStatus === s ? "active" : ""}`}
              onClick={() => setActiveStatus(s)}
            >
              {s}
              <span style={{
                marginLeft: "6px",
                fontSize: "10px",
                fontWeight: 700,
                padding: "1px 6px",
                borderRadius: "99px",
                background: activeStatus === s ? "rgba(255,255,255,0.25)" : "var(--bg)",
                color: activeStatus === s ? "white" : "var(--text-muted)"
              }}>
                {counts[s]}
              </span>
            </button>
          ))}
        </div>

        <div className="users-search" style={{ width: "auto", minWidth: "260px" }}>
          <Search size={15} />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="users-table-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((order) => (
                <tr key={order.id}>
                  <td>
                    <span style={{ fontWeight: 700, fontFamily: "monospace", color: "var(--brand-600)", fontSize: "13px" }}>
                      {order.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "30px", height: "30px", borderRadius: "50%",
                        background: "linear-gradient(135deg, #f59e0b, #f97316)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "white", fontSize: "11px", fontWeight: 700
                      }}>
                        {order.customer.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 500 }}>{order.customer}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{order.product}</td>
                  <td style={{ fontWeight: 700 }}>{order.amount}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>{order.date}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6">
                    <div className="empty-state">
                      <Filter size={28} />
                      <p>No orders match your filter.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Orders;
