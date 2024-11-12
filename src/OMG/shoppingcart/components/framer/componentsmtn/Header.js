import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -180 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ease: "easeIn",
        duration: 1,
        delay: 0.6,
      }}
      className="header"
    >
      <div className="header-inner">
        <div className="logo">DreamHouses</div>
        <nav className="nav">
          <li>
            <a>Design</a>
          </li>
          <li>
            <a>Strategy</a>
          </li>
          <li>
            <a>Cases</a>
          </li>
          <li>
            <a>About</a>
          </li>
          <li>
            <a></a>
          </li>
        </nav>
        <div className="hamburger-menu">
          <span></span>
          <span></span>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
