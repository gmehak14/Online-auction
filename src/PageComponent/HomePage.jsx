import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../ProductComponent/ProductCard";
import Carousel from "./Carousel";
import Footer from "../NavbarComponent/Footer";

const HomePage = () => {
  const { categoryId } = useParams();

  const [products, setProducts]         = useState([]);
  const [searchText, setSearchText]     = useState("");
  const [tempSearchText, setTempSearch] = useState("");

  useEffect(() => {
    let url = "http://localhost:8080/api/product/fetch/all?status=Available";

    if (searchText) {
      url = `http://localhost:8080/api/product/search?productName=${searchText}`;
    } else if (categoryId) {
      url = `http://localhost:8080/api/product/fetch/category-wise?categoryId=${categoryId}`;
    }

    axios.get(url)
      .then(res => setProducts(res.data.products || []))
      .catch(() => {});
  }, [searchText, categoryId]);

  const searchProducts = (e) => {
    e.preventDefault();
    setSearchText(tempSearchText);
  };

  return (
    <div className="container-fluid mb-2">

      {/* Carousel - same as original */}
      <Carousel />

      {/* Search Bar */}
      <div className="d-flex align-items-center justify-content-center mt-5">
        <form className="row g-3" onSubmit={searchProducts}>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Search products by name..."
              onChange={(e) => setTempSearch(e.target.value)}
              value={tempSearchText}
              style={{ width: "350px" }}
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn bg-color custom-bg-text mb-3"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Products Grid */}
      <div className="col-md-12 mt-3 mb-5">
        {products.length === 0 ? (
          <div className="text-center mt-5">
            <h4 className="text-color">No products found.</h4>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {products.map((product) => (
              <ProductCard item={product} key={product.id} />
            ))}
          </div>
        )}
      </div>

      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;
