import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AdminProducts = () => {
  const navigate = useNavigate();
  const admin    = JSON.parse(sessionStorage.getItem("active-admin"));
  const jwtToken = sessionStorage.getItem("admin-jwtToken");

  const [products, setProducts]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm]     = useState(false);
  const [image, setImage]           = useState(null);
  const [form, setForm] = useState({
    name: "", description: "", price: "", quantity: "", categoryId: "",
  });

  useEffect(() => {
    if (!admin) { navigate("/user/login"); return; }
    fetchAll();
  }, []);

  const fetchAll = () => {
    axios.get("http://localhost:8080/api/product/fetch/all?status=")
      .then(res => setProducts(res.data.products || []));
    axios.get("http://localhost:8080/api/category/fetch/all")
      .then(res => setCategories(res.data.categories || []));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!image) { toast.error("Please select an image!"); return; }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);
    formData.append("categoryId", form.categoryId);
    formData.append("adminId", admin.id);
    formData.append("image", image);

    fetch("http://localhost:8080/api/product/add", {
      method: "POST",
      headers: { Authorization: "Bearer " + jwtToken },
      body: formData,
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          toast.success("Product added successfully!", { position: "top-center", autoClose: 1000 });
          setForm({ name: "", description: "", price: "", quantity: "", categoryId: "" });
          setImage(null);
          setShowForm(false);
          fetchAll();
        } else {
          toast.error(res.message, { position: "top-center", autoClose: 2000 });
        }
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;
    fetch(`http://localhost:8080/api/product/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + jwtToken },
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) { toast.success("Product deleted!"); fetchAll(); }
      });
  };

  return (
    <div className="mt-3 ms-2 me-2">

      {/* Page Header */}
      <div className="card-header bg-color custom-bg-text text-center mb-3" style={{ borderRadius: "1em", height: "50px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1rem" }}>
        <h4 className="mb-0">Manage Products</h4>
        <div>
          <Link to="/admin/categories" className="btn btn-sm btn-light me-2">Manage Categories</Link>
          <button className="btn btn-sm btn-warning" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Add Product"}
          </button>
        </div>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <div className="card form-card custom-bg shadow mb-4 p-3">
          <h5 className="text-color mb-3">Add New Product</h5>
          <form className="row g-3" onSubmit={handleAdd}>
            <div className="col-md-6">
              <label className="form-label text-color"><b>Product Name</b></label>
              <input name="name" className="form-control" value={form.name} onChange={handleChange} required placeholder="e.g. iPhone 13" />
            </div>
            <div className="col-md-6">
              <label className="form-label text-color"><b>Category</b></label>
              <select name="categoryId" className="form-control" value={form.categoryId} onChange={handleChange} required>
                <option value="">-- Select Category --</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label text-color"><b>Starting Price (&#8377;)</b></label>
              <input name="price" type="number" className="form-control" value={form.price} onChange={handleChange} required placeholder="500" />
            </div>
            <div className="col-md-6">
              <label className="form-label text-color"><b>Quantity</b></label>
              <input name="quantity" type="number" className="form-control" value={form.quantity} onChange={handleChange} required placeholder="1" />
            </div>
            <div className="col-md-12">
              <label className="form-label text-color"><b>Description</b></label>
              <textarea name="description" className="form-control" value={form.description} onChange={handleChange} required rows={3} placeholder="Product description..." />
            </div>
            <div className="col-md-12">
              <label className="form-label text-color"><b>Product Image</b></label>
              <input type="file" className="form-control" accept="image/*" onChange={e => setImage(e.target.files[0])} required />
            </div>
            <div className="col-md-12 d-flex justify-content-center">
              <button type="submit" className="btn bg-color custom-bg-text">Save Product</button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="card form-card custom-bg shadow-lg" style={{ height: "40rem" }}>
        <div className="card-body" style={{ overflowY: "auto" }}>
          <table className="table table-hover text-color text-center">
            <thead className="table-bordered border-color bg-color custom-bg-text">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price (&#8377;)</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={"http://localhost:8080/api/product/" + p.image1}
                      alt={p.name}
                      style={{ width: "65px", height: "65px", objectFit: "cover", borderRadius: "8px" }}
                      onError={(e) => { e.target.src = "https://via.placeholder.com/65?text=?"; }}
                    />
                  </td>
                  <td><b>{p.name}</b></td>
                  <td>{p.category?.name}</td>
                  <td><b>{p.price}</b></td>
                  <td>{p.quantity}</td>
                  <td>
                    <span className={p.status === "Available" ? "badge bg-success" : p.status === "Sold" ? "badge bg-danger" : "badge bg-secondary"}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    {p.status !== "Deleted" && (
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminProducts;
