import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "../../db/Firebase";
import "./Category.css";

const Category = () => {
  const [hoveredProducts, setHoveredProducts] = useState({});

  const [products, setProducts] = useState({
    Hoodies: [],
    Tshirts: [],
    Oversize: [],
  });
  const [startIndex, setStartIndex] = useState({
    Hoodies: 0,
    Tshirts: 0,
    Oversize: 0,
  });
  const navigate = useNavigate();
  const firestore = getFirestore(firebaseApp);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(firestore, "Products"));
      const allProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts({
        Hoodies: allProducts.filter(
          (product) => product.Category === "Hoodies"
        ),
        Tshirts: allProducts.filter(
          (product) => product.Category === "Tshirts"
        ),
        Oversize: allProducts.filter(
          (product) => product.Category === "Oversize"
        ),
      });
    };

    fetchProducts();
  }, [firestore]);

  const handleScroll = (category, direction) => {
    setStartIndex((prevState) => ({
      ...prevState,
      [category]:
        direction === "right"
          ? prevState[category] + 4 <= products[category].length - 5
            ? prevState[category] + 4
            : 0
          : prevState[category] - 4 >= 0
          ? prevState[category] - 4
          : products[category].length - 5,
    }));
  };

  const handleSeeAll = (category) => {
    navigate(`/category/${category}`);
  };

  // const handleNavigate = (category, productId) => {
  //   navigate(`/Details/${productId}`);
  // };

  const renderProductSlider = (category, title) => {
    const visibleProducts = products[category].slice(
      startIndex[category],
      startIndex[category] + 5
    );
    const handleMouseEnter = (productId) => {
      setHoveredProducts((prev) => ({ ...prev, [productId]: true }));
    };

    const handleMouseLeave = (productId) => {
      setHoveredProducts((prev) => ({ ...prev, [productId]: false }));
    };
    return (
      <div className="category-slider-container">
        <div className="category-slider-header">
          <h2>{title}</h2>
          <button
            onClick={() => handleSeeAll(category)}
            className="see-all-button"
          >
            See All
          </button>
        </div>
        <div className="category-slider">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="category-card"
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={() => handleMouseLeave(product.id)}
            >
              <Link to={`/Details/${product.id}`}>
                <div className="category-image-container">
                  {product.ImgUrls && product.ImgUrls.length > 0 && (
                    <img
                      src={
                        hoveredProducts[product.id] && product.ImgUrls[1]
                          ? product.ImgUrls[1]
                          : product.ImgUrls[0]
                      }
                      alt={product.Name || "Product Image"}
                      className="category-image"
                    />
                  )}
                </div>
                <div className="category-info">
                  <h3>{product.Name}</h3>
                  <p>${product.price.toFixed(2)}</p>
                </div>
              </Link>
              {/* <button onClick={() => handleNavigate(category, product.id)}>
                View Product
              </button> */}
            </div>
          ))}
          {startIndex[category] > 0 && (
            <button
              className="scroll-button scroll-button-left"
              onClick={() => handleScroll(category, "left")}
            >
              &#8592;
            </button>
          )}
          {startIndex[category] + 5 < products[category].length && (
            <button
              className="scroll-button scroll-button-right"
              onClick={() => handleScroll(category, "right")}
            >
              &#8594;
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="horizontal-category-slider">
      {renderProductSlider("Hoodies", "Hoodies")}
      {renderProductSlider("Tshirts", "T-Shirts")}
      {renderProductSlider("Oversize", "Oversized")}
    </div>
  );
};

export default Category;
