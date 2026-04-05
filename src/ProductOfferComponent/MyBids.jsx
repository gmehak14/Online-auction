import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const MyBids = () => {
  const navigate  = useNavigate();
  const customer  = JSON.parse(sessionStorage.getItem("active-customer"));
  const jwtToken  = sessionStorage.getItem("customer-jwtToken");
  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (!customer) { navigate("/user/login"); return; }
    fetchBids();
  }, []);

  const fetchBids = () => {
    axios.get(`http://localhost:8080/api/product/offer/fetch/user?userId=${customer.id}`)
      .then(res => setBids(res.data.offers || []))
      .catch(() => {});
  };

  const deleteBid = (bidId) => {
    if (!window.confirm("Are you sure you want to delete this bid?")) return;

    fetch(`http://localhost:8080/api/product/offer/${bidId}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + jwtToken },
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          toast.success("Bid deleted!", { position: "top-center", autoClose: 1000 });
          fetchBids();
        } else {
          toast.error(res.message, { position: "top-center", autoClose: 2000 });
        }
      });
  };

  return (
    <div className="mt-3">
      <div className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg" style={{ height: "40rem" }}>

        {/* Header */}
        <div className="card-header custom-bg-text text-center bg-color" style={{ borderRadius: "1em", height: "50px" }}>
          <h4>My Bids</h4>
        </div>

        {/* Table */}
        <div className="card-body" style={{ overflowY: "auto" }}>
          {bids.length === 0 ? (
            <div className="text-center mt-5">
              <h5 className="text-color">You have not placed any bids yet.</h5>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover text-color text-center">
                <thead className="table-bordered border-color bg-color custom-bg-text">
                  <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Your Bid (&#8377;)</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bids.map(bid => (
                    <tr key={bid.id}>
                      <td>
                        <img
                          src={"http://localhost:8080/api/product/" + bid.product?.image1}
                          alt="product"
                          style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "8px" }}
                          onError={(e) => { e.target.src = "https://via.placeholder.com/70?text=?"; }}
                        />
                      </td>
                      <td><b>{bid.product?.name}</b></td>
                      <td>{bid.product?.category?.name}</td>
                      <td><b>&#8377;{bid.amount}</b></td>
                      <td>
                        {bid.status === "Won"     && <span className="badge bg-success">Won 🏆</span>}
                        {bid.status === "Pending" && <span className="badge bg-warning text-dark">Pending</span>}
                        {bid.status === "Lost"    && <span className="badge bg-danger">Lost</span>}
                      </td>
                      <td>
                        {bid.status === "Pending" && (
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteBid(bid.id)}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
      <ToastContainer />
    </div>
  );
};

export default MyBids;
