import React, {useState} from "react";
import "../styles/ComponentStyles/sideBar.css"
import "../styles/ComponentStyles/texts/TextBg.css"
import "../styles/ComponentStyles/texts/Title.css"
import "../util/icons/LogoSena.png"
import PrimaryButton from "./buttons/primaryButton.jsx"
import SecondaryButton from "./buttons/secondaryButton.jsx";
import {useAuth} from "../context/API/APISessionManager/userSession.jsx";

export default function AsideBar({ UserName, Rol, ActiveButton, showHome, showUpload, showVerify, showSearch, showUser, onLogout }) {
    const { logout, user } = useAuth();
    const [showToast, setShowToast] = useState(false); // Estado para manejar el toast

    const handleLogout = () => {
        logout();
        onLogout();
    };

    console.log('Valor de ActiveButton:', ActiveButton);

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
                <p className="TextBg">{UserName}</p>
                <p className="TextBg TextBg--YllVariant">{Rol}</p>
            </section>
            <section className="aside__sectionCont aside__sectionCont--SpaceBetween">
                <div className="sectionCont__linksBtnContainer">
                    <SecondaryButton
                        clase={`SecondaryButton ${ActiveButton.toLowerCase() === 'home' ? 'SecondaryButton--SecondaryButtonActive' : ''}`}
                        texto="INICIO"
                        onClick={showHome}
                    />
                    {user.Role === 'Aprendiz' ? (
                        <SecondaryButton
                            clase={`SecondaryButton ${ActiveButton.toLowerCase() === 'upload' ? 'SecondaryButton--SecondaryButtonActive' : ''}`}
                            texto="SUBIR SOPORTE"
                            onClick={showUpload}
                        />
                    ) : user.Role === 'Instructor' ? (
                        <SecondaryButton
                            clase={`SecondaryButton ${ActiveButton.toLowerCase() === 'verify' ? 'SecondaryButton--SecondaryButtonActive' : ''}`}
                            texto="VERIFICAR SOPORTES"
                            onClick={showVerify}
                        />
                    ) : null}
                    <SecondaryButton
                        clase={`SecondaryButton ${ActiveButton.toLowerCase() === 'search' ? 'SecondaryButton--SecondaryButtonActive' : ''}`}
                        texto="BUSCAR"
                        onClick={showSearch}
                    />
                    <SecondaryButton
                        clase={`SecondaryButton ${ActiveButton.toLowerCase() === 'user' ? 'SecondaryButton--SecondaryButtonActive' : ''}`}
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
