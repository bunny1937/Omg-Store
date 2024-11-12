import React from "react";
import "./categorypage.css";
export default function Categorypage({ index, title, setModal }) {
  return (
    <div
      onMouseEnter={() => {
        setModal({ active: true, index });
      }}
      onMouseLeave={() => {
        setModal({ active: false, index });
      }}
      className="categoryproject"
    >
      <h2>{title}</h2>
    </div>
  );
}
