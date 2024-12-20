import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./IntroOverlay.css";

const words = ["Your", "Ultimate", "Fashion", "Outfits"];

export default function IntroOverlay({ onAnimationEnd }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < words.length - 1) {
      const timeout = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, 500); // Time each word is displayed
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        onAnimationEnd(); // End animation after all words
      }, 1000);
    }
  }, [index, words.length, onAnimationEnd]);

  return (
    <motion.div
      initial={{ top: 0 }}
      animate={{ top: "-100vh" }}
      exit={{ top: "-100vh" }}
      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 1.5 }}
      className="intro-overlay"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="word-display"
      >
        {words[index]}
      </motion.p>
      <svg>
        <motion.path
          d="M0 0 L100% 0 L100% 100% Q50% 120% 0 100% Z"
          animate={{
            d: [
              "M0 0 L100% 0 L100% 100% Q50% 120% 0 100% Z",
              "M0 0 L100% 0 L100% 80% Q50% 110% 0 80% Z",
              "M0 0 L100% 0 L100% 0 Q50% 0 0 0 Z",
            ],
            fill: ["#141516", "#1A1B1D", "#2B2C2D"], // Animate fill color change
          }}
          transition={{
            duration: 2,
            ease: [0.76, 0, 0.24, 1],
            times: [0, 0.5, 1],
          }}
        />
      </svg>
    </motion.div>
  );
}
