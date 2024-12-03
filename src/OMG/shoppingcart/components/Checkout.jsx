import React, { useContext, useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import cartContext from "../context/cartContext";
import { firestore, auth, db } from "../../db/Firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import "./Checkout.css";

const Checkout = (onClose) => {
  const checkoutRef = useRef(null);
  const navigate = useNavigate(); // For navigation after order is saved
  const { cartItems, updateCartItem } = useContext(cartContext);
  const [userId, setUserId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [totalAmount] = useState(0);

  const [userInfo, setUserInfo] = useState(null); // State to hold user info
  const [shippingInfo, setShippingInfo] = useState({
    city: "",
    flat: "",
    locality: "",
    name: "",
    number: "",
    pinCode: "",
    state: "",
    street: "",
  });
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is authenticated:", user.uid); // Log the authenticated user UID
        setUserId(user.uid);
      } else {
        alert("User not authenticated. Please log in.");
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  useEffect(() => {
    // Animate page entry
    gsap.fromTo(
      checkoutRef.current,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    return () => {
      // Optional: Cleanup or reverse animation on unmount
      gsap.to(checkoutRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
      });
    };
  }, []);

  useEffect(() => {
    if (userId) {
      // Fetch user data from Firestore
      const fetchUserInfo = async () => {
        try {
          console.log("Fetching user info for UID:", userId);
          const userRef = doc(firestore, "users", userId);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            console.log("User info fetched:", userDoc.data()); // Log the fetched user info
            setUserInfo(userDoc.data()); // Set the user data into state
          } else {
            console.log("No user data found.");
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };
      fetchUserInfo();
    }
  }, [userId]);
  // Function to save the order to Firestore
  // const saveOrder = async () => {
  //   if (userInfo && selectedAddress) {
  //     const orderRef = collection(firestore, "users", userId, "orders");
  //     const newOrder = {
  //       cartItems,
  //       shippingInfo: selectedAddress,
  //       totalAmount: cartTotal,
  //       orderCreatedAt: Timestamp.fromDate(new Date()),
  //     };
  //     try {
  //       await addDoc(orderRef, newOrder);
  //       navigate("/Payment");
  //     } catch (error) {
  //       console.error("Error saving order:", error);
  //     }
  //   } else {
  //     alert("Please select an address and ensure the cart is not empty.");
  //   }
  // };

  useEffect(() => {
    // Fetch addresses only if userId is available
    if (userId) {
      const fetchAddresses = async () => {
        try {
          const addressesRef = collection(db, "users", userId, "ShippingInfo");
          const snapshot = await getDocs(addressesRef);
          const addresses = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSavedAddresses(addresses);
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      };
      fetchAddresses();
    }
  }, [userId]); // Run when userId is updated
  useEffect(() => {
    // Fetch saved addresses if userId is available
    const fetchSavedAddresses = async () => {
      if (userId) {
        const addressesRef = collection(
          firestore,
          "users",
          userId,
          "ShippingInfo"
        );
        const snapshot = await getDocs(addressesRef);
        setSavedAddresses(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      }
    };
    fetchSavedAddresses();
  }, [userId]);

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId) {
      const userOrderRef = collection(
        firestore,
        "users",
        userId,
        "ShippingInfo"
      );

      // Include userInfo in the order details
      const orderData = {
        ...shippingInfo,
      };

      console.log("Submitting order data:", orderData); // Log the data before submitting

      try {
        await addDoc(userOrderRef, orderData);
        alert("Shipping information saved successfully.");
        setShowForm(false); // Hide form after saving
        setShippingInfo({}); // Clear form fields
        setSavedAddresses((prev) => [...prev, { ...orderData }]); // Add new address to local state
      } catch (error) {
        console.error("Error saving order data:", error);
      }
    } else {
      console.log("User info or user ID is missing, cannot submit order.");
    }
  };
  const handleAddressSelection = (addressId) => {
    console.log("Selected Address ID:", addressId); // Log selected address ID
    const address = savedAddresses.find((addr) => addr.id === addressId);
    console.log("Found Address:", address); // Log the found address
    if (address) {
      setSelectedAddress(address);
      setSelectedAddressId(addressId); // Set the selected address ID
      setShowAddressDetails(true); // Show form on selection
    } else {
      setShowAddressDetails(false); // Hide form if address not found
    }
  };

  // Step 4: Cancel Address Selection and Reset the Select Dropdown
  const handleCancelSelection = () => {
    setSelectedAddress(null);
    setShowAddressDetails(false); // Hide form when canceling selection
    setSelectedAddressId(""); // Reset the selected address ID
  };

  const handleAddAddressClick = () => {
    setShowForm(!showForm); // Toggle form visibility
  };
  const handleCouponToggle = () => {
    setShowCouponInput(!showCouponInput);
  };
  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const handleQuantityChange = (item, newQuantity) => {
    updateCartItem(item.id, newQuantity);
  };

  // Save the order details to Firestore and navigate to payment page
  const handlePayClick = async () => {
    if (userId && selectedAddress && cartItems.length > 0) {
      try {
        const orderRef = collection(firestore, "users", userId, "orders");
        const newOrder = {
          cartItems,
          shippingInfo: selectedAddress,
          totalAmount: cartTotal,
          orderCreatedAt: new Date(),
          userInfo: {
            email: userInfo.email,
            phoneNumber: userInfo.phoneNumber,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            userId: userId,
          },
        };

        console.log("Saving order to Firestore:", newOrder); // Debugging log
        await addDoc(orderRef, newOrder); // Save order to Firestore
        navigate("/Payment"); // Navigate to payment page
      } catch (error) {
        console.error("Error saving order:", error);
      }
    } else {
      alert("Please select an address and ensure the cart is not empty.");
    }
  };

  return (
    <div className="checkout" ref={checkoutRef}>
      <div className="checkout-container">
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <motion.div
              className="cart-item"
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <figure className="cart-item-img">
                <img src={item.Img} alt={item.Name} />
              </figure>
              <div className="cart-item-info">
                <h2>{item.Name}</h2>
                <h3>Category: {item.Category}</h3>
                <h4>₹ {item.price.toLocaleString()}</h4>
                <h3>Size : {item.size}</h3>
                <div className="cart-item-pricing">
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        handleQuantityChange(item, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item, item.quantity + 1)
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <h3>₹ {(item.price * item.quantity).toLocaleString()}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {/* Shipping Info Form */}
          <button
            className="add-address-button"
            onClick={handleAddAddressClick}
          >
            {showForm ? "Cancel" : "Add Address"}
          </button>
          {/* Address Form */}
          {showForm && (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={shippingInfo.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
              <input
                type="text"
                name="number"
                value={shippingInfo.number}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required
              />
              <input
                type="text"
                name="flat"
                value={shippingInfo.flat}
                onChange={handleInputChange}
                placeholder="Flat No / Building Name"
                required
              />
              <input
                type="text"
                name="street"
                value={shippingInfo.street}
                onChange={handleInputChange}
                placeholder="Street"
                required
              />
              <input
                type="text"
                name="locality"
                value={shippingInfo.locality}
                onChange={handleInputChange}
                placeholder="Locality"
                required
              />
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                placeholder="City"
                required
              />
              <input
                type="text"
                name="pinCode"
                value={shippingInfo.pinCode}
                onChange={handleInputChange}
                placeholder="Pin Code"
                required
              />
              <select
                name="state"
                value={shippingInfo.state}
                onChange={handleInputChange}
                required
              >
                <option value="">Select state</option>
                <option value="AN">Andaman and Nicobar Islands</option>
                <option value="AP">Andhra Pradesh</option>
                <option value="AR">Arunachal Pradesh</option>
                <option value="AS">Assam</option>
                <option value="BR">Bihar</option>
                <option value="CH">Chandigarh</option>
                <option value="CT">Chhattisgarh</option>
                <option value="DN">Dadra and Nagar Haveli</option>
                <option value="DD">Daman and Diu</option>
                <option value="DL">Delhi</option>
                <option value="GA">Goa</option>
                <option value="GJ">Gujarat</option>
                <option value="HR">Haryana</option>
                <option value="HP">Himachal Pradesh</option>
                <option value="JK">Jammu and Kashmir</option>
                <option value="JH">Jharkhand</option>
                <option value="KA">Karnataka</option>
                <option value="KL">Kerala</option>
                <option value="LA">Ladakh</option>
                <option value="LD">Lakshadweep</option>
                <option value="MP">Madhya Pradesh</option>
                <option value="MH">Maharashtra</option>
                <option value="MN">Manipur</option>
                <option value="ML">Meghalaya</option>
                <option value="MZ">Mizoram</option>
                <option value="NL">Nagaland</option>
                <option value="OR">Odisha</option>
                <option value="PY">Puducherry</option>
                <option value="PB">Punjab</option>
                <option value="RJ">Rajasthan</option>
                <option value="SK">Sikkim</option>
                <option value="TN">Tamil Nadu</option>
                <option value="TG">Telangana</option>
                <option value="TR">Tripura</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="UT">Uttarakhand</option>
                <option value="WB">West Bengal</option>
              </select>
              <button type="submit">Save Shipping Information</button>
            </form>
          )}
          {/* Saved Addresses Dropdown */}
          <div className="address-selection">
            <label>Select Address:</label>

            {savedAddresses.map((address, index) => (
              <div key={index} className="address-option">
                <input
                  type="radio"
                  name="address"
                  value={address.id}
                  checked={selectedAddressId === address.id}
                  onChange={() => handleAddressSelection(address.id)}
                />
                {address.name}, {address.number},{address.flat}.........
              </div>
            ))}
            {selectedAddress && (
              <div className="address-details-form">
                <h4>Address Details</h4>
                <div>
                  <strong>Name:</strong> {selectedAddress.name}
                </div>
                <div>
                  <strong>Number:</strong> {selectedAddress.number}
                </div>
                <div>
                  <strong>Flat No:</strong> {selectedAddress.flat}
                </div>
                <div>
                  <strong>Building Name:</strong> {selectedAddress.buildingName}
                </div>
                <div>
                  <strong>Street Name:</strong> {selectedAddress.streetName}
                </div>
                <div>
                  <strong>Locality:</strong> {selectedAddress.locality}
                </div>
                <div>
                  <strong>City:</strong> {selectedAddress.city}
                </div>
                <div>
                  <strong>State:</strong> {selectedAddress.state}
                </div>
                <div>
                  <strong>Pin Code:</strong> {selectedAddress.pinCode}
                </div>
              </div>
            )}
            {selectedAddressId && (
              <button onClick={handleCancelSelection}>Cancel Selection</button>
            )}
          </div>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹ {cartTotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹ {cartTotal.toLocaleString()}</span>
            </div>
          </div>
          <div className="summary-actions">
            {!showCouponInput && (
              <button
                className="toggle-coupon-button"
                onClick={handleCouponToggle}
              >
                Have a coupon code?
              </button>
            )}
            {/* <button onClick={saveOrder}>Save Order</button> */}

            {showCouponInput && (
              <div className="coupon-section">
                <input type="text" placeholder="Coupon Code" />
                <button className="apply-button">Apply</button>
                <button className="close-button" onClick={handleCouponToggle}>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "10pt",
                      fontWeight: "600",
                    }}
                  >
                    &times;
                  </span>
                </button>
              </div>
            )}
          </div>
          <Link to={"/Payment"}>
            <motion.button
              className="pay-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePayClick}
            >
              Pay
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
