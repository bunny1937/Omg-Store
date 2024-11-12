// import { useEffect, useRef, useState } from "react";
// import "./page.css";
// import img1 from "./images/1.jpg";
// import img2 from "./images/2.jpg";
// import img3 from "./images/3.jpg";
// import img4 from "./images/4.jpg";
// import img5 from "./images/5.jpg";
// import img6 from "./images/6.jpg";
// import img7 from "./images/7.jpg";
// import img8 from "./images/8.jpg";
// import img9 from "./images/9.jpg";
// import img10 from "./images/10.jpg";
// import img11 from "./images/11.jpg";
// import img12 from "./images/12.jpg";

// import Lenis from "@studio-freight/lenis";
// import { useTransform, useScroll, motion } from "framer-motion";

// const images = [
//   img1,
//   img2,
//   img3,
//   img4,
//   img5,
//   img6,
//   img7,
//   img8,
//   img9,
//   img10,
//   img11,
//   img12,
// ];

// export default function Gallery() {
//   const gallery = useRef(null);
//   const [dimension, setDimension] = useState({ width: 0, height: 0 });

//   const { scrollYProgress } = useScroll({
//     target: gallery,
//     offset: ["start end", "end start"],
//   });
//   const { height } = dimension;
//   const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
//   const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
//   const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
//   const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

//   useEffect(() => {
//     const lenis = new Lenis();

//     const raf = (time) => {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     };

//     const resize = () => {
//       setDimension({ width: window.innerWidth, height: window.innerHeight });
//     };

//     window.addEventListener("resize", resize);
//     requestAnimationFrame(raf);
//     resize();

//     return () => {
//       window.removeEventListener("resize", resize);
//     };
//   }, []);

//   return (
//     <main className="main">
//       <div className="spacer"></div>
//       <div ref={gallery} className="gallery">
//         <Column images={[images[0], images[1], images[2]]} y={y} />
//         <Column images={[images[3], images[4], images[5]]} y={y2} />
//         <Column images={[images[6], images[7], images[8]]} y={y3} />
//         <Column images={[images[9], images[10], images[11]]} y={y4} />
//       </div>
//       <div className="spacer"></div>
//     </main>
//   );
// }

// const Column = ({ images, y }) => {
//   return (
//     <motion.div className="column" style={{ y }}>
//       {images.map((src, i) => (
//         <div key={i} className="imageContainer">
//           <img src={src} alt={`Image ${i}`} fill />
//         </div>
//       ))}
//     </motion.div>
//   );
// };
import Pic1 from "./images/1.jpg";
import Pic2 from "./images/2.jpeg";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import "./page.css"; // Import the CSS file

export default function Scroll() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={container}>
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
    </main>
  );
}

const Section1 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  return (
    <motion.div style={{ scale, rotate }} className="section1">
      <p>Scroll Perspective</p>
      <div className="flex">
        <p>Section</p>
        <div className="img-container">
          <img src={Pic1} alt="img" placeholder="blur" />
        </div>
        <p>Transition</p>
      </div>
    </motion.div>
  );
};

const Section2 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.div style={{ scale, rotate }} className="section2">
      <img src={Pic2} alt="img" placeholder="blur" />
    </motion.div>
  );
};
