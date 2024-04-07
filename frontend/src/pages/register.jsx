import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const register = () => {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [pass, setpass] = useState();
  console.log(name, email, pass);

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent form submission
    // swal("Oops!", "Something went wrong!", "error");
    // const value = await swal("Type something:", {
    //   content: "input",
    // });

    // swal(`You typed: ${value}`);

    await axios
      .post("http://localhost:5000/register", {
        name: name,
        email: email,
        password: pass,
      })
      .then((res) => {
        //modal
        swal({
          title: "Welcome to our Website!",
          text: res.data.message,
          icon: "success",
          button: "Okay",
        }).then(() => {
          navigate("/login");
        });
      })
      .catch((error) => {
        swal({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
          button: "Try again!",
        });
        console.log(error.response.data.message);
        console.error("Error registering user:", error);
      });
  };

  return (
    <div className="container">
      <div className="title">
        <h2>Register</h2>
      </div>

      <form action="" onSubmit={handleRegister}>
        <label htmlFor="name">Name </label>
        <input
          required
          type="text"
          onChange={(e) => setname(e.target.value)}
          placeholder="Enter your name.."
        />

        <label htmlFor="email">Email </label>
        <input
          required
          type="email"
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter your email"
        />

        <label htmlFor="pass">Password </label>
        <input
          required
          type="password"
          onChange={(e) => setpass(e.target.value)}
          placeholder="Enter your password"
        />

        <button className="reg" type="submit">
          Register
        </button>
      </form>

      <Link to="/login" className="links">
        Login
      </Link>
    </div>
  );
};

export default register;
