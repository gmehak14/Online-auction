import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ProductCard from "./ProductCard";
import ProductOffers from "../ProductOfferComponent/ProductOffers";

const Product = () => {
  const { productId, categoryId } = useParams();
  const navigate = useNavigate();

  const customer      = JSON.parse(sessionStorage.getItem("active-customer"));
  const jwtToken      = sessionStorage.getItem("customer-jwtToken");

  const [product, setProduct]   = useState(null);
  const [related, setRelated]   = useState([]);
  const [amount, setAmount]     = useState("");

  useEffect(() => {
    // Fetch product details
    axios.get(`http://localhost:8080/api/product/fetch?productId=${productId}`)
      .then(res => setProduct(res.data.product))
      .catch(() => toast.error("Product not found!"));

    // Fetch related products from same category
    axios.get(`http://localhost:8080/api/product/fetch/category-wise?categoryId=${categoryId}`)
      .then(res => setRelated(res.data.products || []))
      .catch(() => {});
  }, [productId]);

  const placeBid = (e) => {
    e.preventDefault();

    if (!customer) {
      toast.error("Please login as Customer to place a bid!", { position: "top-center", autoClose: 2000 });
      setTimeout(() => navigate("/user/login"), 1500);
      return;
    }

    fetch("http://localhost:8080/api/product/offer/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify({
        amount: parseFloat(amount),
        userId: customer.id,
        productId: parseInt(productId),
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          toast.success(res.message, { position: "top-center", autoClose: 1000 });
          setAmount("");
          setTimeout(() => navigate("/customer/bid/all"), 1500);
        } else {
          toast.error(res.message, { position: "top-center", autoClose: 2000 });
        }
      })
      .catch(() => toast.error("Server is down!", { position: "top-center", autoClose: 2000 }));
  };

  if (!product) {
    return <div className="text-center mt-5"><h4>Loading product...</h4></div>;
  }

  return (
    <div className="container-fluid mt-2">
      <div className="row">

        {/* Left - Product Image */}
        <div className="col-sm-3 mt-2">
          <div className="card form-card custom-bg shadow-lg">
            <img
              src={"http://localhost:8080/api/product/" + product.image1}
              className="img-fluid rounded"
              alt={product.name}
              style={{ maxHeight: "350px", objectFit: "cover" }}
              onError={(e) => { e.target.src = "https://via.placeholder.com/350?text=No+Image"; }}
            />
          </div>
        </div>

        {/* Middle - Product Info + Bid Form */}
        <div className="col-sm-6 mt-2">
          <div className="card form-card custom-bg shadow-lg">

            {/* Header */}
            <div className="card-header bg-color custom-bg-text" style={{ borderRadius: "1em", height: "50px" }}>
              <h4 className="card-title">{product.name}</h4>
            </div>

            {/* Description */}
            <div className="card-body text-color">
              <h5>Description:</h5>
              <p>{product.description}</p>

              <div className="d-flex justify-content-between mt-3">
                <div>
                  <h5>Category:</h5>
                  <h6>{product.category?.name}</h6>
                </div>
                <div>
                  <h5>Status:</h5>
                  <h6 className={product.status === "Available" ? "text-success" : "text-danger"}>
                    {product.status}
                  </h6>
                </div>
                <div>
                  <h5>Quantity:</h5>
                  <h6>{product.quantity > 0 ? product.quantity : <span className="text-danger">Out of Stock</span>}</h6>
                </div>
              </div>
            </div>

            {/* Footer - Price + Bid */}
            <div className="card-footer custom-bg">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="text-color">Asking Price: &#8377;{product.price}</h5>
              </div>

              {/* Bid Form - only show if product is available */}
              {product.status === "Available" ? (
                <div className="d-flex justify-content-center">
                  <form className="row g-3" onSubmit={placeBid}>
                    <div className="col-auto">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter bid amount..."
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min={product.price + 1}
                        required
                      />
                    </div>
                    <div className="col-auto">
                      <button type="submit" className="btn bg-color custom-bg-text">
                        Place Bid
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center">
                  <h5 className="text-danger">This product has been sold.</h5>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right - All Bids */}
        <div className="col-sm-3 mt-2">
          <ProductOffers productId={productId} />
        </div>

      </div>

      {/* Related Products */}
      <div className="row mt-4">
        <div className="col-md-12">
          <h4 className="text-color">Related Products:</h4>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {related
              .filter(p => p.id !== parseInt(productId))
              .map(p => <ProductCard item={p} key={p.id} />)}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Product;
