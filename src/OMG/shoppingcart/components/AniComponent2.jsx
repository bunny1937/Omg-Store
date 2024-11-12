import React from "react";
import { motion } from "framer-motion";
import "./AniComponent2.css";
const AniComponent2 = ({ onClose, variants }) => {
  return (
    <motion.div
      className="checkout-component"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      <h2>Checkout Component</h2>
      <button onClick={onClose}>Close</button>
    </motion.div>
  );
};

export default AniComponent2;
