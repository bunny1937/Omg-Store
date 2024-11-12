import React, {
  createContext,
  useReducer,
  useState,
  useEffect,
  useContext,
} from "react";
import { firestore, auth } from "../../db/Firebase";
import {
  doc,
  getDocs,
  getDoc,
  updateDoc,
  setDoc,
  collection,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import cartReducer from "./cartReducer";
import UserContext from "../../Auth/UserContext";

/* Cart Context */
/* Initial State */

const cartContext = createContext({
  state: null,
  dispatch: () => null,
});
const initialState = {
  isCartOpen: false,
  cartItems: [],
  cartQuantity: 0,
  // Make sure this is the default state
};
/* Cart-Provider Component */
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useContext(UserContext); // Accessing user from UserContext
  //Dispatched Actions
  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };
  const cartQuantity = state.cartItems?.length || 0; // Safe fallback for no items
  // Initialize Cart from Firestore
  const initCart = async () => {
    if (!user?.uid) return;

    const userCartRef = collection(firestore, "users", user.uid, "Cart");

    try {
      const cartSnapshot = await getDocs(userCartRef);
      if (!cartSnapshot.empty) {
        const cartItems = cartSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Dispatch to initialize cart in reducer
        dispatch({ type: "INIT_CART", payload: cartItems });
      }
    } catch (error) {
      console.error("Error fetching cart from Firestore:", error);
    }
  };
  useEffect(() => {
    if (user?.uid) {
      initCart();
    }
  }, [user]);
  // Add item to cart and Firestore
  const addItem = async (item) => {
    if (!user?.uid) return;
    try {
      // Ensure the item has all necessary properties before adding
      if (
        !item.id ||
        !item.Img ||
        !item.Name ||
        !item.price ||
        !item.quantity ||
        !item.Category
      ) {
        console.error("Invalid item in ADD_TO_CART action:", item);
        return;
      }

      // Add item to Firestore (or update if it already exists)
      const cartDocRef = doc(firestore, "users", user.uid, "Cart", item.id);

      await setDoc(cartDocRef, item); // Firestore operation

      // Once Firestore is updated, update local state
      dispatch({ type: "ADD_TO_CART", payload: item });

      console.log("Item added to cart:", item);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Remove item from cart and Firestore
  const removeItem = async (itemId, size = null) => {
    try {
      const userId = auth.currentUser.uid; // Replace with your auth mechanism
      const cartDocRef = doc(firestore, "users", userId, "Cart", itemId);

      // Delete from Firestore
      await deleteDoc(cartDocRef);
      setTimeout(() => {
        // Remove from local state
        dispatch({ type: "REMOVE_FROM_CART", payload: { itemId } });
      }, 100); // 100ms delay before dispatching

      // Now remove from local state
      dispatch({ type: "REMOVE_FROM_CART", payload: itemId, size });

      console.log(`Item ${itemId} removed from cart`);
    } catch (error) {
      console.error("Error removing item from Firestore:", error);
    }
  }; // Increment item quantity
  const incrementItem = async (itemId) => {
    if (!user?.uid) return;

    const itemDocRef = doc(firestore, "users", user.uid, "Cart", itemId);

    try {
      const cartItemDoc = await getDoc(itemDocRef);
      const updatedItem = {
        ...cartItemDoc.data(),
        quantity: (cartItemDoc.data().quantity || 0) + 1,
      };

      await updateDoc(itemDocRef, updatedItem);
      dispatch({ type: "INCREMENT", payload: { itemId } });
    } catch (error) {
      console.error("Error incrementing item quantity in Firestore:", error);
    }
  };

  // Decrement item quantity
  const decrementItem = async (itemId) => {
    if (!user?.uid) return;

    const itemDocRef = doc(firestore, "users", user.uid, "Cart", itemId);

    try {
      const cartItemDoc = await getDoc(itemDocRef);
      if (cartItemDoc.exists()) {
        const updatedItem = {
          ...cartItemDoc.data(),
          quantity: Math.max((cartItemDoc.data().quantity || 0) - 1, 0),
        };

        await updateDoc(itemDocRef, updatedItem);
        dispatch({ type: "DECREMENT", payload: { itemId } });
      }
    } catch (error) {
      console.error("Error decrementing item quantity in Firestore:", error);
    }
  };

  // Clear the cart locally and in Firestore
  const clearCart = async () => {
    if (!user?.uid) return;

    const userCartRef = doc(firestore, "users", user.uid);

    try {
      dispatch({ type: "CLEAR_CART" });
      await updateDoc(userCartRef, { cartItems: [] });
    } catch (error) {
      console.error("Error clearing cart in Firestore:", error);
    }
  };

  // Initialize cart when userId changes (i.e., on login/logout)
  useEffect(() => {
    if (user?.uid) {
      initCart();
    }
  }, [user]);

  // Context values
  const values = {
    ...state,
    initCart,
    dispatch,
    addItem,
    removeItem,
    incrementItem,
    cartQuantity,
    isCartOpen: state.isCartOpen,
    cartItems: state.cartItems,
    decrementItem,
    toggleCart,
    clearCart,
  };

  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default cartContext;
export { CartProvider };

// import React, { createContext, useReducer } from "react";
// import cartReducer from "./cartReducer";

// /* Cart Context */
// const cartContext = createContext();

// /* Initial State */
// const initialState = {
//   cartItems: [],
// };
// /* Cart-Provider Component */
// const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   /* Dispatched Actions */
//   const initCart = () => {
//     const storedCartItems = localStorage.getItem("cartItems");
//     if (storedCartItems) {
//       dispatch({
//         type: "INIT_CART",
//         payload: JSON.parse(storedCartItems),
//       });
//     }
//   };
//   const toggleCart = (toggle) => {
//     return dispatch({
//       type: "TOGGLE_CART",
//       payload: {
//         toggle,
//       },
//     });
//   };

//   const addItem = (item) => {
//     return dispatch({
//       type: "ADD_TO_CART",
//       payload: {
//         item,
//       },
//     });
//   };

//   const removeItem = (itemId, size) => {
//     return dispatch({
//       type: "REMOVE_FROM_CART",
//       payload: {
//         itemId,
//         size,
//       },
//     });
//   };

//   const incrementItem = (itemId) => {
//     return dispatch({
//       type: "INCREMENT",
//       payload: {
//         itemId,
//       },
//     });
//   };

//   const decrementItem = (itemId) => {
//     return dispatch({
//       type: "DECREMENT",
//       payload: {
//         itemId,
//       },
//     });
//   };

//   const clearCart = () => {
//     return dispatch({
//       type: "CLEAR_CART",
//     });
//   };

//   // Context values
//   const values = {
//     ...state,
//     toggleCart,
//     initCart,
//     addItem,
//     removeItem,
//     incrementItem,
//     decrementItem,
//     dispatch,
//     clearCart,
//   };

//   return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
// };

// export default cartContext;
// export { CartProvider };
