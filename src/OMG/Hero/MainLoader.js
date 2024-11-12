import React, { useEffect } from "react";
import "./Gitdemo2.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Initialize GSAP ScrollTrigger and Lenis
gsap.registerPlugin(ScrollTrigger);

const MainLoader = () => {
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // GSAP Scroll Animations for Overlay
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".overlay-div",
        start: "50% 50%",
        end: "250% 50%",
        scrub: true,
        pin: true,
      },
    });

    tl.to(".overlay-div h1", { opacity: "1", delay: 0.2 }, "a")
      .to(".overlay-div", { backgroundColor: "#000000b4" }, "a")
      .to(".scrolling", { width: "100%" }, "a");
  }, []);

  return (
    <div id="main">
      <Overlay />
    </div>
  );
};

const Overlay = () => (
  <div className="overlay-div">
    <h1>Landing Page</h1>
    <div className="scroll-down">
      <h3>SCROLL DOWN</h3>
      <div className="scroll-p">
        <div className="scrolling"></div>
      </div>
    </div>
  </div>
);

export default MainLoader;
