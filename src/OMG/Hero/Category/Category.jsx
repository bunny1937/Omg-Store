import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Category.css";
gsap.registerPlugin(ScrollTrigger);

const Category = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([
    "Hoodies",
    "Oversize",
    "Pants",
    "Tshirts",
  ]);
  const navigate = useNavigate();
  const location = useLocation();
  const scrollContainerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Reset active category when navigating back
    setActiveCategory(null);
  }, [location.key]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const wrapper = wrapperRef.current;

    // Calculate the total scrollable width
    const totalWidth = scrollContainer.scrollWidth - wrapper.offsetWidth;

    // Create horizontal scroll effect using GSAP
    const animation = gsap.to(scrollContainer, {
      x: -totalWidth, // Move horizontally based on the total width
      ease: "none",
      scrollTrigger: {
        trigger: wrapper, // Attach ScrollTrigger to the wrapper
        start: "top top", // Start when wrapper hits the viewport top
        end: () => `+=${totalWidth}`, // Total scroll distance
        scrub: 1, // Smooth scroll
        pin: true, // Pin the wrapper during scroll
      },
    });

    // Cleanup GSAP triggers on unmount
    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    navigate(`/category/${category}`);
  };

  return (
    <div className="horizontal-scroll-wrapper" ref={wrapperRef}>
      <div className="scroll-container" ref={scrollContainerRef}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-box ${
              activeCategory === category ? "active" : ""
            }`}
          >
            <button onClick={() => handleCategoryClick(category)}>
              <h2>{category}</h2>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
