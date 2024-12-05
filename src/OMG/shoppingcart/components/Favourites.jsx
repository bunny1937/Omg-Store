import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavouritesContext } from "./FavoritesContext";
import "./Favourites.css";

const Favourites = () => {
  const { favouriteItems, notification, removeFavourite, removeAllFavourites } =
    useContext(FavouritesContext);

  return (
    <div className="favourite-section">
      <h2>Favourites</h2>
      {notification && <div className="notification">{notification}</div>}
      <ul className="fav-list">
        {favouriteItems.map((item) => (
          <>
            <li className="fav-list-li" key={item.id}>
              <img src={item.img} alt="item-img" />
              <Link to={`/Details/${item.id}`}>
                <h4>{item.title}</h4>
              </Link>
              <p>₹ {item.price.toLocaleString()}</p>
              <p>Quantity: {item.quantity}</p>
              <button
                className="remove-btn"
                onClick={() => removeFavourite(item.id)}
              >
                Remove
              </button>
            </li>
          </>
        ))}
      </ul>
      {favouriteItems.length > 0 && (
        <button className="remove-all-btn" onClick={removeAllFavourites}>
          Remove All
        </button>
      )}
    </div>
  );
};

export default Favourites;
