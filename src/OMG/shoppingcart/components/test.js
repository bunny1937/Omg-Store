import React, { useEffect, useState } from "react";
import axios from "axios";
function Test() {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/getProducts")
      .then((Products) => setProducts(Products.data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      {Products.map((item) => {
        <>
          <div>{item.id}</div>
          <div>{item.quantity}</div>
          <div>{item.price}</div>
          <div>{item.title}</div>
        </>;
      })}
    </div>
  );
}

export default Test;
