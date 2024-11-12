import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Cart from "./Cart";
import cartContext from "../context/cartContext";

describe("Cart Component", () => {
  const mockContextValue = {
    toggleCart: jest.fn(),
    removeItem: jest.fn(),
    incrementItem: jest.fn(),
    decrementItem: jest.fn(),
    isCartOpen: true,
    cartItems: [],
    dispatch: jest.fn(),
  };
});
