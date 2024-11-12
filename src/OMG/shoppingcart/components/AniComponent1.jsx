import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AniComponent2 from "./AniComponent2.jsx";
import "./AniComponent1.css";

const Component1 = ({ onClose }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  // Animation variants for Component1
  const component1Variants = {
    initial: { opacity: 0, scale: 0.5, x: "100%" },
    animate: {
      opacity: 1,
      scale: 1,
      x: "0%",
      transition: { type: "spring", duration: 0.5 },
    },
    shiftLeft: {
      x: "-600px",
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    }, // Shift left without disappearing
  };

  // Animation variants for CheckoutComponent
  const checkoutVariants = {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: "100%", transition: { duration: 0.5 } },
  };

  const handleCheckout = () => {
    setShowCheckout(true); // Trigger the checkout view
  };

  const handleClose = () => {
    setShowCheckout(false); // Reset to show only Component1
    onClose && onClose(); // Call parent's close function if provided
  };
  return (
    <AnimatePresence>
      <motion.div
        className="component1"
        variants={component1Variants}
        initial="initial"
        animate={showCheckout ? "shiftLeft" : "animate"}
        exit="exit"
      >
        <h2>Component 1</h2>
        <button onClick={handleCheckout}>Checkout</button>
        <button onClick={handleClose}>Close</button>
      </motion.div>
      {showCheckout && (
        <AniComponent2 onClose={handleClose} variants={checkoutVariants} />
      )}
    </AnimatePresence>
  );
};

export default Component1;
