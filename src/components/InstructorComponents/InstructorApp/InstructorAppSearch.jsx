import React from "react";
import AsideBar from "./InstructorAppComplements/AsideBar.jsx";
import MainSearchScreen from "./InstructorPrincipalComponents/MainSearchScreen.jsx";
import UserCredentials from "../../../context/userSession.js" ;

export default function AppHome() {
  const userInstance = UserCredentials.getInstance();
  userInstance.setCredentials({ id: 2, documento: 1097096255, nombres: "Jeisson", apellidos: "Leon" });
  return <div id="body">
    <AsideBar UserName={userInstance.getUserFullName()} Rol="Instructor" ActiveButton="BUSCAR"></AsideBar>
    <MainSearchScreen UserFirstName={userInstance.getUserFirstName()}></MainSearchScreen>
  </div>
}