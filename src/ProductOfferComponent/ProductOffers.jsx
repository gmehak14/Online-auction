import { useEffect, useState } from "react";
import axios from "axios";

const ProductOffers = ({ productId }) => {
  const [offers, setOffers] = useState([]);
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const admin    = JSON.parse(sessionStorage.getItem("active-admin"));

  useEffect(() => {
    axios.get(`http://localhost:8080/api/product/offer/fetch/product?productId=${productId}`)
      .then(res => setOffers(res.data.offers || []))
      .catch(() => {});
  }, [productId]);

  return (
    <div className="list-group form-card border-color" style={{ height: "31rem" }}>

      {/* Header */}
      <div className="list-group-item list-group-item-action bg-color custom-bg-text text-center">
        <b>All Bids ({offers.length})</b>
      </div>

      {/* Bids List */}
      <div style={{ overflowY: "auto" }}>
        {offers.length === 0 ? (
          <div className="list-group-item text-center text-color">
            <p className="mt-3">No bids yet. Be the first!</p>
          </div>
        ) : (
          offers.map((offer, index) => (
            <div key={offer.id} className="list-group-item list-group-item-action text-color custom-bg">
              {/* Show name only to admin or if it's the logged-in customer's own bid */}
              <b>
                {admin
                  ? offer.user?.firstName + " " + offer.user?.lastName
                  : customer && offer.user?.id === customer.id
                  ? offer.user?.firstName + " (You)"
                  : "Anonymous User"}
                {offer.status === "Won" && <span className="text-success ms-2">[WINNER 🏆]</span>}
              </b>
              <p className="mb-0">&#8377;{offer.amount}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default ProductOffers;
