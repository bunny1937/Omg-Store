import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartContext from "../context/cartContext";
import "./Navbar.css";
import { FavouritesContext } from "./FavoritesContext";
import UserContext from "../../Auth/UserContext";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../db/Firebase";
import logoblack from "./pages/photos/OMGstore.svg";
const Header = () => {
  const { user, isAdmin, setUser } = useContext(UserContext); // User context
  const { cartItems, dispatch } = useContext(cartContext); // Cart context
  const { favouriteItems } = useContext(FavouritesContext); // Favourites context
  const cartQuantity = cartItems ? cartItems.length : 0;
  const [click, setClick] = useState(false);
  const [favouriteQuantity, setFavouriteQuantity] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]); // Dynamic categories

  const logout = () => {
    localStorage.clear();
    setUser(null); // Clear the user context state
    navigate("/SignIn");
  };

  const handleSearchResultClick = (id) => {
    setSearchQuery(""); // Clear the search query
    setFilteredProducts([]);
    navigate(`/details/${id}`);
  };

  // Fetch products for the search
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredProducts = products.filter((product) =>
      product.Name?.toLowerCase().includes(query)
    );
    setFilteredProducts(filteredProducts);
    setShowResults(true);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const categorySet = new Set();
        querySnapshot.forEach((doc) => {
          const { Category } = doc.data();
          if (Category) {
            categorySet.add(Category); // Add category to set to avoid duplicates
          }
        });
        setCategories([...categorySet]); // Convert set to array for rendering
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  const topCategories = ["Tshirts", "Hoodies", "Oversize"]; // Adjust as needed
  const bottomCategories = ["Pants", "Jeans"]; // Adjust as needed

  useEffect(() => {
    if (favouriteItems) {
      setFavouriteQuantity(favouriteItems.length); // Update favourite quantity
    }
  }, [favouriteItems]);

  const handleDropdown = () => setDropdown(!dropdown);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // Hide search results when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  const handleToggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };
  return (
    <div className="navbar">
      <div className="navbar-container">
        {/* <button onClick={handleIconClick}>Open Component 1</button>
        {isComponent1Open && (
          <AniComponent1 onClose={() => setComponent1Open(false)} />
        )} */}
        <div className="header-links">
          <Link to={"/"} className="navbar-logo" onClick={closeMobileMenu}>
            <img src={logoblack} alt="hehe" />
          </Link>
        </div>

        <div className="menu-icon" onClick={handleClick}>
          <span style={{ color: "white" }}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </span>
        </div>
        <span style={{ color: "white" }}>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* Dropdown for Collections */}
            <div className="dropdown-wrapper">
              <div
                className="dropdown-trigger"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <p className="hover-text">Collections</p>
                <div className="underline"></div>
              </div>

              {isDropdownOpen && (
                <div className="dropdown-content">
                  {/* Top Categories */}
                  <div className="dropdown-submenu">
                    <h4 className="submenu-title">Top</h4>
                    <ul>
                      {categories
                        .filter((category) => topCategories.includes(category))
                        .map((category) => (
                          <li key={category}>
                            <Link
                              to={`/category/${category}`}
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {category}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Bottom Categories */}
                  <div className="dropdown-submenu">
                    <h4 className="submenu-title">Bottom</h4>
                    <ul>
                      {categories
                        .filter((category) =>
                          bottomCategories.includes(category)
                        )
                        .map((category) => (
                          <li key={category}>
                            <Link
                              to={`/category/${category}`}
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {category}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="header-links">
              <Link to={"/Home"} className="all-products">
                <p>All Products</p>
              </Link>
            </div>
            <div className="header-links">
              <Link to={"/Contact"} className="navbar-links">
                <p> Contact</p>
              </Link>
            </div>

            {/* <>
            <button onClick={() => setShowComponent1(true)}>Component1</button>
            {showComponent1 && (
              <AniComponent1 onClose={() => setShowComponent1(false)} />
            )}
          </> */}
          </ul>
        </span>
        <div className="search-join">
          <div
            className="header-links search-container"
            ref={searchContainerRef}
          >
            <i
              className="fa-solid fa-magnifying-glass search-icon"
              style={{ color: "#000000" }}
            ></i>
            <input
              type="text"
              className="nav-links search-input"
              placeholder="Find Product..."
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && showResults && filteredProducts.length > 0 && (
              <div className="search-results">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSearchResultClick(product.id)}
                    className="search-result-item"
                  >
                    <div className="product-details-container">
                      <div className="product-info">
                        <h2>{product.Name}</h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {searchQuery && showResults && filteredProducts.length === 0 && (
              <p className="no-results">No products found</p>
            )}
          </div>
        </div>
        <div className="header-links user-container">
          <div onClick={handleDropdown} className="user-icon">
            {user && isAdmin && <span>Admin</span>}
          </div>

          {dropdown && (
            <ul className="dropdown-menu">
              {user ? (
                <li onClick={logout}>Logout</li>
              ) : (
                <>
                  <li>
                    <Link to={"/SignUp"} onClick={() => setDropdown(false)}>
                      SignUp
                    </Link>
                  </li>
                  <li>
                    <Link to={"/SignIn"} onClick={() => setDropdown(false)}>
                      SignIn
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
        <div className="header-links">
          <Link to={"/Favourites"}>
            <div className="fav-icon">
              {favouriteQuantity >= 1 && (
                <span className="badge">{favouriteQuantity}</span>
              )}
            </div>
            <p className="favourites-text">Favourites</p>
          </Link>
        </div>

        <div className="header-links">
          <div title="Cart" className="cart_icon" onClick={handleToggleCart}>
            <div className="bag-icon" alt="bag-icon" />
            {cartQuantity >= 1 && <span className="badge">{cartQuantity}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
