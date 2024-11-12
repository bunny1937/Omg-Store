import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Part1 = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".part-1",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });

    tl.to(".rotate-div", { rotate: -15, scale: 0.8, duration: 1 })
      .to(".overlay-div h1", { opacity: 1, duration: 1, delay: 0.2 })
      .to(".overlay-div", { backgroundColor: "#000000b4", duration: 1 })
      .to(".scrolling", { width: "100%", duration: 1 });
  }, []);

  return (
    <div className="part-1">
      <div className="content-part-1">
        <div className="rotate-div">
          <div className="row-div">Welcome to Our Service</div>
          <div className="row-div">We provide the best solutions</div>
          <div className="row-div">Join us to elevate your experience</div>
          <div className="row-div">Let's start your journey today!</div>
        </div>
      </div>
      <div className="overlay-div" style={{ opacity: 0 }}>
        <h1>Your Adventure Awaits</h1>
        <div className="scroll-down">
          <h3>Scroll Down</h3>
          <div className="scroll-p"></div>
        </div>
      </div>
    </div>
  );
};

export default Part1;
