import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Part2 = () => {
  useEffect(() => {
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".part-2",
        start: "0% 70%",
        end: "50% 50%",
        scrub: true,
      },
    });

    tl2.to(".rounded-div-wrapper", { height: 0, marginTop: 0 });
  }, []);

  return (
    <div className="part-2">
      <div className="rounded-div-wrapper">
        <div className="rounded-div">A Unique Experience Awaits You</div>
      </div>
      <div className="content-2">
        <div className="text-area">
          <h1>Explore New Opportunities</h1>
          <h2>Discover, Learn, and Grow</h2>
        </div>
        <div className="text-area-hover">
          <h1>Our Services</h1>
          <h2>Tailored Just for You</h2>
        </div>
      </div>
    </div>
  );
};

export default Part2;
