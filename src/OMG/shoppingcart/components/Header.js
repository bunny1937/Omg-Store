import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartContext from "../context/cartContext";
import Magnetic from "./Magnetic";
import "./Navbar.css";
import { FavouritesContext } from "./FavoritesContext";
import UserContext from "../../Auth/UserContext";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../db/Firebase";
import AniComponent1 from "./AniComponent1";
const Header = () => {
  const { user, isAdmin, setUser } = useContext(UserContext); // User context
  const { cartItems, toggleCart, state, dispatch } = useContext(cartContext); // Cart context
  const { favouriteItems } = useContext(FavouritesContext); // Favourites context
  const cartQuantity = cartItems ? cartItems.length : 0;

  const [click, setClick] = useState(false);
  const [favouriteQuantity, setFavouriteQuantity] = useState(0);

  const [dropdown, setDropdown] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);

  // const [isComponent1Open, setComponent1Open] = useState(false);

  // const handleIconClick = () => setComponent1Open(true);

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
            OMG
          </Link>
        </div>

        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <div
            className="header-container"
            onMouseEnter={() => setShowDialog(true)}
            onMouseLeave={() => setShowDialog(false)}
          >
            <p className="product-hover">Products</p>

            {showDialog && (
              <div className="product-dialog">
                <Link to={"/Home"} className="nav-links">
                  <p>All Products</p>
                </Link>
                <div className="product-category">
                  <h3>Top</h3>
                  <ul>
                    <Link to={`/pages/Oversize`}>
                      <li>Oversize</li>
                    </Link>
                    <Link to={`/pages/Tshirt/`}>
                      <li>T-Shirts</li>
                    </Link>
                    <Link to={`pages/Shirt`}>
                      <li>Shirts</li>
                    </Link>
                  </ul>
                </div>
                <div className="product-category">
                  <h3>Bottom</h3>
                  <ul>
                    <Link to={`pages/Pants`}>
                      <li>Pants</li>
                    </Link>
                    <Link to={`pages/Jeans`}>
                      <li>Jeans</li>
                    </Link>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="header-links">
            <Link to={"/Contact"} className="nav-links">
              Contact
            </Link>
          </div>
        </ul>
        <div className="header-links search-container" ref={searchContainerRef}>
          <input
            type="text"
            className="nav-links search-input"
            placeholder="Find Product..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="search-icon" />
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
