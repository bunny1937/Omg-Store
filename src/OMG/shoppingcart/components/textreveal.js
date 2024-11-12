import React from "react";
import "./textreveal.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
function Textreveal() {
  gsap.registerPlugin(ScrollTrigger);

  const textElements = gsap.utils.toArray(".text");

  textElements.forEach((text) => {
    gsap.to(text, {
      backgroundSize: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: text,
        start: "center 80%",
        end: "center 20%",
        scrub: true,
      },
    });
  });
  return (
    <div className="textcontainer">
      <h1 className="text">
        TEXT EFFECT<span>WOAH</span>
      </h1>
      <h1 className="text">
        GSAP<span>AND CLIPPING</span>
      </h1>
      <h1 className="text">
        CRAZYYY<span>CRAZYYY</span>
      </h1>
      <h1 className="text">
        HOVER ON ME
        <span>
          <a
            href="https://stacksorted.com/text-effects/minh-pham"
            target="_blank"
          >
            SOURCE
          </a>
        </span>
      </h1>
      <h1 className="text">
        LIKE THIS?
        <span>
          <a href="https://twitter.com/juxtopposed" target="_blank">
            LET'S CONNECT
          </a>
        </span>
      </h1>
    </div>
  );
}

export default Textreveal;
