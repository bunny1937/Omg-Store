import { useState } from "react";
import "./page.css";
import Category1 from "./category1";
import Categorypage from "./categorypage";
import tshirt from "../pages/photos/t-shirt.png";
import shirt from "../pages/photos/shirt.png";
import oversize from "../pages/photos/clothes.png";
import jeans from "../pages/photos/jeans.png";
import cargo from "../pages/photos/pant.png";
import Tshirt from "../pages/Tshirt";
import Oversize from "../pages/OverSize";
import Shirt from "../pages/Shirt";
import Jeans from "../pages/OverSize";
import Cargo from "../pages/Cargos";
const projects = [
  {
    title: "Tshirts",
    img: tshirt,
    color: "#fff",
    page: { name: "tshirt", component: Tshirt },
  },
  {
    title: "Oversize",
    img: oversize,
    color: "#8C8C8C",
    page: { name: "oversize", component: Oversize },
  },
  {
    title: "Shirts",
    img: shirt,
    color: "#EFE8D3",
    page: { name: "shirt", component: Shirt },
  },
  {
    title: "Jeans",
    img: jeans,
    color: "#706D63",
    page: { name: "jeans", component: Jeans },
  },
  {
    title: "Cargos",
    img: cargo,
    color: "#706D63",
    page: { name: "cargo", component: Cargo },
  },
];

export default function NewCategory() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <main className="mainpage">
      <div className="category-body">
        {projects.map((project, index) => {
          return (
            <Categorypage
              index={index}
              title={project.title}
              setModal={setModal}
              key={index}
            />
          );
        })}
      </div>
      <Category1 modal={modal} projects={projects} />
    </main>
  );
}
