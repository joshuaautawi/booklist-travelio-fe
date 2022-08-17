import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <ul className="main-nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/wishlist">Wishlist</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
