import { Link } from "react-router-dom";
import Newsletter from "./Newsletter.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="navbar__logo">Chronicle</div>
          <p className="footer__about">
            A personal blog exploring technology, travel, business, and the ideas shaping
            how we live and work.
          </p>
        </div>

        <div className="footer__links">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <Newsletter />
      </div>

      <div className="container footer__bottom">
        <p>&copy; {new Date().getFullYear()} Chronicle. All rights reserved.</p>
      </div>
    </footer>
  );
}
