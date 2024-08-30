import React, {useEffect} from "react";
import "../../../../styles/ComponentStyles/sideBar.css"
import PrimaryButton from "../../../buttons/primaryButton.jsx"
import SecondaryButton from "../../../buttons/secondaryButton.jsx";
import TextBg from "../../../Text/TextBg.jsx";
import UserCredentials from "../../../../context/API/APISessionManager/userSession.js";

export default function AsideBar({ UserName, Rol, ActiveButton, showHome, showSearch, showUser }) {
  const userInstance = UserCredentials.getInstance();

  // Establece las credenciales del usuario al montar el componente
  useEffect(() => {
    userInstance.setCredentials({
      id: 2,
      documento: 1097096255,
      nombres: 'Jeisson',
      apellidos: 'Leon'
    });
  }, []);

  return (
      <aside className="aside">
        <section className="aside__sectionCont">
          <figure className="sectionCont__ImageCont">
            <img
                src="../../util/icons/LogoSena.png"
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
            <PrimaryButton texto="CERRAR SESIÓN" clase="PrimaryButton" onClick={() => {
              userInstance.clearCredentials(); // Limpia las credenciales al cerrar sesión
              window.location.href = '/index.html'; // Redirigir al inicio de sesión
            }} />
          </div>
        </section>
      </aside>
  );
}
