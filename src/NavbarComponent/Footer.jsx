import { Link } from "react-router-dom";

const Footer = () => {
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const isLoggedIn = customer || admin;

  return (
    <footer style={{ background: "#1a1a2e", color: "#eee", marginTop: "60px" }}>

      <div className="container py-5">
        <div className="row g-4">

          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <h5 style={{ color: "#a78bfa", fontWeight: "700", fontSize: "1.2rem" }}>
              🏷️ BidZone
            </h5>
            <p style={{ color: "#aaa", fontSize: "0.9rem", lineHeight: "1.8", marginTop: "12px" }}>
             Welcome to BidZone — where sellers list products and buyers place bids. The highest bidder wins. Explore, bid smart, and win big!
            </p>
            <div className="d-flex gap-3 mt-3">
              {["📘", "🐦", "📸", "▶️"].map((icon, i) => (
                <a key={i} href="#!" style={{
                  fontSize: "1.3rem", textDecoration: "none",
                  background: "#2d2d44", padding: "6px 10px",
                  borderRadius: "8px"
                }}>{icon}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 style={{ color: "#a78bfa", fontWeight: "600", marginBottom: "16px", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>
              Quick Links
            </h6>
            <ul className="list-unstyled" style={{ fontSize: "0.9rem" }}>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/home" style={{ color: "#ccc", textDecoration: "none" }}>› Home</Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/aboutus" style={{ color: "#ccc", textDecoration: "none" }}>› About Us</Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/contactus" style={{ color: "#ccc", textDecoration: "none" }}>› Contact Us</Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/home" style={{ color: "#ccc", textDecoration: "none" }}>› All Products</Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 style={{ color: "#a78bfa", fontWeight: "600", marginBottom: "16px", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>
              Account
            </h6>
            <ul className="list-unstyled" style={{ fontSize: "0.9rem" }}>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/user/login" style={{ color: "#ccc", textDecoration: "none" }}>› Login</Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/user/customer/register" style={{ color: "#ccc", textDecoration: "none" }}>› Register</Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/customer/bid/all" style={{ color: "#ccc", textDecoration: "none" }}>› My Bids</Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/customer/order" style={{ color: "#ccc", textDecoration: "none" }}>› My Orders</Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/customer/wallet" style={{ color: "#ccc", textDecoration: "none" }}>› My Wallet</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6">
            <h6 style={{ color: "#a78bfa", fontWeight: "600", marginBottom: "16px", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>
              Contact Us
            </h6>
            <div className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: "0.9rem", color: "#ccc" }}>
              <span>🕐</span><span>Mon–Sat, 10am – 6pm</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: "0.9rem", color: "#ccc" }}>
              <span>📍</span><span>New Delhi, India</span>
            </div>

            {!isLoggedIn && (
              <Link to="/user/login">
                <button className="btn btn-sm mt-3" style={{
                  background: "#6f42c1", color: "white",
                  border: "none", borderRadius: "8px", padding: "8px 20px"
                }}>
                  🔐 Login Now
                </button>
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ background: "#12122a", padding: "16px 0" }}>
        <div className="container d-flex justify-content-between align-items-center flex-wrap gap-2">
          <p className="mb-0" style={{ color: "#888", fontSize: "0.85rem" }}>
            © 2025 BidZone. All rights reserved.
          </p>
          <div className="d-flex gap-3" style={{ fontSize: "0.85rem" }}>
            <Link to="/aboutus" style={{ color: "#888", textDecoration: "none" }}>About</Link>
            <Link to="/contactus" style={{ color: "#888", textDecoration: "none" }}>Contact</Link>
            <span style={{ color: "#888" }}>Privacy Policy</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
