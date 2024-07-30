import React from "react";
import AsideBar from "./InstructorAppComplements/AsideBar.jsx";
import MainHomeScreen from "./InstructorPrincipalComponents/MainHomeScreen.jsx";
import UserCredentials from "../../../context/userSession.js" ;
import LabelField from "../../sectionDatos/labelFile.jsx";
import "/src/styles/InstructorStyles/InstructorUserPage.css"
import "../../../styles/InstructorStyles/InstructorUserCen.css"
import UserProfile from "../../statusComponent/UserProfile.jsx";

export default function AppUser() {
    const userInstance = UserCredentials.getInstance();
    const user = 'usuario'; // Reemplaza con el nombre de usuario
    const pass = 'contraseña'; // Reemplaza con la contraseña     
    
    userInstance.setCredentials({ id: 2, documento: 1097096255, nombres: "Jeisson", apellidos: "Leon" });

    
    return <div id="body">
      <AsideBar UserName={userInstance.getUserFullName()} Rol="Instructor" ActiveButton="USUARIO"></AsideBar>
      {/* <MainHomeScreen UserFirstName={userInstance.getUserFirstName()}></MainHomeScreen> */}

      <UserProfile user={user} pass={pass} />
    </div>                                                     
}