import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewMyOrders = () => {
  const navigate = useNavigate();
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const jwtToken = sessionStorage.getItem("customer-jwtToken");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!customer) { navigate("/user/login"); return; }

    axios.get(`http://localhost:8080/api/order/fetch/user-wise?userId=${customer.id}`, {
      headers: { Authorization: "Bearer " + jwtToken },
    })
      .then(res => setOrders(res.data.orders || []))
      .catch(() => {});
  }, []);

  return (
    <div className="mt-3">
      <div className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg" style={{ height: "40rem" }}>

        {/* Header */}
        <div className="card-header custom-bg-text text-center bg-color" style={{ borderRadius: "1em", height: "50px" }}>
          <h4>My Orders</h4>
        </div>

        {/* Table */}
        <div className="card-body" style={{ overflowY: "auto" }}>
          {orders.length === 0 ? (
            <div className="text-center mt-5">
              <h5 className="text-color">You have no orders yet.</h5>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover text-color text-center">
                <thead className="table-bordered border-color bg-color custom-bg-text">
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Winning Bid (&#8377;)</th>
                    <th>Order Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td><b>#{order.id}</b></td>
                      <td>
                        <img
                          src={"http://localhost:8080/api/product/" + order.product?.image1}
                          alt="product"
                          style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "8px" }}
                          onError={(e) => { e.target.src = "https://via.placeholder.com/70?text=?"; }}
                        />
                      </td>
                      <td><b>{order.product?.name}</b></td>
                      <td>{order.product?.category?.name}</td>
                      <td><b>&#8377;{order.offer?.amount}</b></td>
                      <td>{order.orderDate}</td>
                      <td>
                        <span className={order.status === "Delivered" ? "badge bg-success" : "badge bg-warning text-dark"}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ViewMyOrders;
