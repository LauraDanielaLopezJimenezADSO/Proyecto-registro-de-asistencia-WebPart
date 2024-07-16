import React from "react";
import AsideBar from "./InstructorAppComplements/AsideBar.jsx";
import MainHomeScreen from "./InstructorPrincipalComponents/MainHomeScreen.jsx";
import UserCredentials from "../../../context/userSession.js" ;
import LabelField from "../../sectionDatos/labelFile.jsx";
import "/src/styles/InstructorStyles/InstructorUserPage.css"

export default function AppUser() {
    const userInstance = UserCredentials.getInstance();
    
    userInstance.setCredentials({ id: 2, documento: 1097096255, nombres: "Jeisson", apellidos: "Leon" });

    
    return <div id="body">
      <AsideBar UserName={userInstance.getUserFullName()} Rol="Instructor" ActiveButton="USUARIO"></AsideBar>
      <MainHomeScreen UserFirstName={userInstance.getUserFirstName()}></MainHomeScreen>

      <section className="section__datos">
        <div className="datos">

            
            <h2>Datos del Instructor</h2>
        </div>

        <div className="datos">
            <div className="datos__cont">
                <LabelField 
                    label="Tipo de documento"
                    id="documento"
                    type="text"
                    buttonText="XXXXXXXXXX"
                />

                <LabelField 
                    label="Documento"
                    id="documento"
                    type="text"
                    buttonText={userInstance.getUserDocument()}
                />

                <LabelField 
                    label="Nombres"
                    id="documento"
                    type="text"
                    buttonText={userInstance.getUserFirstName()}
                />

                <LabelField 
                    label="Apellidos"
                    id="documento"
                    type="text"
                    buttonText={userInstance.getUserLastName()}
                />

                <LabelField 
                    label="Correo electrónico"
                    id="documento"
                    type="text"
                    buttonText="XXXXXXXXXX"
                />

                <LabelField 
                    label="Sexo"
                    id="documento"
                    type="text"
                    buttonText="XXXXXXXXXX"
                />

                <LabelField 
                    label="Celular"
                    id="documento"
                    type="text"
                    buttonText="XXXXXXXXXX"
                />

                <LabelField 
                    label="Especialización"
                    id="documento"
                    type="text"
                    buttonText="XXXXXXXXXX"
                />

                <LabelField 
                    label="Tipo de Instructor"
                    id="documento"
                    type="text"
                    buttonText="XXXXXXXXXX"
                />

            </div>
        </div>
      </section>
    </div>
}