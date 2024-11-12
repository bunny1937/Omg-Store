// SimilarProducts.js
import React from "react";
import productsData from "../data/productsData";
import "./SimilarProducts.css";
import { Link } from "react-router-dom";

const SimilarProducts = ({ category, id }) => {
  // Filter products from the same category, excluding the current product
  const sameCategoryProducts = productsData.filter(
    (product) => product.category === category && product.id !== id
  );

  // Filter products from other categories
  const otherCategoryProducts = productsData.filter(
    (product) => product.category !== category
  );

  // Shuffle the otherCategoryProducts array
  const shuffledOtherCategoryProducts = otherCategoryProducts.sort(
    () => Math.random() - 0.5
  );

  // Calculate the number of similar products to display
  const numSimilarProducts = 5;

  // Calculate the number of products from the same category to display (70%)
  const numSameCategoryProducts = Math.floor(numSimilarProducts * 0.7);

  // Calculate the number of products from other categories to display (30%)
  const numOtherCategoryProducts = numSimilarProducts - numSameCategoryProducts;

  // Get the products to display
  const similarProducts = [
    ...sameCategoryProducts.slice(0, numSameCategoryProducts),
    ...shuffledOtherCategoryProducts.slice(0, numOtherCategoryProducts),
  ];

  return (
    <div className="similar-products">
      <h2>Similar Products</h2>
      <div className="products-list">
        {similarProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.title} />
            <Link to={`/Details/${product.id}`}>
              <h3>{product.title}</h3>
            </Link>
            <p>₹ {product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
