// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "./Mainpage.css"; // Import your CSS

// gsap.registerPlugin(ScrollTrigger);

// const ScrollAnimation = () => {
//   const divRefs = useRef([]); // Array to hold all div references

//   useEffect(() => {
//     divRefs.current.forEach((div, index) => {
//       let direction;

//       // Define directions for each div
//       if (index === 0) direction = { y: "100%" }; // Comes from the bottom
//       if (index === 1) direction = { x: "-100%" }; // Comes from the left
//       if (index === 2) direction = { x: "100%" }; // Comes from the right
//       if (index === 3) direction = { y: "-100%" }; // Comes from the top

//       gsap.fromTo(div, direction, {
//         x: 0,
//         y: 0,
//         duration: 1,
//         ease: "power1.inOut",
//         scrollTrigger: {
//           trigger: div,
//           start: "top bottom",
//           end: "top top",
//           scrub: true,
//           pin: true, // Pin each section until the animation completes
//         },
//       });
//     });
//   }, []);

//   return (
//     <div className="scroll-container">
//       {[1, 2, 3, 4].map((_, index) => (
//         <div
//           key={index}
//           ref={(el) => (divRefs.current[index] = el)} // Save refs in the array
//           className={`section section${index + 1}`}
//         >
//           Section {index + 1}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ScrollAnimation;

// // /*** paallax image and text effect*/
// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "./Mainpage.css";

// import img1 from "../shoppingcart/components/pages/photos/03dab10d1c848bdd2b16b648b1a20d4b.jpg";
// import img2 from "../shoppingcart/components/pages/photos/8029fab1b341c1bd7957dba0c32efa93.jpg";

// // Register ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// function Mainpage() {
//   const imgRef1 = useRef(null); // First instance of image 2 (side by side)
//   const imgRef2 = useRef(null); // Second instance of image 2 (scrolling)
//   const secondSectionRef = useRef(null);

//   useEffect(() => {
//     // First image fade-in animation

//     // Parallax effect for the second instance of the image
//     gsap.fromTo(
//       imgRef2.current,
//       { y: "40%" }, // Start off-screen below
//       {
//         y: "0%", // Moves up as you scroll
//         scrollTrigger: {
//           trigger: secondSectionRef.current,
//           start: "top bottom", // Starts when the second section enters the viewport
//           end: "bottom top", // Ends when the second section leaves the viewport
//           scrub: true,
//           markers: true,
//         },
//       }
//     );
//   }, []);

//   return (
//     <div className="main-container">
//       {/* Second section with the second image scrolling faster */}
//       <div ref={secondSectionRef} className="scroll-section">
//         <img
//           ref={imgRef2}
//           src={img2}
//           alt="Scrolling Image"
//           className="scrolling-img"
//         />
//         <div className="parallax-text">
//           <h2>Second Image Scrolling Effect</h2>
//           <p>This image scrolls faster as you move down the page.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Mainpage;
// import React, { useEffect, useRef } from "react";
// import Framer from "../shoppingcart/components/framer/framer";
// import { gsap } from "gsap";
// import "./Mainpage.css";

// import img from "../shoppingcart/components/pages/photos/03dab10d1c848bdd2b16b648b1a20d4b.jpg";
// import img2 from "../shoppingcart/components/pages/photos/8029fab1b341c1bd7957dba0c32efa93.jpg";
// function Mainpage() {
//   useEffect(() => {
//     const image = document.querySelector(".image");
//     gsap.from(image, {
//       opacity: 0, // start with 0 opacity
//       scale: 1.5, // start with a smaller scale
//       duration: 1.5,
//       ease: "power1.inOut",
//       delay: 0.5,
//     });
//   }, []);
//   const boxRef = useRef(null);

