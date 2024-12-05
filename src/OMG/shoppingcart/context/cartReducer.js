const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        // If item exists, update its quantity
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // If item doesn't exist, add to cart
        return {
          ...state,
          cartItems: [...state.cartItems, product],
        };
      }
    }

    case "INIT_CART": {
      return {
        ...state,
        cartItems: action.payload || [], // Update itemTotal
      };
    }

    case "SET_CART_ITEMS":
      return { ...state, cartItems: action.payload };

    case "REMOVE_FROM_CART": {
      const { itemId, size } = action.payload;
      const updatedCartItems = state.cartItems.filter(
        (item) => !(item.id === itemId && (item.size || "N/A") === size)
      );

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case "TOGGLE_CART": {
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    }

    case "INCREMENT": {
      const { itemId } = action.payload;

      const updatedCartItems = state.cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case "DECREMENT": {
      const { itemId } = action.payload;

      const updatedCartItems = state.cartItems
        .map((item) =>
          item.id === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        cartItems: [],
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
