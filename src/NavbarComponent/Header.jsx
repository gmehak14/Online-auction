import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../images/e_logo.png";
import axios from "axios";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const admin    = JSON.parse(sessionStorage.getItem("active-admin"));

  useEffect(() => {
    axios.get("http://localhost:8080/api/category/fetch/all")
      .then(res => setCategories(res.data.categories || []))
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/home"), 800);
  };

  return (
    <nav className="navbar navbar-expand-lg custom-bg text-color">
      <div className="container-fluid">

        <Link to="/" className="navbar-brand">
          <img src={logo} width="90" height="auto" className="d-inline-block align-top" alt="logo" />
        </Link>

        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          {/* Left - Categories + About + Contact */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-color" role="button" data-bs-toggle="dropdown">
                <b>Category</b>
              </a>
              <ul className="dropdown-menu custom-bg">
                <li>
                  <Link to="/home" className="dropdown-item text-center text-color"><b>All Products</b></Link>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link to={`/product/category/${cat.id}/${cat.name}`}
                      className="dropdown-item text-center text-color">
                      <b>{cat.name}</b>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* NEW: About Us */}
            <li className="nav-item">
              <Link to="/aboutus" className="nav-link">
                <b className="text-color">About Us</b>
              </Link>
            </li>

            {/* NEW: Contact Us */}
            <li className="nav-item">
              <Link to="/contactus" className="nav-link">
                <b className="text-color">Contact Us</b>
              </Link>
            </li>
          </ul>

          {/* Right side */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-3">

            {/* NOT LOGGED IN */}
            {!customer && !admin && (
              <>
                <li className="nav-item">
                  <Link to="/user/customer/register" className="nav-link">
                    <b className="text-color">Register</b>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/user/login" className="nav-link">
                    <b className="text-color">Login</b>
                  </Link>
                </li>
              </>
            )}

            {/* CUSTOMER LOGGED IN */}
            {customer && (
              <>
                <li className="nav-item">
                  <Link to="/customer/bid/all" className="nav-link">
                    <b className="text-color">My Bids</b>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/customer/order" className="nav-link">
                    <b className="text-color">My Orders</b>
                  </Link>
                </li>
                {/* NEW: Wallet */}
                <li className="nav-item">
                  <Link to="/customer/wallet" className="nav-link">
                    <b className="text-color">💰 Wallet</b>
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link">
                    <b className="text-color">Hi, {customer.firstName}!</b>
                  </span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}
                    style={{ textDecoration: "none" }}>
                    <b className="text-color">Logout</b>
                  </button>
                </li>
              </>
            )}

            {/* ADMIN LOGGED IN */}
            {admin && (
              <>
                {/* NEW: Dashboard link */}
                <li className="nav-item">
                  <Link to="/admin/dashboard" className="nav-link">
                    <b className="text-color">Dashboard</b>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/products" className="nav-link">
                    <b className="text-color">Products</b>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/categories" className="nav-link">
                    <b className="text-color">Categories</b>
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link">
                    <b className="text-color">Admin: {admin.firstName}</b>
                  </span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}
                    style={{ textDecoration: "none" }}>
                    <b className="text-color">Logout</b>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
