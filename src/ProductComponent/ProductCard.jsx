import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  // Short description - max 50 chars
  const shortDesc = (text) =>
    text && text.length > 50 ? text.substring(0, 50) + "..." : text;

  return (
    <div className="col">
      <div className="card product-card rounded-card custom-bg h-100 shadow-lg">

        {/* Product Image */}
        <img
          src={"http://localhost:8080/api/product/" + item.image1}
          className="card-img-top img-fluid rounded"
          alt={item.name}
          style={{ maxHeight: "250px", width: "auto", margin: "0 auto", objectFit: "cover" }}
          onError={(e) => { e.target.src = "https://via.placeholder.com/250x250?text=No+Image"; }}
        />

        {/* Card Body */}
        <div className="card-body text-color">
          <h6 className="text-muted">Category: <b>{item.category?.name}</b></h6>
          <h5 className="card-title"><b>{item.name}</b></h5>
          <p className="card-text"><b>{shortDesc(item.description)}</b></p>
        </div>

        {/* Card Footer */}
        <div className="card-footer custom-bg">
          <div className="d-flex justify-content-between align-items-center mt-2">
            <Link
              to={`/product/${item.id}/category/${item.category?.id}`}
              className="btn btn-md bg-color custom-bg-text"
            >
              Place Bid
            </Link>
            <h5 className="text-color mb-0">&#8377;{item.price}</h5>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
