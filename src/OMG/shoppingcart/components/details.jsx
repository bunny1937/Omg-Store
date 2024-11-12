import React, { useState, useContext, useEffect } from "react";
import "./details.css";
import cartContext from "../context/cartContext";
import Cart from "./Cart";
import { Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FavouritesContext } from "./FavoritesContext";
import Favourites from "./Favourites"; // Import Favourites component
import SimilarProducts from "./SimilarProducts";
import gridimg1 from "./pages/photos/omglogo.jpg";
import gridimg2 from "./pages/photos/omglogo.jpg";
import gridimg3 from "./pages/photos/omglogo.jpg";
import gridimg4 from "./pages/photos/omglogo.jpg";
import ReviewSection from "./ReviewSection";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { firebaseApp } from "../../db/Firebase";
import { useParams } from "react-router-dom";

const db = getFirestore(firebaseApp);

const Details = () => {
  const { id } = useParams(); // Get the id from the URL parameters

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const { addItem } = useContext(cartContext);
  const { addFavourite } = useContext(FavouritesContext);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  // Fetch product based on id
  useEffect(() => {
    if (id) {
      const productsRef = collection(db, "Products");
      const productRef = doc(productsRef, id);

      getDoc(productRef)
        .then((doc) => {
          if (doc.exists()) {
            setProduct(doc.data());
          } else {
            console.log("Product not found!");
          }
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [id]);

  if (!product) {
    return <div>Product not found!</div>;
  }

  const { Img, Name, price, Category } = product;

  const handleAddToCart = () => {
    const item = {
      id,
      Img,
      Category,
      Name,
      price,
      quantity,
      size: selectedSize,
    };
    addItem(item);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };

  const handleAddToFavourites = () => {
    addFavourite(product);
    setIsFavourite(true);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleContent = (type) => {
    if (type === "description") {
      setDescriptionOpen(!descriptionOpen);
    } else if (type === "shipping") {
      setShippingOpen(!shippingOpen);
    }
  };
  return (
    <>
      <div className="details">
        <div className="details-container">
          <div className="img-section">
            <img src={Img} alt="product-img" />
            <div className="grid">
              <div className="grid-img">
                <img src={gridimg1} alt="grid-img-1" />
              </div>
              <div className="grid-img">
                <img src={gridimg2} alt="grid-img-2" />
              </div>
              <div className="grid-img">
                <img src={gridimg3} alt="grid-img-3" />
              </div>
              <div className="grid-img">
                <img src={gridimg4} alt="grid-img-4" />
              </div>
            </div>
          </div>
          <div className="details-section">
            <div className="details-actions">
              <h2>{Name}</h2>
              <h2>{Category}</h2>
              <p>₹ {price ? price.toLocaleString() : "Price not available"}</p>
              <div className="size-box">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="quantity">
                <button onClick={handleDecrement}>-</button>
                <p>{quantity}</p>
                <button onClick={handleIncrement}>+</button>
              </div>
              <button
                type="button"
                className={`btn1 ${isAdded ? "added" : ""}`}
                onClick={handleAddToCart}
              >
                {isAdded ? "Added" : "Add to cart"}
              </button>
              <button
                type="button"
                className={`btn1 ${isFavourite ? "favourited" : ""}`}
                onClick={handleAddToFavourites}
              >
                {isFavourite ? "Favourited" : "Add to favourites"}
              </button>
            </div>
            <div className="description-box">
              <div className="prod-details">
                <h3>Product Details</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat
                </p>
              </div>
              <div className="accordion">
                <div>
                  <h3
                    onClick={() => toggleContent("description")}
                    className="accordion-header"
                  >
                    Product Description
                    <ExpandMoreIcon
                      className={`expand-icon ${
                        descriptionOpen ? "expanded" : ""
                      }`}
                    />
                  </h3>
                  <Collapse in={descriptionOpen}>
                    <div className="accordion-content">
                      <p>
                        This is the product description. It could be quite long,
                        so the accordion is perfect for this.
                      </p>
                    </div>
                  </Collapse>
                </div>

                <div>
                  <h3
                    onClick={() => toggleContent("shipping")}
                    className="accordion-header"
                  >
                    Shipping & Returns
                    <ExpandMoreIcon
                      className={`expand-icon ${
                        shippingOpen ? "expanded" : ""
                      }`}
                    />
                  </h3>
                  <Collapse in={shippingOpen}>
                    <div className="accordion-content">
                      <p>
                        This is the shipping and return details. Add details
                        such as estimated delivery time, return policy, etc.
                      </p>
                    </div>
                  </Collapse>
                </div>
              </div>
              <ReviewSection />
            </div>
          </div>
        </div>
        <Cart />
        <div className="similar-details">
          <SimilarProducts category={Category} id={id} />
        </div>
      </div>
    </>
  );
};

export default Details;
