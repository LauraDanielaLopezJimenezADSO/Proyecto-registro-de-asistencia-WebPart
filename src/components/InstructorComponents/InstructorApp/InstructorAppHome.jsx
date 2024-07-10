import React from "react";
import AsideBar from "./InstructorAppComplements/AsideBar.jsx";
import MainHomeScreen from "./InstructorPrincipalComponents/MainHomeScreen.jsx";
import UserCredentials from "../../../context/userSession.js" ;

export default function AppHome() {
  const userInstance = UserCredentials.getInstance();
  userInstance.setCredentials({ id: 2, documento: 1097096255, nombres: "Jeisson", apellidos: "Leon" });
  return <div id="body">
    <AsideBar UserName={userInstance.getUserFullName()} Rol="Instructor" ActiveButton="INICIO"></AsideBar>
    <MainHomeScreen UserFirstName={userInstance.getUserFirstName()}></MainHomeScreen>
  </div>
}