import React from "react";
import "../styles/ComponentStyles/sideBar.css"
import "../styles/ComponentStyles/texts/TextBg.css"
import "../styles/ComponentStyles/texts/Title.css"
import "../util/icons/LogoSena.png"
import PrimaryButton from "./buttons/primaryButton.jsx"
import SecondaryButton from "./buttons/secondaryButton.jsx";
import {useAuth} from "../context/API/APISessionManager/userSession.jsx";

export default function AsideBar({ UserName, Rol, ActiveButton, showHome, showSearch, showUser, onLogout }) {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout(); // Ejecuta la función de logout desde el contexto de autenticación
        onLogout(); // Llama a la función pasada desde el componente padre para actualizar la vista
    };

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
