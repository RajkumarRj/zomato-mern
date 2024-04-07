import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../reducer/cartSlice";

const Header = () => {
  const getTotalItems = () => {
    const { cart } = useSelector((state) => state.cart);
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  return (
    <div>
      <header>
        <h1 className="logo-title">
          <Link to="/">Zomato</Link>
        </h1>
        <ul>
          <li>
            <Link to="/cart">
              Cart <span className="cart-count">{getTotalItems()}</span>
            </Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
