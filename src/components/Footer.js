import React from "react";
import "./Footer.css";
import { FaTwitter, FaReddit } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="credits">
          <h6>Credits</h6>
          <ul className="credits-list">
            <li>
              <a
                href="https://www.flaticon.com/free-icons/moon"
                title="moon icons"
              >
                Moon icons created by Good Ware - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/sun"
                title="sun icons"
              >
                Sun icons created by kosonicon - Flaticon
              </a>
            </li>
          </ul>
        </div>
        <div className="info">
          <p>
            © {currentYear} Apartment Affordability Analyzer. All rights
            reserved.
          </p>
          <p>
            Created by <a href="https://x.com/Pgtipping01">@pgtipping</a>
          </p>
        </div>
        <div className="social-media">
          <a
            href="https://x.com/Pgtipping01"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="social-icon" />
          </a>
          <a
            href="https://www.reddit.com/user/YourUsername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaReddit className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
