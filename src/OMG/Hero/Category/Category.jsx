import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../shoppingcart/components/pages/photos/parallax/man-wearing-white-shirt-with-tattoo-his-arm-words-hes-man-left_1045176-14545-transformed.jpeg";
import img2 from "../../shoppingcart/components/pages/photos/parallax/redicul-pict-hhmrD_gNNA4-unsplash.jpg";
import img3 from "../../shoppingcart/components/pages/photos/parallax/premium_photo-1690341214258-18cb88438805-transformed.jpeg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Category.css";
gsap.registerPlugin(ScrollTrigger);

const Category = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const handleNavigate = (category) => {
    navigate(`/category/${category}`);
  };

  useEffect(() => {
    const sections = sectionRef.current.querySelectorAll(".lenis-category");

    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelector(".lenis-content"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        section.querySelector(".illustration"),
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div ref={sectionRef} className="lenis-container">
      {/* Oversized T-Shirts */}
      <div
        className="lenis-category"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="illustration oversized"></div>
        <div className="lenis-content">
          <h1>Oversized T-Shirts</h1>
          <p>Bold Moves. Bigger Fits.</p>
          <button onClick={() => handleNavigate("Oversize")}>
            Explore Oversized T-Shirts
          </button>
        </div>
      </div>

      {/* Hoodies */}
      <div
        className="lenis-category"
        style={{ backgroundImage: `url(${img2})` }}
      >
        <div className="illustration hoodies"></div>
        <div className="lenis-content">
          <h1>Hoodies</h1>
          <p>Layer Up in Style.</p>
          <button onClick={() => handleNavigate("Hoodies")}>
            Explore Hoodies
          </button>
        </div>
      </div>

      {/* T-Shirts */}
      <div
        className="lenis-category"
        style={{ backgroundImage: `url(${img3})` }}
      >
        <div className="illustration tshirts"></div>
        <div className="lenis-content">
          <h1>T-Shirts</h1>
          <p>Effortless. Everyday.</p>
          <button onClick={() => handleNavigate("Tshirts")}>
            Explore T-Shirts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
