import { useState } from "react";
import { User, Mail, Lock, Save, Bell, Shield, Globe, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Settings() {
  const { theme, toggleTheme } = useTheme();

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@adminpro.com",
    password: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    orders: true,
    security: false,
    marketing: false,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setProfile((p) => ({ ...p, password: "" }));
  };

  return (
    <div className="settings-page">

      {/* Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1>Account Settings</h1>
          <p>Manage your profile, notifications, and preferences.</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="settings-card">
        <div className="settings-card-title">Profile Information</div>
        <div className="settings-card-desc">Update your personal details and login credentials.</div>

        <form onSubmit={handleSave}>
          {/* Avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{
              width: "64px", height: "64px", borderRadius: "50%",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: "22px", fontWeight: 800
            }}>
              AU
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>Admin User</div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>Super Administrator</div>
              <button type="button" className="btn btn-ghost" style={{ fontSize: "12px", padding: "4px 10px", marginTop: "6px" }}>
                Change Photo
              </button>
            </div>
          </div>

          <div className="settings-field">
            <label>Full Name</label>
            <div className="settings-input">
              <User size={16} />
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="settings-field">
            <label>Email Address</label>
            <div className="settings-input">
              <Mail size={16} />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="settings-field">
            <label>New Password</label>
            <div className="settings-input">
              <Lock size={16} />
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                placeholder="Leave blank to keep current"
                minLength={8}
              />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button type="submit" className="btn btn-primary">
              <Save size={15} />
              Save Changes
            </button>
            {saved && (
              <span style={{ fontSize: "13px", color: "var(--green-text)", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px" }}>
                ✅ Saved successfully!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Notifications Card */}
      <div className="settings-card">
        <div className="settings-card-title">Notification Preferences</div>
        <div className="settings-card-desc">Control which notifications you receive.</div>

        {[
          { key: "email",     label: "Email Notifications",   desc: "Receive daily summary to your inbox",   icon: Mail   },
          { key: "orders",    label: "Order Alerts",           desc: "Get notified on new orders",           icon: Bell   },
          { key: "security",  label: "Security Alerts",        desc: "Login attempts and account changes",   icon: Shield },
          { key: "marketing", label: "Marketing Updates",      desc: "Product updates and promotions",       icon: Globe  },
        ].map(({ key, label, desc, icon: Icon }) => (
          <div key={key} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 0", borderBottom: "1px solid var(--border-subtle)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "8px",
                background: "var(--bg)", border: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--text-secondary)"
              }}>
                <Icon size={16} />
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>{label}</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{desc}</div>
              </div>
            </div>
            {/* Toggle Switch */}
            <button
              type="button"
              onClick={() => setNotifications((n) => ({ ...n, [key]: !n[key] }))}
              style={{
                width: "44px", height: "24px",
                borderRadius: "12px",
                border: "none",
                background: notifications[key] ? "linear-gradient(135deg,#2563eb,#4f46e5)" : "var(--border)",
                cursor: "pointer",
                position: "relative",
                transition: "all 0.3s ease",
                flexShrink: 0
              }}
              aria-label={`Toggle ${label}`}
            >
              <div style={{
                position: "absolute",
                top: "3px",
                left: notifications[key] ? "22px" : "3px",
                width: "18px", height: "18px",
                borderRadius: "50%",
                background: "white",
                boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
                transition: "left 0.3s cubic-bezier(0.4,0,0.2,1)"
              }} />
            </button>
          </div>
        ))}
      </div>

      {/* Appearance Card */}
      <div className="settings-card">
        <div className="settings-card-title">Appearance</div>
        <div className="settings-card-desc">Customize the look and feel of your dashboard.</div>

        <div style={{ display: "flex", gap: "12px" }}>
          {[
            { mode: "light", icon: Sun,  label: "Light Mode" },
            { mode: "dark",  icon: Moon, label: "Dark Mode"  },
          ].map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              type="button"
              onClick={() => mode !== theme && toggleTheme()}
              style={{
                flex: 1, padding: "16px",
                border: `2px solid ${theme === mode ? "var(--brand-500)" : "var(--border)"}`,
                borderRadius: "12px",
                background: theme === mode ? "var(--brand-50)" : "var(--input-bg)",
                cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                transition: "all 0.2s ease",
                color: theme === mode ? "var(--brand-600)" : "var(--text-secondary)",
                fontFamily: "var(--font)"
              }}
            >
              <Icon size={22} />
              <span style={{ fontSize: "13px", fontWeight: 600 }}>{label}</span>
              {theme === mode && (
                <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--brand-600)" }}>ACTIVE</span>
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Settings;