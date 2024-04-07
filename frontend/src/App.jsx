import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Imp from "./pages/imp";

function App() {
  return (
    <>
      <Imp />
    </>
  );
}

export default App;
