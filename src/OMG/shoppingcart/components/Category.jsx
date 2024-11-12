import React from "react";
// import Carousel from "./Carousel";
import { Link } from "react-router-dom";
import { ParallaxBanner } from "react-scroll-parallax";
import catgeoryimg from "./pages/photos/omglogo.jpg";
import "./Category.css";
function Category() {
  return (
    <>
      <div className="category-container">
        <div className="category-items">
          <div className="img-box">
            <img src={catgeoryimg} />
          </div>
          <Link to={`/pages/Tshirt/`}>
            <div className="text-box">Tshirt</div>
          </Link>
        </div>
        <div className="category-items">
          <div className="img-box">
            <img src={catgeoryimg} />
          </div>
          <Link to={`/pages/Shirt/`}>
            <div className="text-box">Shirt</div>
          </Link>
        </div>
        <div className="category-items">
          <div className="img-box">
            <img src={catgeoryimg} />
          </div>
          <div className="text-box">OverSize</div>
        </div>
        <div className="category-items">
          <div className="img-box">
            <img src={catgeoryimg} />
          </div>
          <div className="text-box">Cargos</div>
        </div>
        <div className="category-items">
          <div className="img-box">
            <img src={catgeoryimg} />
          </div>
          <div className="text-box">Jeans</div>
        </div>
      </div>

      {/* <div
        style={{
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 64,
          backgroundRepeat: "no-repeat",
        }}
      >
        <Carousel>
          <img
            src="https://via.placeholder.com/1600x300"
            alt="placeholder"
          />
          <img src="https://via.placeholder.com/1600x300" alt="placeholder" />
          <img src="https://via.placeholder.com/1600x300" alt="placeholder" />
        </Carousel>
      </div> */}
    </>
  );
}

export default Category;
