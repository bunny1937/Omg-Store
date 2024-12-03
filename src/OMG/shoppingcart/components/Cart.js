import React, { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import cartContext from "../context/cartContext";
import { collection, getDocs } from "firebase/firestore";
import { firestore, auth } from "../../db/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./Cart.css";

const Cart = () => {
  const {
    toggleCart,
    removeItem,
    incrementItem,
    decrementItem,
    isCartOpen,
    cartItems,
    state,
    dispatch,
  } = useContext(cartContext);
  const cartRef = useRef(null);

  // Fetch cart items when user is authenticated
  useEffect(() => {
    // Animation for when the cart appears
    gsap.fromTo(
      cartRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }
    );
  }, []);
  // Function to fetch cart items
  useEffect(() => {
    const fetchCartItems = async (userId) => {
      try {
        const userid = auth.currentUser.uid;
        const cartCollection = collection(firestore, "users", userid, "Cart");
        const cartSnapshot = await getDocs(cartCollection);

        const items = cartSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Cart Items:", items); // Check for Category field in each item

        // Set the fetched cart items in state
        dispatch({ type: "SET_CART_ITEMS", payload: items });
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCartItems(user.uid);
      } else {
        // Handle cases where the user is not logged in, if needed
        dispatch({ type: "SET_CART_ITEMS", payload: [] });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Handle disabling body scroll when cart is open
  useEffect(() => {
    document.body.classList.toggle("overflow_hide", isCartOpen);
  }, [isCartOpen]);

  // Handle clicking outside to close cart
  useEffect(() => {
    const outsideClose = (e) => {
      if (e.target.id === "cart") {
        toggleCart(false);
      }
    };

    window.addEventListener("click", outsideClose);

    return () => {
      window.removeEventListener("click", outsideClose);
    };
  }, [toggleCart]);

  const cartQuantity = cartItems ? cartItems.length : 0;
  const cartTotal = cartItems
    ? cartItems
        .map((item) => item.price * item.quantity)
        .reduce((prevValue, currValue) => prevValue + currValue, 0)
    : 0;
  return (
    <>
      {isCartOpen && (
        <div id="cart" ref={cartRef}>
          <div className="cart_content">
            <div className="cart_head">
              <h2>
                Cart <small>({cartQuantity})</small>
              </h2>
              <div
                title="Close"
                className="close_btn"
                onClick={() => dispatch({ type: "TOGGLE_CART" })}
              >
                <span>&times;</span>
              </div>
            </div>
            <div className="cart_body">
              {cartItems.length === 0 ? (
                <h2>Cart is empty</h2>
              ) : (
                cartItems.map((item) => {
                  const { id, Img, Category, Name, price, quantity } = item;
                  const itemTotal = price * quantity;
                  return (
                    <div className="cart_items" key={`${item.id}-${item.size}`}>
                      <figure className="cart_items_img">
                        <img src={Img} alt="product-img" />
                      </figure>
                      <div className="cart_items_info">
                        <h4>{Name}</h4>
                        <h5> {Category}</h5>
                        <h3 className="size">Size:{item.size || "N/A"}</h3>
                        <h3 className="price">
                          ₹ {itemTotal.toLocaleString()} ||
                          <span> ₹ {price}</span>
                        </h3>
                      </div>
                      <div className="cart_items_quantity">
                        <span onClick={() => decrementItem(id)}>&#8722;</span>
                        <b>{quantity}</b>
                        <span onClick={() => incrementItem(id)}>&#43;</span>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size || "N/A")}
                      >
                        <span style={{ color: "#000", fontSize: "21pt" }}>
                          &times;
                        </span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="cart_foot">
              <h3>
                <small>Total:</small>
                <b>₹ {cartTotal.toLocaleString()}</b>
              </h3>
              <Link to={"/Checkout"}>
                <button
                  type="button"
                  className="checkout_btn"
                  disabled={cartQuantity === 0}
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
