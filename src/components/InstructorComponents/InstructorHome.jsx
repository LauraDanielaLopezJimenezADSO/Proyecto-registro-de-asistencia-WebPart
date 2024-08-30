import React from "react";
import ReactDOM from "react-dom/client";
import AppHome from "./InstructorApp/InstructorAppHome.jsx"
import {Router} from "react-router-dom";

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
      <AppHome />
  </React.StrictMode>
)

