import { useTransform } from "framer-motion";

// Custom hook to compute the scale transform for each picture
export function ScrollComponentParent(scrollYProgress, scaleRange) {
  return useTransform(scrollYProgress, [0, 1], scaleRange);
}
