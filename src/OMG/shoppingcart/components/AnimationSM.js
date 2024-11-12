// import React, { useEffect, useRef } from "react";
// import ScrollMagic from "scrollmagic";
// import "./AnimationSM.css";

// const AnimationSM = () => {
//   const revealElementsRef = useRef([]);
//   const controllerRef = useRef(null);

//   useEffect(() => {
//     const controller = new ScrollMagic.Controller();
//     controllerRef.current = controller;

//     revealElementsRef.current.forEach((element, index) => {
//       new ScrollMagic.Scene({
//         triggerElement: element,
//         offset: 50,
//         triggerHook: 0.9,
//       })
//         .setClassToggle(element, "visible")
//         .addIndicators({ name: `digit ${index + 1}` })
//         .addTo(controller);
//     });

//     return () => {
//       controller.destroy();
//     };
//   }, []);

//   return (
//     <div>
//       <div className="spacer s2"></div>
//       <div className="spacer s0"></div>
//       <div className="box2 white">
//         <p>
//           Multiple elements can be looped over and animated as they enter the
//           viewport.
//         </p>
//         <a href="#" className="viewsource">
//           view source
//         </a>
//       </div>
//       <div className="spacer s0"></div>
//       <div id="reveal-elements">
//         <div
//           className="box1 digit blue"
//           ref={(element) => (revealElementsRef.current[0] = element)}
//         >
//           <p>1</p>
//         </div>
//         <div
//           className="box1 digit turqoise"
//           ref={(element) => (revealElementsRef.current[1] = element)}
//         >
//           <p>2</p>
//         </div>
//         <div
//           className="box1 digit red"
//           ref={(element) => (revealElementsRef.current[2] = element)}
//         >
//           <p>3</p>
//         </div>
//         <div
//           className="box1 digit green"
//           ref={(element) => (revealElementsRef.current[3] = element)}
//         >
//           <p>4</p>
//         </div>
//         <div
//           className="box1 digit orange"
//           ref={(element) => (revealElementsRef.current[4] = element)}
//         >
//           <p>5</p>
//         </div>
//       </div>
//       <div className="spacer s2"></div>
//     </div>
//   );
// };
// export default AnimationSM;
