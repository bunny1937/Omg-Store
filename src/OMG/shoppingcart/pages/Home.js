import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ProductsCard from "../components/ProductsCard";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "../../db/Firebase";
import Cart from "../components/Cart";

const Home = () => {
  const [products, setProducts] = useState([]);
  const firestore = getFirestore(firebaseApp);
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(firestore, "Products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // capturing the document ID
        ...doc.data(), // spreading the rest of the document data
      }));
      setProducts(productsData);
    };

    fetchProducts();
  }, [firestore]);

  const [sortBy, setSortBy] = useState("none");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [tempPriceRange, setTempPriceRange] = useState([0, 2000]);
  const [tempSelectedCategory, setTempSelectedCategory] = useState("");

  useEffect(() => {
    let filtered = products.filter((product) => {
      return (
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (selectedCategory ? product.Category === selectedCategory : true)
      );
    });

    if (sortBy === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "avgCustomerReview") {
      // Implement avg customer review sorting logic here (Assuming you have reviews data)
    } else if (sortBy === "newestArrivals") {
      // Implement newest arrivals sorting logic here (Assuming you have a date field)
    }

    setFilteredProducts(filtered);
  }, [products, priceRange, selectedCategory, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePriceRangeChange = (index) => (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newTempPriceRange = [...tempPriceRange];
      newTempPriceRange[index] = value === "" ? "" : parseInt(value, 10);
      setTempPriceRange(newTempPriceRange);
    }
  };

  const handleCategoryChange = (e) => {
    setTempSelectedCategory(e.target.value);
  };

  const categoriesOptions = products.reduce((acc, product) => {
    if (!acc.includes(product.Category)) {
      acc.push(product.Category);
    }
    return acc;
  }, []);

  const handleDialogOpen = () => {
    setOpenDialog(true);
    setTempPriceRange(priceRange);
    setTempSelectedCategory(selectedCategory);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const Portal = ({ children }) => {
    return createPortal(children, document.body);
  };

  const handleClear = () => {
    setSortBy("none");
    setPriceRange([0, 2000]);
    setSelectedCategory("");
    setTempPriceRange([0, 2000]);
    setTempSelectedCategory("");
  };

  const handleApply = () => {
    setPriceRange(tempPriceRange);
    setSelectedCategory(tempSelectedCategory);
    setOpenDialog(false);
  };

  return (
    <>
      <section id="home">
        <div className="container">
          <div className="filter-section">
            <button onClick={handleDialogOpen}>Filters</button>
            <div className="sort-box">
              <label>
                Sort by:
                <select value={sortBy} onChange={handleSortChange}>
                  <option value="none">None</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                  <option value="avgCustomerReview">
                    Avg. Customer Review
                  </option>
                  <option value="newestArrivals">Newest Arrivals</option>
                </select>
              </label>
            </div>
          </div>
          {openDialog && (
            <Portal>
              <div className="dialog">
                <div className="dialog-content">
                  <h2>Filters</h2>
                  <button className="close" onClick={handleDialogClose}>
                    &times;
                  </button>
                  <div className="price-range-slider">
                    <label>
                      Price Range:
                      <div className="range-inputs">
                        <input
                          type="number"
                          value={tempPriceRange[0]}
                          onChange={handlePriceRangeChange(0)}
                          onFocus={(e) => e.target.select()}
                        />
                        <input
                          type="number"
                          value={tempPriceRange[1]}
                          onChange={handlePriceRangeChange(1)}
                          onFocus={(e) => e.target.select()}
                        />
                      </div>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={tempPriceRange[0]}
                      onInput={handlePriceRangeChange(0)} // Use onInput for smooth sliding
                    />
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={tempPriceRange[1]}
                      onInput={handlePriceRangeChange(1)} // Use onInput for smooth sliding
                    />
                  </div>
                  <br />
                  <label>
                    Categories:
                    <select
                      value={tempSelectedCategory}
                      onChange={handleCategoryChange}
                    >
                      <option value="">Select category</option>
                      {categoriesOptions.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>
                  <br />
                  <button className="clear-btn" onClick={handleClear}>
                    Clear
                  </button>
                  <button className="apply-btn" onClick={handleApply}>
                    Apply
                  </button>
                </div>
              </div>
            </Portal>
          )}
          <div className="home_content">
            {filteredProducts.map((product, index) => {
              return (
                <ProductsCard
                  key={`${product.id}_${index}`}
                  id={product.id}
                  {...product}
                />
              );
            })}
          </div>
        </div>
      </section>
      <Cart />
    </>
  );
};

export default Home;
