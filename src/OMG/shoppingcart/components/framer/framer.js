import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import "../sass/main.css";

// Components
import Header from "./componentsmtn/Header.js";
import Banner from "./componentsmtn/Banner";
import LoadingAnimation from "./Loadinganimation.js";

function Framer() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // After 1 second, remove the loading state
    }, 3000); // 1000 milliseconds = 1 second

    // Clean up the timer to prevent memory leaks
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return <Banner />;
}

export default Framer;
