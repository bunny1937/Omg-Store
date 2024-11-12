import { createContext, useState, useEffect } from "react";

const FavouritesContext = createContext();

const FavouritesProvider = ({ children }) => {
  const [favouriteItems, setFavouriteItems] = useState([]);
  // const [favourites, setFavourites] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites && storedFavourites !== "undefined") {
      setFavouriteItems(JSON.parse(storedFavourites));
    }
  }, []);

  useEffect(() => {
    if (favouriteItems) {
      localStorage.setItem("favourites", JSON.stringify(favouriteItems));
    } else {
      localStorage.setItem("favourites", "[]");
    }
  }, [favouriteItems]);

  const addFavourite = (item) => {
    const existingItem = favouriteItems.find((i) => i.id === item.id);
    if (!existingItem) {
      setFavouriteItems((prevItems) => [...prevItems, item]);
      setNotification(`Added ${item.title} to favourites!`);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };
  // const addItemToFavourites = (item) => {
  //   setFavourites((prevFavourites) => [...prevFavourites, item]);
  //   setNotification(`Added ${item.title} to favourites!`);
  //   setTimeout(() => {
  //     setNotification(null);
  //   }, 3000);
  // };
  // const addFavourite = (item) => {
  //   setFavouriteItems((prevItems) => [...prevItems, item]);
  // };

  // const removeFavourite = (id) => {
  //   setFavourites((prevFavourites) =>
  //     prevFavourites.filter((item) => item.id !== id)
  //   );
  // };
  const removeFavouriteItem = (id) => {
    setFavouriteItems(favouriteItems.filter((i) => i.id !== id));
  };

  const removeAllFavourites = () => {
    setFavouriteItems([]);
  };
  return (
    <FavouritesContext.Provider
      value={{
        // favourites,
        // removeFavouriteItem,

        // favouriteItems,
        // setFavouriteItems,
        // addFavourite,
        // addItemToFavourites,
        // removeFavourite,
        // removeAllFavourites,
        // notification,
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
