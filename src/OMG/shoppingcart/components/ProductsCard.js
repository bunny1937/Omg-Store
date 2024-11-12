import React, { useContext, useState } from "react";
import cartContext from "../context/cartContext";
import { Link } from "react-router-dom";
import { FavouritesContext } from "./FavoritesContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { firestore, doc, auth } from "../../db/Firebase";
import { getDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore"; // Import setDoc

const ProductsCard = ({ id, Name, Category, price, Img }) => {
  const { addFavourite } = useContext(FavouritesContext);
  const { addItem, dispatch } = useContext(cartContext);
  const [isAdded, setIsAdded] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleAddToFavourites = () => {
    const item = { id, Name, Category, price, Img };
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

        // Add the product to the cart state
        dispatch({
          type: "ADD_TO_CART",
          payload: { ...productData, id: productId },
        });

        // Also add the product to Firestore under the user's cart collection
        const userId = auth.currentUser?.uid; // Ensure the user is authenticated
        if (userId) {
          const userCartRef = doc(
            firestore,
            "users",
            userId,
            "Cart",
            productId
          );
          await setDoc(userCartRef, {
            ...productData,
            id: productId,
            quantity: 1, // Add initial quantity or customize as needed
          });
          console.log("Product added to Firestore cart successfully");
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
            <div>
              <img src={Img} alt="item-img" />
            </div>
            <div>
              <img src={Img} alt="item-img" />
            </div>
            <div>
              <img src={Img} alt="item-img" />
            </div>
          </Slider>
          {/* <img src={Img} alt="item-img" /> */}
        </div>
        <div className="details-btn">
          {id && Name ? (
            <Link to={`/Details/${id}`}>
              <h4 className="title">{Name}</h4>
            </Link>
          ) : (
            <h4 className="title">No Title Available</h4>
          )}
          <h3 className="price">₹ {price.toLocaleString()}</h3>
        </div>
        <h4 className="category">{Category}</h4>
        <div className="card-actions">
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
        </div>
      </div>
    </>
  );
};

export default ProductsCard;
