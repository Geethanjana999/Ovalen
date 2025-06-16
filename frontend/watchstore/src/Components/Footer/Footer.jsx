import "./Footer.css";
import "../../index.css";

function Footer() {
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        <div className="footer-logo-section">
          <h2 className="footer-logo">OVALEN</h2>
          <p className="footer-description">
            Discover timeless craftsmanship and modern elegance with Ovalen
            watches.
          </p>
          <div className="footer-social-icons">
            <a href="#">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="#">
              <i className="bx bxl-instagram"></i>
            </a>
            <a href="#">
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="#">
              <i className="bx bxl-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li>
                <a href="#">Men's Watches</a>
              </li>
              <li>
                <a href="#">Women's Watches</a>
              </li>
              <li>
                <a href="#">New Arrivals</a>
              </li>
              <li>
                <a href="#">Best Sellers</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Collections</h4>
            <ul>
              <li>
                <a href="#">Classic</a>
              </li>
              <li>
                <a href="#">Luxury</a>
              </li>
              <li>
                <a href="#">Minimalist</a>
              </li>
              <li>
                <a href="#">Smart Watches</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Shipping & Returns</a>
              </li>
              <li>
                <a href="#">Warranty</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About Ovalen</a>
              </li>
              <li>
                <a href="#">Our Journey</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
