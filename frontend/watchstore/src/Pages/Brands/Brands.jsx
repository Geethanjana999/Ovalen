import "./Brands.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

function Brands({ setShowLogin }) {
  return (
    <div>
      <Navbar setShowLogin={setShowLogin} />
      <div className="brandsContainer">
        <div className="brandsDetails">
          <h1 className="brandsTitle">Brands</h1>
          <div className="brandsInfo">
            <h4>Rolex</h4>
            <h4>Omega</h4>
            <h4>Tag Heuer</h4>
            <h4>Patek Philippe</h4>
            <h4>Audemars Piguet</h4>
            <h4>Breitling</h4>
            <h4>Seiko</h4>
            <h4>Casio</h4>
            <h4>IWC Schaffhausen</h4>
            <h4>Longines</h4>
            <h4>Panerai</h4>
            <h4>Hublot</h4>
            <h4>Tissot</h4>
            <h4>Vacheron Constantin</h4>
            <h4>Richard Mille</h4>
            <h4>Cartier</h4>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Brands;
