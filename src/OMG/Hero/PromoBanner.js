import React, { useState } from "react";
import "./PromoBanner.css";

const PromoBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title:
        "Are you ready to wear your faith and showcase your beliefs through powerful designs?",
      button: "Explore",
      background: "url('https://example.com/spiritual-image.jpg')", // Replace with a spiritual-themed image URL
      gradient: "linear-gradient(to right, #e0c3fc, #8ec5fc)",
      textColor: "#3b1e4e",
    },
    {
      id: 2,
      title:
        "Are you inspired by modern aesthetics and customized minimalistic logos?",
      button: "Explore",
      background: "url('https://example.com/modern-image.jpg')", // Replace with a modern-themed image URL
      gradient: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
      textColor: "#004d40",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="promo-banner">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? "active" : ""}`}
          style={{
            backgroundImage: `${slide.gradient}, ${slide.background}`,
            color: slide.textColor,
          }}
        >
          <div className="content">
            <h1>{slide.title}</h1>
            <button className="explore-btn">{slide.button}</button>
          </div>
        </div>
      ))}
      <div className="navigation">
        <button onClick={prevSlide} className="nav-btn prev-btn">
          &#10094;
        </button>
        <button onClick={nextSlide} className="nav-btn next-btn">
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
