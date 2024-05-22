import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <span className="muted">
        © {currentYear} Created by{" "}
        <a href="https://x.com/Pgtipping01"> @pgtipping </a>
      </span>
    </footer>
  );
}

export default Footer;
