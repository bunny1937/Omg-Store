import React, { useState } from "react";
import "./demo.css";
import { Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Carousel from "react-material-ui-carousel";

const ProductDetailPage = () => {
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  const toggleContent = (type) => {
    if (type === "description") {
      setDescriptionOpen(!descriptionOpen);
    } else if (type === "shipping") {
      setShippingOpen(!shippingOpen);
    }
  };

  const images = [
    { src: "big-image.jpg", alt: "Big Image" },
    { src: "small-image1.jpg", alt: "Small Image 1" },
    { src: "small-image2.jpg", alt: "Small Image 2" },
  ];

  return (
    <div className="demo-container">
      <div className="left">
        <Carousel>
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="carousel-image"
            />
          ))}
        </Carousel>
      </div>

      <div className="right">
        <div className="product-details">
          <h1>Product Name</h1>
          <p>Price: $99.99</p>
          <IconButton aria-label="add to favorites" color="primary">
            ❤️ {/* Add favorite button or similar functionality */}
          </IconButton>
        </div>

        <div className="accordion">
          <div>
            <h3
              onClick={() => toggleContent("description")}
              className="accordion-header"
            >
              Product Description
              <ExpandMoreIcon
                className={`expand-icon ${descriptionOpen ? "expanded" : ""}`}
              />
            </h3>
            <Collapse in={descriptionOpen}>
              <div className="accordion-content">
                <p>
                  This is the product description. It could be quite long, so
                  the accordion is perfect for this.
                </p>
              </div>
            </Collapse>
          </div>

          <div>
            <h3
              onClick={() => toggleContent("shipping")}
              className="accordion-header"
            >
              Shipping & Returns
              <ExpandMoreIcon
                className={`expand-icon ${shippingOpen ? "expanded" : ""}`}
              />
            </h3>
            <Collapse in={shippingOpen}>
              <div className="accordion-content">
                <p>
                  This is the shipping and return details. Add details such as
                  estimated delivery time, return policy, etc.
                </p>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

// <!-- <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Document</title>
//   </head>
//   <body>
//     <style>
//       * {
//     box-sizing: border-box;
// }

// /* Create two equal columns that floats next to each other */
// .column {
//     float: left;
//     width: 50%;
//     padding: 10px;
//     height: 300px; /* Should be removed. Only for demonstration */
// }

// /* Clear floats after the columns */
// .row:after {
//     content: "";
//     display: table;
//     clear: both;
// }

// /* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
// @media screen and (max-width: 600px) {
//     .column {
//         width: 100%;
//     }
// }
//     </style>
//       <h2>Nitrogen</h2>
//       <p>Resize the browser window to see the responsive effect (the columns will stack on top of each other instead of floating next to each other, when the screen is less than 600px wide).</p>

//       <div class="row">
//       <div class="column" style="background-color:green;">
//         <h2>Column 1</h2>
//         <p>Some text..</p>
//       </div>
//       <div class="column" style="background-color:red;">
//         <h2>Column 2</h2>
//         <p>Some text..</p>
//       </div>
//       </div>
//   </body>
// </html> -->
