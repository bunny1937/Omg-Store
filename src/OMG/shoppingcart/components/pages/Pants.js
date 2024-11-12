import React from "react";
import productsData from "../../data/productsData";
function Pants() {
  const Pants = productsData.filter((item) => item.category === "Pants");

  return (
    <div>
      <h2>Pants</h2>
      <ul>
        {Pants.map((item) => (
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

export default Pants;
