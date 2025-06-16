import Navbar from "../../Components/Navbar/Navbar";
import "./Insurance.css";
import Footer from "../../Components/Footer/Footer";

function Insurance({ setShowLogin }) {
  return (
    <div>
      <Navbar setShowLogin={setShowLogin} />
      <div className="insuranceContainer">
        <div className="insuranceDetails">
          <h1 className="insuranceTitle">Insurance</h1>
          <p>
            At Ovalen, we understand that your timepiece is not just a
            purchase—it's an investment in craftsmanship, emotion, and legacy.
            That’s why we offer specialized insurance coverage tailored for
            luxury watches. Our insurance plans are designed to give you peace
            of mind by protecting your watch against theft, accidental damage,
            and loss. From the moment it leaves our showroom to every moment it
            graces your wrist, your Ovalen timepiece remains safeguarded. With a
            simple claims process and transparent terms, we aim to ensure that
            your experience with Ovalen is seamless even during unforeseen
            situations. Whether it's a gift to mark a milestone or a personal
            statement of style, your watch deserves the care and protection that
            matches its elegance.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Insurance;
