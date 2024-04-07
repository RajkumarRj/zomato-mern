import React from "react";
import { Route, Routes } from "react-router-dom"; // Fixed import statement

import Login from "./login";
import Register from "./register";
import Home from "./home";
import Logout from "./logout";
import Cart from "./cart";
import Checkout from "./checkout";

const Imp = () => {
  // Renamed component to PascalCase
  return (
    <div className="bg">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
    </div>
  );
};

export default Imp;
