import React from "react";
import { gsap, Power2, Power4 } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
function Reveal() {
  // For more information, see greensock.com/docs/v3/Plugins/ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  function imageReveal() {
    const revealContainers = document.querySelectorAll(".reveal");

    revealContainers.forEach((container) => {
      let clipPath;

      // Right to left
      if (container.classNameList.contains("reveal--right")) {
        clipPath = "inset(0 100% 0 0)";
      }

      const image = container.querySelector("img");

      // Animation trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          //markers: true, // Turn on to show trigger markers
          toggleActions: "restart none none reset",
        },
      });

      // Animation timeline
      tl.set(container, { autoAlpha: 1 });
      tl.from(container, {
        clipPath,
        duration: 1,
        delay: 0.2,
        ease: Power4.easeInOut,
      });
      if (container.classNameList.contains("reveal--overlay")) {
        tl.from(image, { clipPath, duration: 0.6, ease: Power4.easeOut });
      }
      tl.from(image, {
        scale: 1.3,
        duration: 1.2,
        delay: -1,
        ease: Power2.easeOut,
      });
    });

    ScrollTrigger.refresh();
  }

  imageReveal();

  return (
    <section className="container">
      <div className="image--wrapper">
        <div className="reveal reveal--right">
          <div className="revealimg"></div>
        </div>
      </div>

      <div className="content--wrapper">
        <h2>Reveal: right</h2>
        <div className="snippet--wrapper">.reveal .reveal--right</div>
      </div>
    </section>
  );
}

export default Reveal;
