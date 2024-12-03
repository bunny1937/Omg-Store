import { createContext, useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { getAuth } from "firebase/auth"; // To get the current user
import { onAuthStateChanged } from "firebase/auth";
const FavouritesContext = createContext();

const FavouritesProvider = ({ children }) => {
  const [favouriteItems, setFavouriteItems] = useState([]);
  const [notification, setNotification] = useState(null);
  const [userId, setUserId] = useState(null); // State to hold userId
  const db = getFirestore();
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set user ID when authenticated
      } else {
        setUserId(null); // Reset when user logs out
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [auth]);

  useEffect(() => {
    // Fetch favorites from Firestore
    if (userId) {
      const fetchFavourites = async () => {
        try {
          const userDoc = doc(db, "users", userId, "Favourites");
          const userFavourites = await getDoc(userDoc);
          if (userFavourites.exists()) {
            const items = userFavourites.data().items || [];
            setFavouriteItems(items);
          }
        } catch (error) {
          console.error("Error fetching favourites:", error);
        }
      };
      fetchFavourites();
    }
  }, [userId]);

  useEffect(() => {
    // Save favorites to Firestore
    if (userId) {
      const saveFavourites = async () => {
        try {
          const favouritesCollection = collection(
            db,
            "users",
            userId,
            "Favourites"
          );
          const snapshot = await getDoc(favouritesCollection);
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFavouriteItems(items);
        } catch (error) {
          console.error("Error saving favourites:", error);
        }
      };
      saveFavourites();
    }
  }, [favouriteItems, userId]);

  const addFavourite = async (item) => {
    if (!userId) {
      console.error("User not authenticated.");
      return;
    }

    if (!item || !item.id || !item.size) {
      console.error("Invalid item or missing size:", item);
      return;
    }

    const favouriteId = `${item.id}`; // Create a unique ID based on product ID and size
    const itemRef = doc(db, "users", userId, "Favourites", favouriteId); // Use doc() to construct a valid document reference

    try {
      await setDoc(itemRef, item); // Save the item to Firestore
      setFavouriteItems((prev) => [...prev, item]);
      console.log("Item added to favourites:", item);
    } catch (error) {
      console.error("Error saving favourite item:", error);
    }
  };

  const removeFavouriteItem = async (id) => {
    if (!userId) return;

    try {
      const itemRef = doc(db, "users", userId, "Favourites", id);
      await deleteDoc(itemRef); // Remove from Firestore
      setFavouriteItems((prevItems) => prevItems.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Error removing favourite item:", error);
    }
  };

  const removeAllFavourites = async () => {
    if (!userId) return;

    try {
      const favouritesCollection = collection(
        db,
        "users",
        userId,
        "Favourites"
      );
      const snapshot = await getDoc(favouritesCollection);
      const batch = db.batch();

      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit(); // Batch delete all documents
      setFavouriteItems([]);
    } catch (error) {
      console.error("Error removing all favourites:", error);
    }
  };

  return (
    <FavouritesContext.Provider
      value={{
        favouriteItems,
        addFavourite,
        removeFavouriteItem,
        removeAllFavourites,
        notification,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export { FavouritesProvider, FavouritesContext };
