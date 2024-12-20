import React, { useState } from "react";
import "./Heroui.css";
import Footer from "../shoppingcart/components/Footer";
import BentoGrid from "./Bento";
import Category from "./Category/Category";
import Lenis2 from "../shoppingcart/components/Lenis2";
import Landingpage from "../shoppingcart/components/Landingpage";
import SuggestionComponent from "../shoppingcart/components/Suggestion";
import MainPage from "./Mainpage";
import IntroOverlay from "./IntroOverlay";

export default function Heroui() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro ? (
        <IntroOverlay
          onAnimationEnd={() => setTimeout(() => setShowIntro(false), -200)}
        />
      ) : (
        <div className="hero">
          <MainPage />
          <SuggestionComponent />
          {/* <BentoGrid /> */}
          <Lenis2 />
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
          <Category />
          <Footer />
        </div>
      )}
    </>
  );
}