//   useEffect(() => {
//     gsap.to(boxRef.current, { rotation: 360, duration: 2 });
//   }, []);
//   return (
//     <>
//       {/* <div className="row">
//         <div className="column">
//           <img src={img} alt="hehe" />
//         </div>
//         <div className="column image ">
//           <img src={img2} alt="hehe" />
//         </div>
//       </div> */}
//       <div>
//         <div
//           ref={boxRef}
//           style={{ width: "100px", height: "100px", backgroundColor: "red" }}
//         >
//           Rotate me!
//         </div>
//       </div>
//     </>
//   );
// }

// export default Mainpage;

/* <Tween
        to={{
          x: "300px",
          scrollTrigger: {
            trigger: ".square",
            start: "-200px center",
            end: "200px center",
            scrub: 0.5,
            markers: true,
          },
        }}
      >
        <div
          className="square"
          style={{ width: "100px", height: "100px", background: "#ccc" }}
        />
      </Tween> */

/**overriding sections */ // src/App.js// Import necessary modules
// import React, { useEffect, useRef } from "react";
// import { Controller, Scene } from "scrollmagic";
// import { TweenMax, TimelineMax } from "gsap";

// // Define the CSS styles in a JavaScript object or use a CSS-in-JS library
// const styles = {
//   pinContainer: {
//     width: "100%",
//     height: "100%",
//     overflow: "hidden",
//     perspective: "1000px",
//   },
//   slideContainer: {
//     width: "400%", // to contain 4 panels, each with 100% of window width
//     height: "100%",
//   },
//   panel: {
//     height: "100%",
//     width: "25%", // relative to parent -> 25% of 400% = 100% of window width
//     float: "left",
//   },
//   blue: { backgroundColor: "blue" },
//   turqoise: { backgroundColor: "turquoise" },
//   green: { backgroundColor: "green" },
//   bordeaux: { backgroundColor: "bordeaux" },
// };

// // Define the component
// const Mainpage = () => {
//   const pinContainerRef = useRef(null);
//   const slideContainerRef = useRef(null);

//   useEffect(() => {
//     // Initialize ScrollMagic controller
//     const controller = new Controller();

//     // Define the animation timeline
//     const wipeAnimation = new TimelineMax()
//       .to(slideContainerRef.current, 0.5, { z: -150 }) // move back in 3D space
//       .to(slideContainerRef.current, 1, { x: "-25%" }) // move in to first panel
//       .to(slideContainerRef.current, 0.5, { z: 0 }) // move back to origin in 3D space
//       .to(slideContainerRef.current, 0.5, { z: -150, delay: 1 }) // animate to third panel
//       .to(slideContainerRef.current, 1, { x: "-50%" })
//       .to(slideContainerRef.current, 0.5, { z: 0 }) // move back to origin in 3D space
//       .to(slideContainerRef.current, 0.5, { z: -150, delay: 1 }) // animate to fourth panel
//       .to(slideContainerRef.current, 1, { x: "-75%" })
//       .to(slideContainerRef.current, 0.5, { z: 0 });

//     // Create ScrollMagic scene
//     new Scene({
//       triggerElement: pinContainerRef.current,
//       triggerHook: "onLeave",
//       duration: "500%",
//     })
//       .setPin(pinContainerRef.current)
//       .setTween(wipeAnimation)
//       .addIndicators() // add indicators (requires plugin)
//       .addTo(controller);

//     // Cleanup on unmount
//     return () => {
//       controller.destroy();
//     };
//   }, []);

//   return (
//     <div ref={pinContainerRef} style={styles.pinContainer}>
//       <div ref={slideContainerRef} style={styles.slideContainer}>
//         <section style={{ ...styles.panel, ...styles.blue }}>
//           <b>ONE</b>
//         </section>
//         <section style={{ ...styles.panel, ...styles.turqoise }}>
//           <b>TWO</b>
//         </section>
//         <section style={{ ...styles.panel, ...styles.green }}>
//           <b>THREE</b>
//         </section>
//         <section style={{ ...styles.panel, ...styles.bordeaux }}>
//           <b>FOUR</b>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Mainpage;
