import React, { useContext, useState } from "react";
import cartContext from "../context/cartContext";
import { Link } from "react-router-dom";
import { FavouritesContext } from "./FavoritesContext";
import Slider from "react-slick";
import Tilt from "react-parallax-tilt";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { firestore, doc, auth } from "../../db/Firebase";
import { getDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore"; // Import setDoc

const ProductsCard = ({ id, Name, Category, price, ImgUrls }) => {
  const { addFavourite } = useContext(FavouritesContext);
  const { addItem, dispatch } = useContext(cartContext);
  const [isAdded, setIsAdded] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleAddToFavourites = () => {
    const item = { id, Name, Category, price, ImgUrls };
    addFavourite(item);
    setIsFavourite(true);

    setTimeout(() => {
      setIsFavourite(false);
    }, 3000);
  };

  const handleAddToCart = async (event) => {
    const productId = event.currentTarget.getAttribute("data-id");

    if (!productId || typeof productId !== "string") {
      console.error("Invalid product ID:", productId);
      return;
    }

    try {
      // Fetch the product document from Firestore using the provided productId
      const productRef = doc(firestore, "Products", productId);
      const productDoc = await getDoc(productRef);

      if (productDoc.exists()) {
        const productData = productDoc.data();
        const { ImgUrls = [], ...otherProductData } = productData;
        const mainImage = ImgUrls[0] || null; // Only the first image

        if (!mainImage) {
          console.error("Main image not available in ImgUrls:", ImgUrls);
          return;
        }

        // Add the product to the cart state with only the first image
        dispatch({
          type: "ADD_TO_CART",
          payload: {
            ...otherProductData,
            id: productId,
            Img: mainImage,
            quantity: 1,
          },
        });

        // Also add the product to Firestore under the user's cart collection
        const userId = auth.currentUser?.uid;
        if (userId) {
          const userCartRef = doc(
            firestore,
            "users",
            userId,
            "Cart",
            productId
          );
          await setDoc(userCartRef, {
            ...otherProductData,
            Img: mainImage,
            id: productId,
            quantity: 1,
          });
          console.log("Product added to Firestore cart successfully:", {
            ...otherProductData,
            Img: mainImage,
            id: productId,
          });
        } else {
          console.error("User not authenticated");
        }

        // Provide feedback that the product was added
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 3000);
      } else {
        console.error("Product does not exist in Firestore");
      }
    } catch (error) {
      console.error("Error fetching or adding product to Firestore:", error);
    }
  };

  const createAddToCartHandler = (productId) => () => {
    handleAddToCart(productId);
  };
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    cssEase: "linear",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="product_card">
        <div className="product_card_img">
          {/* Uncomment the Slider component if needed */}
          <Slider {...settings}>
            {ImgUrls &&
              ImgUrls.map((imgUrl, i) => (
                <div key={i}>
                  <img src={imgUrl} alt={`product-img-${i}`} />
                </div>
              ))}
          </Slider>
          {/* <img src={Img} alt="item-img" /> */}
        </div>
        <div className="details-btn">
          {id && Name ? (
            <Link to={`/Details/${id}`}>
              <h3>{Name}</h3>
            </Link>
          ) : (
            <h4>No Title Available</h4>
          )}
          <h3 className="price">₹ {price.toLocaleString()}</h3>
        </div>
        <h4>{Category}</h4>
        <button
          className={`btn-fav ${isFavourite ? "favourited" : ""}`}
          onClick={handleAddToFavourites}
        >
          <div className="fav-icon1"></div>
        </button>
        {/* <div className="card-actions">
          <button
            type="button"
            className={`btn1 ${isAdded ? "added" : ""}`}
            data-id={id}
            onClick={handleAddToCart}
          >
            <div className="bag-icon1"></div>
          </button>
          <button
            className={`btn2 ${isFavourite ? "favourited" : ""}`}
            onClick={handleAddToFavourites}
          >
            <div className="fav-icon1"></div>
          </button>
        </div> */}
      </div>
    </>
  );
};

export default ProductsCard;
