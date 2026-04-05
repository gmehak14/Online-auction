import carousel1 from "../images/carousel_1.png";

const Carousel = () => {
  return (
    <div id="carouselMain" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselMain" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#carouselMain" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carouselMain" data-bs-slide-to="2"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={carousel1} className="d-block w-100" alt="slide1" style={{ maxHeight: "400px", objectFit: "cover" }} />
        </div>
        <div className="carousel-item">
          <img src={carousel1} className="d-block w-100" alt="slide2" style={{ maxHeight: "400px", objectFit: "cover" }} />
        </div>
        <div className="carousel-item">
          <img src={carousel1} className="d-block w-100" alt="slide3" style={{ maxHeight: "400px", objectFit: "cover" }} />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselMain" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselMain" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};

export default Carousel;
