import { useScroll, motion } from "framer-motion";
import { ScrollComponentParent } from "./SrollComponentParent";

export default function ScrollComponent({ containerRef, pictures }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  return (
    <div className="sticky">
      {pictures.map(({ src, scaleRange }, index) => {
        const scale = ScrollComponentParent(scrollYProgress, scaleRange); // Use the custom hook

        return (
          <motion.div key={index} style={{ scale }} className="el">
            <div className="imageContainer">
              <img src={src} alt="image" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
