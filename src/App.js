// App.js
import "./App.css";
import React, { useState } from "react";
import Header from "./OMG/shoppingcart/components/Header";
import Home from "./OMG/shoppingcart/pages/Home";
import Heroui from "./OMG/Hero/Heroui";
import Cart from "./OMG/shoppingcart/components/Cart";
import Details from "./OMG/shoppingcart/components/details";
import Favourites from "./OMG/shoppingcart/components/Favourites";
import { CartProvider } from "./OMG/shoppingcart/context/cartContext";
import { FavouritesProvider } from "./OMG/shoppingcart/components/FavoritesContext";
import Tshirt from "./OMG/shoppingcart/components/pages/Tshirt";
import Shirt from "./OMG/shoppingcart/components/pages/Shirt";
import Signup from "./OMG/Auth/SignUp";
import SignIn from "./OMG/Auth/SignIn";
import { Route, Routes } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import "./OMG/shoppingcart/index.css";
import { ProtectedRoute } from "./OMG/shoppingcart/components/protectRoute/ProtectedRoute";
import AdminDash from "./OMG/Auth/AdminDash";
import { useLocation } from "react-router-dom";
import { UserProvider } from "./OMG/Auth/UserContext";
import OverSize from "./OMG/shoppingcart/components/pages/OverSize";
import Jeans from "./OMG/shoppingcart/components/pages/Jeans";
import Pants from "./OMG/shoppingcart/components/pages/Pants";
import Checkout from "./OMG/shoppingcart/components/Checkout";

function App() {
  return (
    <React.StrictMode>
      <UserProvider>
        <ParallaxProvider>
          <FavouritesProvider>
            <CartProvider>
              <Header />
              <Routes>
                <Route path="/" element={<Heroui />} />
                <Route path="/SignUp" element={<Signup />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Details/:id" element={<Details />} />
                <Route path="/Favourites" element={<Favourites />} />
                <Route path="/pages/Tshirt" element={<Tshirt />} />
                <Route path="/pages/Shirt" element={<Shirt />} />
                <Route path="/pages/Oversize" element={<OverSize />} />
                <Route path="/pages/Pants" element={<Pants />} />
                <Route path="/pages/Jeans" element={<Jeans />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/Checkout" element={<Checkout />} />
                <Route path="/AdminDash" element={<AdminDash />} />
                {/* Protected Route for Admin */}
                <Route
                  path="/AdminDash"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminDash />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </CartProvider>
          </FavouritesProvider>
        </ParallaxProvider>
      </UserProvider>
    </React.StrictMode>
  );
}

export default App;
