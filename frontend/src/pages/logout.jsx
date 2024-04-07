import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import swal from "sweetalert";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    swal({
      title: "Logged out successfully",
      text: "Have a Good Day",
      icon: "success",
      button: "Okay",
    }).then(() => {
      navigate("/login");
    });
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <div></div>;
};

export default Logout;
