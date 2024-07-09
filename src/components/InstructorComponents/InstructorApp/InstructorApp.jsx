import React from "react";
import AsideBar from "./AsideBar.jsx";
import Main from "./Main.jsx";
import "../../../styles/InstructorStyles/InstructorHomePageStyle.css"
import UserCredentials from "../../../context/userSession.js" ;

export default function App() {
  const userInstance = UserCredentials.getInstance();
  userInstance.setCredentials({ id: 2, documento: 1097096255, nombres: "Jeisson", apellidos: "Leon" });
  return <div id="body">
    <AsideBar UserName={userInstance.getUserFullName()} Rol="Aprendiz"></AsideBar>
    <Main UserFirstName={userInstance.getUserFirstName()}></Main>
  </div>
}