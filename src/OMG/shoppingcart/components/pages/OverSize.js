import React from "react";
import productsData from "../../data/productsData";
function OverSize() {
  const Oversizes = productsData.filter(
    (item) => item.category === "Oversizes"
  );

  return (
    <div>
      <h2>Oversize</h2>
      <ul>
        {Oversizes.map((item) => (
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

export default OverSize;
