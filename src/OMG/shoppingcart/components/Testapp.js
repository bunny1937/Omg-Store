import React, { useContext } from "react";
import cartContext, { CartProvider } from "../context/cartContext";

const TestComponent = () => {
  const cart = useContext(cartContext);
  console.log("Cart Context in TestComponent:", cart);

  return (
    <div>
      <h1>Test Component</h1>
      {cart && cart.state ? (
        <p>Cart is {cart.state.isCartOpen ? "Open" : "Closed"}</p>
      ) : (
        <p>Context is undefined</p>
      )}
    </div>
  );
};

export const TestApp = () => (
  <CartProvider>
    <TestComponent />
  </CartProvider>
);

export default TestComponent;
