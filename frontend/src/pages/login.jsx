import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:5000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        swal({
          title: "Logged in successfully",
          text: res.data.message,
          icon: "success",
          button: "Okay",
        });
        localStorage.setItem("token", res.data.token);

        navigate("/");
      })
      .catch((err) => {
        swal({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
          button: "Try again",
        });
        console.log(err);
      });

    // Assuming the server responds with some authentication token or user data upon successful login
    // You can handle the response here according to your server's response format
    // Log the response data // Navigate to the home page
  };

  return (
    <div className="container">
      <div className="title">
        <h2>Login</h2>
      </div>

      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <Link to="/forgot-password" className="forget">
          Forget Password?
        </Link>

        <button className="reg" type="submit">
          Login
        </button>
      </form>

      <Link to="/register" className="links">
        Create an account
      </Link>
    </div>
  );
};

export default Login;
