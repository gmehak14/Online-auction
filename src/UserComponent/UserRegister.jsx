import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNo: "",
  });

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveUser = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.success) {
          toast.success("Registered successfully! Please login.", {
            position: "top-center", autoClose: 1000,
          });
          setTimeout(() => navigate("/user/login"), 1000);
        } else {
          toast.error(res.message, { position: "top-center", autoClose: 2000 });
        }
      })
      .catch(() => {
        toast.error("Server is down. Please try again!", {
          position: "top-center", autoClose: 2000,
        });
      });
  };

  return (
    <div className="mt-2 d-flex align-items-center justify-content-center ms-2 me-2 mb-2">
      <div className="form-card border-color text-color custom-bg" style={{ width: "50rem" }}>
        <div className="container-fluid">

          {/* Header */}
          <div
            className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
            style={{ borderRadius: "1em", height: "45px" }}
          >
            <h5 className="card-title">Customer Registration</h5>
          </div>

          {/* Form */}
          <div className="card-body mt-3">
            <form className="row g-3" onSubmit={saveUser}>

              <div className="col-md-6 mb-3 text-color">
                <label className="form-label"><b>First Name</b></label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  onChange={handleUserInput}
                  value={user.firstName}
                  required
                />
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label className="form-label"><b>Last Name</b></label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  onChange={handleUserInput}
                  value={user.lastName}
                  required
                />
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label className="form-label"><b>Email Address</b></label>
                <input
                  type="email"
                  className="form-control"
                  name="emailId"
                  onChange={handleUserInput}
                  value={user.emailId}
                  required
                />
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label className="form-label"><b>Password</b></label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handleUserInput}
                  value={user.password}
                  required
                />
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label className="form-label"><b>Phone Number</b></label>
                <input
                  type="number"
                  className="form-control"
                  name="phoneNo"
                  onChange={handleUserInput}
                  value={user.phoneNo}
                  required
                />
              </div>

              <div className="col-md-12 d-flex justify-content-center mt-2">
                <input
                  type="submit"
                  className="btn bg-color custom-bg-text"
                  value="Register Now"
                />
              </div>

              <div className="text-center mb-2">
                <span className="text-color">Already have an account? </span>
                <Link to="/user/login" className="text-color"><b>Login here</b></Link>
              </div>

            </form>
            <ToastContainer />
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserRegister;
