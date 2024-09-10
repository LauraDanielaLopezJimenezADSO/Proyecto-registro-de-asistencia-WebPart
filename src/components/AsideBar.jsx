import React from "react";
import "../styles/ComponentStyles/sideBar.css"
import "../styles/ComponentStyles/texts/TextBg.css"
import "../styles/ComponentStyles/texts/Title.css"
import "../util/icons/LogoSena.png"
import PrimaryButton from "./buttons/primaryButton.jsx"
import SecondaryButton from "./buttons/secondaryButton.jsx";
import {useAuth} from "../context/API/APISessionManager/userSession.jsx";

export default function AsideBar({ UserName, Rol, ActiveButton, showHome, showUpload, showVerify, showSearch, showUser, onLogout }) {
    const { logout, user } = useAuth(); // Obtenemos user del hook useAuth

    const handleLogout = () => {
        logout(); // Ejecuta la función de logout desde el contexto de autenticación
        onLogout(); // Llama a la función pasada desde el componente padre para actualizar la vista
    };

    console.log(user)

    return (
        <aside className="aside">
            <section className="aside__sectionCont">
                <figure className="sectionCont__ImageCont">
                    <img
                        src="../../src/util/icons/LogoSena.png"
                        alt="Logo Sena"
                        className="ImageCont__Logo"
                    />
                </figure>
                <p className="TextBg">Usuario: {UserName}</p>
                <p className="TextBg TextBg--YllVariant">{Rol}</p>
            </section>
            <section className="aside__sectionCont aside__sectionCont--SpaceBetween">
                <div className="sectionCont__linksBtnContainer">
                    <SecondaryButton
                        clase={`SecondaryButton ${ActiveButton === 'HOME' ? 'SecondaryButton--SecondaryButtonActive' : ''}`}
                        texto="INICIO"
                        onClick={showHome}
                    />
                    {user.rol === 'Aprendiz' ? (
                        <SecondaryButton
                            clase={`SecondaryButton ${ActiveButton === 'UPLOAD' ? 'SecondaryButton--SecondaryButtonActive' : ''}`}
                            texto="SUBIR SOPORTE"
                            onClick={showUpload}
                        />
                    ) : user.rol === 'Instructor' ? (
                        <SecondaryButton
                            clase={`SecondaryButton ${ActiveButton === 'VERIFY' ? 'SecondaryButton--SecondaryButtonActive' : ''}`}
                            texto="VERIFICAR SOPORTES"
                            onClick={showVerify} // Cambia esto si tienes otra función específica para verificar soportes
                        />
                    ) : null}
                    <SecondaryButton
                        clase={`SecondaryButton ${ActiveButton === 'SEARCH' ? 'SecondaryButton--SecondaryButtonActive' : ''}`}
                        texto="BUSCAR"
                        onClick={showSearch}
                    />
                    <SecondaryButton
                        clase={`SecondaryButton ${ActiveButton === 'USER' ? 'SecondaryButton--SecondaryButtonActive' : ''}`}
                        texto="USUARIO"
                        onClick={showUser}
                    />
                </div>
                <div className="sectionCont__unLogBtnContainer">
                    <PrimaryButton texto="CERRAR SESIÓN" clase="PrimaryButton" onClick={handleLogout} />
                </div>
            </section>
        </aside>
    );
}
