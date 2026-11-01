import { useState, useRef, useEffect } from "react";
import { Search, Bell, Sun, Moon, Menu, ChevronDown, User, CreditCard, HelpCircle, LogOut, Settings } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/": { title: "Dashboard", subtitle: "Welcome back, here's what's happening today." },
  "/users": { title: "Users", subtitle: "Manage and monitor all user accounts." },
  "/orders": { title: "Orders", subtitle: "Track and manage customer orders." },
  "/analytics": { title: "Analytics", subtitle: "Deep insights into your performance." },
  "/settings": { title: "Settings", subtitle: "Configure your account preferences." },
};

const notifications = [
  { id: 1, color: "blue", text: "New order #ORD012 received from Rahul Kumar", time: "2 min ago" },
  { id: 2, color: "green", text: "Payment of ₹4,299 confirmed successfully", time: "18 min ago" },
  { id: 3, color: "orange", text: "5 orders are pending delivery review", time: "1 hr ago" },
  { id: 4, color: "blue", text: "New user Ananya Patel just registered", time: "3 hr ago" },
];

function Navbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname] || pageTitles["/"];

  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifCount, setNotifCount] = useState(4);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleClearNotif = () => setNotifCount(0);

  return (
    <header className="top-navbar">
      {/* Left */}
      <div className="navbar-left">
        <button
          type="button"
          className="menu-toggle-btn"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <div>
          <div className="navbar-page-title">{pageInfo.title}</div>
          <div className="navbar-page-subtitle">{pageInfo.subtitle}</div>
        </div>
      </div>

      {/* Right */}
      <div className="navbar-right">
        {/* Search */}
        <div className="dashboard-search">
          <Search size={15} />
          <input type="text" placeholder="Search anything..." />
        </div>

        {/* Notifications */}
        <div style={{ position: "relative" }} ref={notifRef}>
          <button
            className="icon-btn notification-btn"
            onClick={() => { setShowNotif(p => !p); setShowProfile(false); }}
            aria-label="Notifications"
          >
            <Bell size={18} />
            {notifCount > 0 && <span className="notif-badge" />}
          </button>

          {showNotif && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <h4>🔔 Notifications {notifCount > 0 && `(${notifCount})`}</h4>
                <button className="notif-clear" onClick={handleClearNotif}>Mark all read</button>
              </div>
              {notifications.map((n) => (
                <div key={n.id} className="notif-item">
                  <div className={`notif-dot ${n.color}`} />
                  <div>
                    <div className="notif-text">{n.text}</div>
                    <div className="notif-time">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === "light" ? "Switch to Dark" : "Switch to Light"}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Profile */}
        <div style={{ position: "relative" }} ref={profileRef}>
          <button
            className="admin-profile"
            onClick={() => { setShowProfile(p => !p); setShowNotif(false); }}
            aria-label="Profile menu"
          >
            <div className="profile-avatar">AU</div>
            <div className="profile-info">
              <h4>Admin User</h4>
              <span>Administrator</span>
            </div>
            <ChevronDown size={14} style={{ color: "var(--text-muted)", marginLeft: "2px", transform: showProfile ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>

          {showProfile && (
            <div className="profile-dropdown">
              <div style={{ padding: "12px 14px 8px", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)" }}>Admin User</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>admin@adminpro.com</div>
              </div>
              {[
                { icon: User, label: "My Profile" },
                { icon: Settings, label: "Settings" },
                { icon: CreditCard, label: "Billing" },
                { icon: HelpCircle, label: "Help & Support" },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="profile-dropdown-item">
                  <Icon size={14} />
                  {label}
                </button>
              ))}
              <div className="profile-dropdown-divider" />
              <button className="profile-dropdown-item danger">
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;