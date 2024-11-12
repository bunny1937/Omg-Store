import React from "react";
import Lenis from "@studio-freight/lenis";
import { AnimatePresence } from "framer-motion";
import "./Heroui.css";
import { useEffect, useState } from "react";
import Category from "../shoppingcart/components/Category";
import Images from "../shoppingcart/components/parallax";
import Footer from "../shoppingcart/components/Footer";
import Loader from "../shoppingcart/components/Loader";
import Firebaseapp from "../db/Firebaseapp";
import { AddProducts } from "../db/AddProduct";
import ImageUpload from "../db/ImgUpload";
import AnimationSM from "../shoppingcart/components/AnimationSM";
import Loadergsap from "../shoppingcart/components/Loadergsap";
import Parallax from "../shoppingcart/components/Loadergsap";
import Framer from "../shoppingcart/components/framer/framer";
import Mainpage from "./Mainpage";
import Gallery from "../shoppingcart/components/app/layout";
import Scroll from "../shoppingcart/components/app/layout";
import GridDEMO from "./Grid/Grid";
import ProductDetailPage from "./demo";
import GridDemo from "./Grid/Grid";
import Gitdemo from "../Archive/Gitdemo";
import Gitdemo2 from "./Gitdemo2";
import AniComponent1 from "../shoppingcart/components/AniComponent1";

export default function Heroui() {
  const [isLoading, setIsLoading] = useState(true);

  const lenis = new Lenis();
  useEffect(() => {
    function raf(time) {
      setIsLoading(false);
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    raf();
  }, []);

  return (
    <>
      <Parallax />
      <Gitdemo2 />
      {/* <AniComponent1 /> */}
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
                {/* <div className="hero-text2">
      <h2>
        Explore our curated Fashion, designed to resonate with your
        individuality and energy
      </h2>
      <button className="hero-btn">
        <Link to={"/Home"}>Shop all</Link>
      </button>
    </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <ImageUpload /> */}
        {/* <Scroll /> */}
        <Category />
        {/* <Gitdemo /> */}

        {/* <Splinemodel /> */}
        {/* <NewCategory /> */}
        {/* <Images /> */}

        <Footer />
      </div>
    </>
  );
}
