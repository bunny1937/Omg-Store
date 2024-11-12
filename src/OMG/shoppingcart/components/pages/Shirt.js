import React from "react";
import productsData from "../../data/productsData";

function Tshirt() {
  const Shirts = productsData.filter((item) => item.category === "Shirts");

  return (
    <div>
      <h2>Shirts</h2>
      <ul>
        {Shirts.map((item) => (
          <li key={item.id}>
            <img src={item.img} alt={item.title} />
            <h4>{item.title}</h4>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tshirt;
