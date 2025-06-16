import "./Shop.css";
import Navbar from "../../Components/Navbar/Navbar";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import banner1 from "../../Assets/banner1.jpg";
import WatchDisplay from "../../Components/WatchDisplay/WatchDisplay";
import { useState } from "react";
import Footer from "../../Components/Footer/Footer";

function Shop({ setShowLogin }) {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Navbar setShowLogin={setShowLogin} />
      <div className="bannerSection">
        <img src={banner1} alt="" className="bannerImage" />
      </div>
      <ExploreMenu category={category} setCategory={setCategory} />
      <WatchDisplay category={category} />
      <Footer />
    </div>
  );
}

export default Shop;
