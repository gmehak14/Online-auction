import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AdminCategories = () => {
  const navigate = useNavigate();
  const admin    = JSON.parse(sessionStorage.getItem("active-admin"));
  const jwtToken = sessionStorage.getItem("admin-jwtToken");

  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm]     = useState(false);
  const [form, setForm]             = useState({ name: "", description: "" });

  useEffect(() => {
    if (!admin) { navigate("/user/login"); return; }
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get("http://localhost:8080/api/category/fetch/all")
      .then(res => setCategories(res.data.categories || []));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/category/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          toast.success("Category added!", { position: "top-center", autoClose: 1000 });
          setForm({ name: "", description: "" });
          setShowForm(false);
          fetchCategories();
        } else {
          toast.error(res.message);
        }
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this category?")) return;
    fetch(`http://localhost:8080/api/category/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + jwtToken },
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) { toast.success("Category deleted!"); fetchCategories(); }
      });
  };

  return (
    <div className="mt-3 ms-2 me-2">

      {/* Page Header */}
      <div className="card-header bg-color custom-bg-text text-center mb-3" style={{ borderRadius: "1em", height: "50px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1rem" }}>
        <h4 className="mb-0">Manage Categories</h4>
        <div>
          <Link to="/admin/products" className="btn btn-sm btn-light me-2">Manage Products</Link>
          <button className="btn btn-sm btn-warning" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Add Category"}
          </button>
        </div>
      </div>

      {/* Add Category Form */}
      {showForm && (
        <div className="card form-card custom-bg shadow mb-4 p-3" style={{ maxWidth: "500px" }}>
          <h5 className="text-color mb-3">Add New Category</h5>
          <form onSubmit={handleAdd}>
            <div className="mb-3">
              <label className="form-label text-color"><b>Category Name</b></label>
              <input
                className="form-control"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                placeholder="e.g. Electronics"
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-color"><b>Description</b></label>
              <textarea
                className="form-control"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3}
                placeholder="Category description..."
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn bg-color custom-bg-text">Save Category</button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Table */}
      <div className="card form-card custom-bg shadow-lg" style={{ height: "40rem" }}>
        <div className="card-body" style={{ overflowY: "auto" }}>
          {categories.length === 0 ? (
            <div className="text-center mt-5">
              <h5 className="text-color">No categories yet. Add one above!</h5>
            </div>
          ) : (
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr key={cat.id}>
                    <td>{index + 1}</td>
                    <td><b>{cat.name}</b></td>
                    <td>{cat.description || "-"}</td>
                    <td><span className="badge bg-success">{cat.status}</span></td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminCategories;
