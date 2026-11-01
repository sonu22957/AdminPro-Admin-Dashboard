import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  ChartNoAxesCombined,
  Settings,
  LogOut,
  X,
  Zap
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, closeSidebar }) {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Users", path: "/users", icon: Users, badge: "8.5k" },
    { name: "Orders", path: "/orders", icon: ShoppingCart, badge: "12" },
    { name: "Analytics", path: "/analytics", icon: ChartNoAxesCombined },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        {/* Logo */}
        <div className="sidebar-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "32px", height: "32px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Zap size={18} color="white" />
            </div>
            <h2 className="sidebar-logo">AdminPro</h2>
          </div>
          <button className="sidebar-close" onClick={closeSidebar} aria-label="Close sidebar">
            <X size={18} />
          </button>
        </div>

        {/* Profile */}
        <div className="sidebar-profile">
          <div className="sidebar-avatar">AU</div>
          <div className="sidebar-profile-info">
            <div className="sidebar-profile-name">Admin User</div>
            <div className="sidebar-profile-role">Super Administrator</div>
          </div>
        </div>

        {/* Menu */}
        <p className="menu-title">Main Menu</p>

        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                to={item.path}
                key={item.name}
                end={item.path === "/"}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={18} />
                <span style={{ flex: 1 }}>{item.name}</span>
                {item.badge && (
                  <span className="sidebar-link-badge">{item.badge}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <button className="logout-btn">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;