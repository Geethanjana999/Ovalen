import "./Navbar.css";
import "../../index.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContextProvider";

function Navbar({ setShowLogin }) {
  const { token, products } = useContext(StoreContext);
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavBg(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`nav ${navBg ? "scrolled" : ""}`}>
      <div className="logo">
        <Link to="/" className="logoLink">
          <h2 className="logoTitle">OVALEN</h2>
        </Link>
      </div>

      <div className="navLinks">
        <ul>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/stories">Stories</Link>
          </li>
          <li>
            <Link to="/brands">Brands</Link>
          </li>
          <li>
            <Link to="/insurance">Insurance</Link>
          </li>
        </ul>
      </div>

      <div className="auth">
        <Link to="/cart" className="cartIcon">
          <i className="bx bx-shopping-bag"></i>
          {products.length > 0 && <span className="cartFull"></span>}
        </Link>

        <div className="toProfile">
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Login</button>
          ) : (
            <div className="navbarProfile">
              <Link to="/profile/dashboard">
                <i className="bx bx-user"></i>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
