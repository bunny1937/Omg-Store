import { useState, useEffect } from "react";
import "./Grid.css";
import { motion } from "framer-motion";

const GridDemo = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollPosition * 0.5}px)`,
  };

  const containers = [
    {
      heading: "Heading 1",
      image: "https://picsum.photos/2000/1000",
      alt: "Image 1",
    },
    {
      heading: "Heading 2",
      image: "https://picsum.photos/2000/1001",
      alt: "Image 2",
    },
    {
      heading: "Heading 3",
      image: "https://picsum.photos/2000/1002",
      alt: "Image 3",
    },
    {
      heading: "Heading 4",
      image: "https://picsum.photos/2000/1003",
      alt: "Image 4",
    },
    {
      heading: "Heading 5",
      image: "https://picsum.photos/2000/1004",
      alt: "Image 5",
    },
  ];

  return (
    <div className="demo-section">
      <motion.div
        className="demo-container"
        initial={{ x: 0 }}
        whileInView={{ x: "100%" }}
        transition={{ duration: 0.5 }}
      >
        {[...Array(5)].map((_, index) => (
          <div key={index} className="grid-container">
            <div className="image-container">
              <img src={`image-${index + 1}.jpg`} alt={`Image ${index + 1}`} />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default GridDemo;
