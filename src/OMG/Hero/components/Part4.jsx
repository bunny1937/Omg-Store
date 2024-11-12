import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Part4 = () => {
  useEffect(() => {
    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".part-4",
        start: "50% 50%",
        end: "200% 50%",
        pin: true,
        scrub: 1,
      },
    });

    tl4
      .to(".c-one", { marginTop: "-25%", opacity: 1 }, "sct-1")
      .to(".c-two", { opacity: 1 }, "sct-2")
      .to(".c-one", { marginTop: "-100", opacity: 0 }, "sct-2")
      .to(".c-three", { opacity: 1 }, "sct-3")
      .to(".c-two", { opacity: 0 }, "sct-3")
      .to(".c-one", { marginTop: "-180%" }, "sct-3")
      .to(".c-one", { marginTop: "-230%" }, "sct-4")
      .to(".c-three", { opacity: 0 }, "sct-4")
      .to(".cir-part-4", { marginLeft: "100%", rotate: 360 }, "sct-4");
  }, []);

  return (
    <div className="part-4">
      <div className="lft-part-4">
        <h1>Innovate with Us</h1>
      </div>
      <div className="rght-part-4">
        <div className="cir-part-4"></div>
        <div className="content-rght-part-4">
          <h1>Why Choose Us?</h1>
          <p>We offer exceptional services that meet your needs.</p>
        </div>
      </div>
    </div>
  );
};

export default Part4;
