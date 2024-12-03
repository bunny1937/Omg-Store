import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./SimilarProducts.css";
import { db } from "../../db/Firebase"; // Adjust the path to your Firebase configuration

const SimilarProducts = ({ category, id }) => {
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products
        const productsRef = collection(db, "Products");
        const querySnapshot = await getDocs(productsRef);

        // Convert Firestore data into an array of product objects
        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter products from the same category, excluding the current product
        const sameCategoryProducts = allProducts.filter(
          (product) => product.category === category && product.id !== id
        );

        // Filter products from other categories
        const otherCategoryProducts = allProducts.filter(
          (product) => product.category !== category
        );

        // Shuffle the otherCategoryProducts array
        const shuffledOtherCategoryProducts = otherCategoryProducts.sort(
          () => Math.random() - 0.5
        );

        // Define the number of products to display
        const numSimilarProducts = 5;

        // Calculate number of products to display from the same category (70%)
        const numSameCategoryProducts = Math.floor(numSimilarProducts * 0.7);

        // Calculate number of products from other categories to display (30%)
        const numOtherCategoryProducts =
          numSimilarProducts - numSameCategoryProducts;

        // Combine products
        const finalSimilarProducts = [
          ...sameCategoryProducts.slice(0, numSameCategoryProducts),
          ...shuffledOtherCategoryProducts.slice(0, numOtherCategoryProducts),
        ];

        setSimilarProducts(finalSimilarProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, [category, id]);

  return (
    <div className="similar-products">
      <h2>Similar Products</h2>
      <div className="products-list">
        {similarProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.title} />
            <Link to={`/Details/${product.id}`}>
              <h2>{product.Name}</h2>
            </Link>
            <p>{product.Category}</p>
            <p>₹ {product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
