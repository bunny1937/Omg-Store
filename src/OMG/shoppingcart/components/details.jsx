import React, { useState, useContext, useEffect } from "react";
import "./details.css";
import cartContext from "../context/cartContext";
import Cart from "./Cart";
import { Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FavouritesContext } from "./FavoritesContext";
import SimilarProducts from "./SimilarProducts";
import ReviewSection from "./ReviewSection";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { firebaseApp } from "../../db/Firebase";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  const [selectedImage, setSelectedImage] = useState(null); // For main image

  // Fetch product based on id
  useEffect(() => {
    if (id) {
      const productsRef = collection(db, "Products");
      const productRef = doc(productsRef, id);

      getDoc(productRef)
        .then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setProduct(data);
            setSelectedImage(data.ImgUrls[0]); // Set the first image as default
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

  const { ImgUrls = [], Name, Description, price, Gender, Category } = product;

  const handleAddToCart = () => {
    const item = {
      id,
      Img: ImgUrls[0],
      Category,
      Gender,
      Name,
      Description,
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
    if (!selectedSize) {
      alert("Please select a size before adding to favourites.");
      return;
    }

    const favouriteItem = {
      ...product,
      id: String(id),
      size: selectedSize,
    };

    addFavourite(favouriteItem);
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

  const handleThumbnailClick = (imgUrl) => {
    setSelectedImage(imgUrl); // Update main image when thumbnail is clicked
  };

  // const settings = {
  //   infinite: true,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   arrows: true,
  //   cssEase: "linear",
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };
  return (
    <>
      <div className="details">
        <div className="details-container">
          <div className="img-section">
            {/* Thumbnails Section */}
            <div className="thumbnails">
              {ImgUrls.map((url, index) => (
                <div
                  key={index}
                  className={`thumbnail ${
                    selectedImage === url ? "active" : ""
                  }`}
                  onClick={() => handleThumbnailClick(url)}
                >
                  <img src={url} alt={`Thumbnail ${index}`} />
                </div>
              ))}
            </div>

            {/* Main Image Section */}
            <div className="main-image">
              <img src={selectedImage} alt="Selected product" />
            </div>
          </div>
          <div className="details-section">
            <div className="details-actions">
              <h2>{Name}</h2>
              <h3>{Category}</h3>
              <p>₹ {price ? price.toLocaleString() : "Price not available"}</p>
              <div className="feature-container">
                <div className="feature-item ">
                  <span>240 GSM</span>
                  <img src="icon1.svg" alt="240 GSM Icon" />
                </div>
                <div className="feature-item ">
                  <span>OVERSIZED FIT</span>
                  <img src="icon2.svg" alt="Oversized Fit Icon" />
                </div>
                <div className="feature-item">
                  <span>UNISEX</span>
                  <img src="icon3.svg" alt="Unisex Icon" />
                </div>
                <div className="feature-item ">
                  <span>DTF</span>
                  <img src="icon4.svg" alt="DTF Icon" />
                </div>
              </div>

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
                disabled={!selectedSize}
              >
                {isAdded ? "Added" : "Add to cart"}
              </button>
              <button
                type="button"
                className={`btn1 ${isFavourite ? "Added !" : ""}`}
                onClick={handleAddToFavourites}
                disabled={!selectedSize}
              >
                {isFavourite ? "Added !" : "Favourite ?"}
              </button>
            </div>
            <div className="description-box">
              <div className="prod-details">
                <h3>Product Details</h3>
              </div>
              <div className="details-accordion">
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
                      <p>{Description}</p>
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
