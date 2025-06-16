import "./Hero.css";
import "../../index.css";
import { useNavigate } from "react-router-dom";

import heroImage from "../../Assets/hero2.jpg";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <section className="leftSection">
        <div className="heroTextContent">
          <div className="heroTop">
            <div className="horizontalLine"></div>
            <h4>Effective gadgets for the modern world</h4>
          </div>
          <h1 className="heroTitle">Ovalen will make your life easier</h1>

          <h5>
            Explore our best products to <br /> find what you want, there you{" "}
            <br /> will definitely find it.
          </h5>
        </div>

        <div className="explore">
          <button className="exploreButton" onClick={() => navigate("/shop")}>
            Explore Product
          </button>
        </div>
      </section>
      <section className="rightSection">
        <img src={heroImage} alt="heroImage" />
      </section>
    </div>
  );
}

export default Hero;
