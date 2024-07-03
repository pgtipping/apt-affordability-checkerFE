import React from "react";
import "./Footer.css";
import { FaReddit } from "react-icons/fa";

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
            © {currentYear} Apartment Affordability Checker. All rights
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
            title="X"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="24"
              height="24"
              className="social-icon"
            >
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
          </a>
          <a
            href="https://www.reddit.com/user/Old-Dust977/"
            target="_blank"
            rel="noopener noreferrer"
            title="Reddit"
          >
            <FaReddit className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
