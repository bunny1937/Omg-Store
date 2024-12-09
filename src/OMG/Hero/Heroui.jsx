import React from "react";
import "./Heroui.css";
import Footer from "../shoppingcart/components/Footer";
import BentoGrid from "./Bento";
import PromoBanner from "./PromoBanner";
import Burger from "../shoppingcart/components/burgermenu/header/nav";
import Images from "../shoppingcart/components/parallax";
import Scroll1 from "../shoppingcart/components/Scroll";
import Lenis from "../shoppingcart/components/Lenis";
import Category from "./Category/Category";
import Lenis2 from "../shoppingcart/components/Lenis2";
import Landingpage from "../shoppingcart/components/Landingpage";
import Gsap from "../shoppingcart/components/Gsap";
export default function Heroui() {
  return (
    <>
      {/* <Parallax />
      <Gitdemo2 />
      */}
      {/* <Lenis /> */}
      <Landingpage />
      <BentoGrid />
      <Lenis2 />
      {/* <AniComponent1 />*/}

      <div className="hero">
        <div className="hero-container">
          <div className="hero-photos">
            <div className="pic">
              <div className="hero-texts">
                <div className="hero-text1">
                  <p>
                    <span>Unveiling</span> apparel that dances to your beat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <ImageUpload /> */}
        {/* <Scroll /> */}
        <PromoBanner />
        <Category />
        {/* <Gitdemo /> */}
        {/* <Splinemodel /> */}
        {/* <Images /> */}
        <Footer />
      </div>
    </>
  );
}
