import "./Loadergsap.css";
import Picture1 from "./pages/photos/parallax/woman-4266713_640.jpg";
import Picture2 from "./pages/photos/parallax/businessman-1284460_640.jpg";
import Picture3 from "./pages/photos/parallax/man-1283231_640.jpg";
import Picture4 from "./pages/photos/parallax/model-2865587_640.jpg";
import Picture5 from "./pages/photos/parallax/fashion-3080626_640.jpg";
import Picture6 from "./pages/photos/parallax/woman-3946473_640.jpg";
import Picture7 from "./pages/photos/parallax/woman-1721065_640.jpg";
import { useRef } from "react";
import ScrollComponent from "./ScrollComponent";

export default function Parallax() {
  const container = useRef(null);

  const pictures = [
    {
      src: Picture1,
      scaleRange: [1, 4],
    },
    {
      src: Picture2,
      scaleRange: [1, 5],
    },
    {
      src: Picture3,
      scaleRange: [1, 6],
    },
    {
      src: Picture4,
      scaleRange: [1, 5],
    },
    {
      src: Picture5,
      scaleRange: [1, 3],
    },
    {
      src: Picture6,
      scaleRange: [1, 8],
    },
    {
      src: Picture7,
      scaleRange: [1, 9],
    },
  ];

  return (
    <div className="container" ref={container}>
      <ScrollComponent containerRef={container} pictures={pictures} />
    </div>
  );
}
