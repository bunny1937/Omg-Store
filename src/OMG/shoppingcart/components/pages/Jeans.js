import React from "react";
import productsData from "../../data/productsData";
function Jeans() {
  const Jeans = productsData.filter((item) => item.category === "Jeans");

  return (
    <div>
      <h2>jeans</h2>
      <ul>
        {Jeans.map((item) => (
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

export default Jeans;
