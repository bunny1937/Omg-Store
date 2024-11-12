/* eslint-disable react/prop-types */
import React from "react";
import Button from "./Button";
import "./Categorynew.css";

function Product({ val, mover, count }) {
  return (
    <div className="w-full py-20 h-[23rem] text-white">
      <div
        onMouseEnter={() => {
          mover(count);
        }}
        className="max-w-screen-xl mx-auto flex items-center justify-between"
      >
        <h1 className="text-5xl capitalize font-medium">{val.title}</h1>
        <div className="dets w-1/4">
          <div className="flex items-center gap-5">
            {val.live && <Button title="Live Project" />}
            {val.case && <Button title="Case Study" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
