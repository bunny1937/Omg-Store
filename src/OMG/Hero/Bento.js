import React from "react";
import "./Bento.css";

const RefinedBentoGrid = () => {
  return (
    <div className="bento-grid-refined">
      {/* Row 1 */}
      <div className="grid-item large creative-highlight">
        <div className="overlay-content">
          <h1>Awaken Your Spirit</h1>
          <p>Modern, spiritual apparel that blends confidence and elegance.</p>
        </div>
      </div>
      <div className="grid-item medium video">
        <video autoPlay loop muted>
          <source src="path_to_catalog_video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="grid-item small illustration">
        <img
          src="path_to_minimal_illustration.svg"
          alt="Minimalist Illustration"
        />
        <div className="overlay-text">Elevate Your Style</div>
      </div>

      {/* Row 2 */}
      <div className="grid-item medium image">
        <img src="path_to_hoodie_image.jpg" alt="Hoodie Highlight" />
        <div className="overlay-text">Oversized Hoodies</div>
      </div>
      <div className="grid-item small infographic">
        <div className="info-content">
          <h3>95% Sustainable</h3>
          <p>Crafted with eco-friendly fabrics.</p>
        </div>
      </div>
      <div className="grid-item medium fabric">
        <img
          src="path_to_fabric_texture.jpg"
          alt="Premium Fabric Texture"
          className="image"
        />
        <div className="overlay-text">Feel the Difference</div>
      </div>

      {/* Row 3 */}
      <div className="grid-item large stats">
        <h2>Customer Favorites</h2>
        <ul>
          <li>Relaxed Fit Pants</li>
          <li>Oversized T-Shirts</li>
          <li>Limited Edition Hoodies</li>
        </ul>
      </div>
      <div className="grid-item small testimonial">
        <p>"This isn't just fashion; it's a way of life!"</p>
      </div>
    </div>
  );
};

export default RefinedBentoGrid;
