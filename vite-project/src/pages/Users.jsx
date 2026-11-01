import { useState } from "react";
import { Search, UserPlus, Trash2, X } from "lucide-react";
import { initialUsers } from "../data/usersData";

const avatarColors = [
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#0ea5e9,#06b6d4)",
  "linear-gradient(135deg,#f59e0b,#f97316)",
  "linear-gradient(135deg,#10b981,#059669)",
  "linear-gradient(135deg,#ec4899,#f43f5e)",
];

function Users() {
  const [users, setUsers]   = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });

  const filtered = users.filter((u) =>
    `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e) => {
    e.preventDefault();
    setUsers((prev) => [...prev, { id: Date.now(), ...newUser, status: "Active" }]);
    setNewUser({ name: "", email: "", role: "User" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="users-page">

      {/* Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1>User Management</h1>
          <p>Manage all registered users from one place.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)} style={{ fontSize: "13px" }}>
            {showForm ? <X size={15} /> : <UserPlus size={15} />}
            {showForm ? "Cancel" : "Add User"}
          </button>
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="user-form-card">
          <h3>➕ Add New User</h3>
          <form className="user-form" onSubmit={handleAdd}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Rahul Kumar"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                className="form-input"
                type="email"
                placeholder="e.g. rahul@gmail.com"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group" style={{ maxWidth: "180px" }}>
              <label>Role</label>
              <select
                className="form-input"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option>User</option>
                <option>Admin</option>
                <option>Editor</option>
              </select>
            </div>
            <div className="form-group" style={{ justifyContent: "flex-end", maxWidth: "140px" }}>
              <label style={{ visibility: "hidden" }}>btn</label>
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                Save User
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toolbar */}
      <div className="users-toolbar">
        <div className="users-search">
          <Search size={15} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <p className="users-count">
          Showing <span>{filtered.length}</span> of <span>{users.length}</span> users
        </p>
      </div>

      {/* Table */}
      <div className="users-table-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((user, i) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-avatar-cell">
                        <div className="user-avatar" style={{ background: avatarColors[i % avatarColors.length] }}>
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">#{user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "var(--text-secondary)", fontSize: "13px" }}>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-icon"
                        onClick={() => handleDelete(user.id)}
                        aria-label={`Delete ${user.name}`}
                        title="Delete user"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <div className="empty-state">
                      <Search size={28} />
                      <p>No users found for "{search}"</p>
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

export default Users;