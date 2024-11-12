import "./Nav.css";
import { Link } from "react-scroll";
import Servicescards from "./Cardsystem";
import Footer from "../components/Footer";

export default function NavBar() {
  return (
    <>
      <header className="Nav-navbar">
        <nav className="nav__container__actions">
          <ul>
            <li>
              <Link activeClass="active" smooth spy to="about">
                ABOUT
              </Link>
            </li>
            <li>
              <Link activeClass="active" smooth spy to="Servicescards">
                Services
              </Link>
            </li>
            <li>
              <Link activeClass="active" smooth spy to="blog">
                BLOG
              </Link>
            </li>
            <li>
              <Link activeClass="active" smooth spy to="contact">
                CONTACT ME
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <section id="about">
<h2>Welcome to our Medical Shop</h2>   
      </section>

      <section id="Servicescards">
      <Servicescards/>

      </section>
      <section id="blog">BLOG</section>
      <section id="contact">
        <Footer/>
      </section>
    </>
  );
}