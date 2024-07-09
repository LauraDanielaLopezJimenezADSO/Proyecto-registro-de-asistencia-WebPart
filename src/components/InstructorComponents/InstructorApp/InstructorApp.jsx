import React from "react";
import AsideBar from "./AsideBar.jsx";
import Main from "./Main.jsx";
import "../../../styles/InstructorStyles/InstructorHomePageStyle.css"

export default function App() {

  return <div id="body">
    <AsideBar></AsideBar>
    <Main></Main>
  </div>
}