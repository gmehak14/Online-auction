// FILE: AdminDashboard.jsx
// Admin ka dashboard - 2 features:
//   1. Stats cards (products, users, bids, orders)
//   2. Manage Users (activate/deactivate)
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AdminDashboard = () => {
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const token = sessionStorage.getItem("admin-jwtToken");

  const [stats, setStats] = useState({ products: 0, users: 0, activeBids: 0, orders: 0 });
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("stats");

  useEffect(() => {
    if (!admin) { window.location.href = "/user/login"; return; }
    fetchStats();
    fetchUsers();
  }, []);

  const fetchStats = () => {
    axios.get("http://localhost:8080/api/admin/stats")
      .then(res => { if (res.data.success) setStats(res.data.stats); })
      .catch(() => {});
  };

  const fetchUsers = () => {
    axios.get("http://localhost:8080/api/admin/users")
      .then(res => { if (res.data.success) setUsers(res.data.users); })
      .catch(() => toast.error("Users load nahi hue"));
  };

  const toggleUserStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    axios.put("http://localhost:8080/api/admin/user/status", { userId, status: newStatus })
      .then(res => {
        if (res.data.success) {
          toast.success(`User ${newStatus} kar diya!`);
          fetchUsers();
        }
      })
      .catch(() => toast.error("Status update nahi hua"));
  };

  if (!admin) return null;

  return (
    <div className="container mt-4 mb-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 style={{ color: "#6f42c1" }}>⚙️ Admin Dashboard</h3>
        <span className="badge bg-primary fs-6">Welcome, {admin.firstName}!</span>
      </div>

      {/* Tab Buttons */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        <button className={`btn ${activeTab === "stats" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("stats")}>📊 Stats</button>
        <button className={`btn ${activeTab === "users" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("users")}>👥 Manage Users</button>
        <a href="/admin/products" className="btn btn-outline-success">📦 Products</a>
        <a href="/admin/categories" className="btn btn-outline-warning">🏷️ Categories</a>
      </div>

      {/* TAB 1: Stats */}
      {activeTab === "stats" && (
        <div>
          <div className="row mb-4">
            {[
              { label: "Total Products", value: stats.products, icon: "📦", color: "#6f42c1" },
              { label: "Customers", value: stats.users, icon: "👥", color: "#28a745" },
              { label: "Total Bids", value: stats.activeBids, icon: "📢", color: "#fd7e14" },
              { label: "Total Orders", value: stats.orders, icon: "🛒", color: "#17a2b8" },
            ].map((s, i) => (
              <div key={i} className="col-md-3 col-6 mb-3">
                <div className="card text-center shadow-sm h-100"
                  style={{ borderTop: `4px solid ${s.color}` }}>
                  <div className="card-body">
                    <div style={{ fontSize: "2rem" }}>{s.icon}</div>
                    <h3 className="fw-bold" style={{ color: s.color }}>{s.value}</h3>
                    <p className="text-muted small mb-0">{s.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <h5>🚀 Quick Actions</h5>
              <div className="d-flex gap-3 flex-wrap mt-3">
                <a href="/admin/products" className="btn btn-outline-success">➕ Add Product</a>
                <a href="/admin/categories" className="btn btn-outline-warning">➕ Add Category</a>
                <button className="btn btn-outline-info" onClick={() => { fetchStats(); toast.info("Stats refresh ho gaye!"); }}>
                  🔄 Refresh Stats
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Manage Users */}
      {activeTab === "users" && (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>👥 All Customers</h5>
              <button className="btn btn-sm btn-outline-secondary" onClick={fetchUsers}>🔄 Refresh</button>
            </div>

            {users.length === 0 ? (
              <p className="text-muted text-center py-4">Koi customer nahi mila</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th><th>Naam</th><th>Email</th><th>Wallet</th><th>Status</th><th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, i) => (
                      <tr key={user.id}>
                        <td>{i + 1}</td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.emailId}</td>
                        <td>₹{(user.walletAmount || 0).toFixed(2)}</td>
                        <td>
                          <span className={`badge ${user.status === "Active" ? "bg-success" : "bg-danger"}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className={`btn btn-sm ${user.status === "Active" ? "btn-outline-danger" : "btn-outline-success"}`}
                            onClick={() => toggleUserStatus(user.id, user.status)}>
                            {user.status === "Active" ? "🚫 Deactivate" : "✅ Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
export default AdminDashboard;
