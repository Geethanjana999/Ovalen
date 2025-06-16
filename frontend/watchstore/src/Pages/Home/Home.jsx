import Hero from "../../Components/Hero/Hero";
import Navbar from "../../Components/Navbar/Navbar";
import About from "../../Components/About/About";
import LargeItemContainer from "../../Components/LargeItemCard/LargeItemContainer";
import ImageScrollEffect2 from "../../Components/ScrollItem/ImageScrollEffect2";
import OurJourney from "../../Components/Experiance/OurJourney";
import OurMission from "../../Components/OurMission/OurMission";
import Footer from "../../Components/Footer/Footer";

function Home({ setShowLogin }) {
  return (
    <div>
      <Navbar setShowLogin={setShowLogin} />
      <Hero />
      <About />
      <LargeItemContainer />
      <ImageScrollEffect2 />
      <OurJourney />
      <OurMission />
      <Footer />
    </div>
  );
}

export default Home;
