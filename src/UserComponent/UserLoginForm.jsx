import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const UserLoginForm = () => {
  const navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
  });

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const loginAction = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.success) {
          // Save user and token based on role
          if (res.user.role === "Admin") {
            sessionStorage.setItem("active-admin", JSON.stringify(res.user));
            sessionStorage.setItem("admin-jwtToken", res.jwtToken);
            toast.success("Welcome Admin " + res.user.firstName + "!", { position: "top-center", autoClose: 1000 });
            setTimeout(() => navigate("/admin/products"), 1000);
          } else {
            sessionStorage.setItem("active-customer", JSON.stringify(res.user));
            sessionStorage.setItem("customer-jwtToken", res.jwtToken);
            toast.success("Welcome " + res.user.firstName + "!", { position: "top-center", autoClose: 1000 });
            setTimeout(() => navigate("/home"), 1000);
          }
        } else {
          toast.error(res.message, { position: "top-center", autoClose: 2000 });
        }
      })
      .catch(() => {
        toast.error("Server is down. Please try again!", { position: "top-center", autoClose: 2000 });
      });
  };

  return (
    <div className="mt-4 d-flex align-items-center justify-content-center">
      <div className="form-card border-color custom-bg" style={{ width: "25rem" }}>
        <div className="container-fluid">

          {/* Header */}
          <div
            className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
            style={{ borderRadius: "1em", height: "45px" }}
          >
            <h4 className="card-title">User Login</h4>
          </div>

          {/* Form */}
          <div className="card-body mt-3">
            <form onSubmit={loginAction}>

              <div className="mb-3 text-color">
                <label className="form-label"><b>Email Address</b></label>
                <input
                  type="email"
                  className="form-control"
                  name="emailId"
                  placeholder="Enter your email"
                  onChange={handleUserInput}
                  value={loginRequest.emailId}
                  required
                />
              </div>

              <div className="mb-3 text-color">
                <label className="form-label"><b>Password</b></label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleUserInput}
                  value={loginRequest.password}
                  autoComplete="on"
                  required
                />
              </div>

              <div className="d-flex justify-content-center mb-2">
                <button type="submit" className="btn bg-color custom-bg-text">
                  Login
                </button>
              </div>

              <div className="text-center mb-3">
                <span className="text-color">Don't have an account? </span>
                <Link to="/user/customer/register" className="text-color">
                  <b>Register here</b>
                </Link>
              </div>

            </form>
            <ToastContainer />
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;
