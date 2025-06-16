import Navbar from "../../Components/Navbar/Navbar";
import "./Stories.css";
import Footer from "../../Components/Footer/Footer";

function Stories({ setShowLogin }) {
  return (
    <div>
      <Navbar setShowLogin={setShowLogin} />
      <div className="storiesContainer">
        <div className="storiesDetails">
          <h1 className="storiesTitle">Our Story</h1>
          <p>
            Ovalen was born from a passion for precision and timeless design.
            What began as a small workshop crafting bespoke timepieces has grown
            into a global symbol of craftsmanship and elegance. Every Ovalen
            watch is a tribute to the art of horology blending modern aesthetics
            with traditional techniques passed down through generations. We
            believe a watch is more than just a tool to tell time it is a
            statement of identity, heritage, and ambition. From the ticking
            heart of our automatic movements to the refined details of each
            strap and dial, every element is carefully considered to deliver
            exceptional quality and style. As we continue to innovate and
            evolve, our mission remains the same: to create watches that
            celebrate individuality, inspire confidence, and endure the test of
            time.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Stories;
