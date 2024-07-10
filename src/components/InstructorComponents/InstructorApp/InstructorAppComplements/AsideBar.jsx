import React from "react";
import "../../../../styles/ComponentStyles/sideBar.css"
import PrimaryButton from "../../../buttons/primaryButton.jsx"
import SecondaryButton from "../../../buttons/secondaryButton.jsx";
import TextBg from "../../../Text/TextBg.jsx";



export default function AsideBar({ UserName, Rol, ActiveButton }) {
  return (
    <aside className="aside">
      <section className="aside__sectionCont">
        <figure className="sectionCont__ImageCont">
          <img
            src="../../util/icons/LogoSena.png"
            alt=""
            className="ImageCont__Logo"
          />
        </figure>
        <TextBg texto={`Usuario: ${UserName}`} clase="TextBg"></TextBg>
        <TextBg texto={Rol} clase="TextBg TextBg--YllVariant"></TextBg>
      </section>
      <section className="aside__sectionCont aside__sectionCont--SpaceBetween">
        <div className="sectionCont__linksBtnContainer">
          <SecondaryButton 
            clase={`SecondaryButton ${ActiveButton === 'INICIO' ? 'SecondaryButton--SecondaryButtonActive' : ''}`} 
            texto="INICIO"
            link="../../pages/InstructorPages/InstructorHomeScreen.html"
          ></SecondaryButton>
          <SecondaryButton 
            clase={`SecondaryButton ${ActiveButton === 'BUSCAR' ? 'SecondaryButton--SecondaryButtonActive' : ''}`} 
            texto="BUSCAR" 
            link="../../pages/InstructorPages/InstructorSearchScreen.html"
          ></SecondaryButton>
          <SecondaryButton 
            clase={`SecondaryButton ${ActiveButton === 'USUARIO' ? 'SecondaryButton--SecondaryButtonActive' : ''}`} 
            texto="USUARIO"
          ></SecondaryButton>
          <SecondaryButton 
            clase={`SecondaryButton ${ActiveButton === 'CONFIGURACIÓN' ? 'SecondaryButton--SecondaryButtonActive' : ''}`} 
            texto="CONFIGURACIÓN"
          ></SecondaryButton>
        </div>
        <div className="sectionCont__unLogBtnContainer">
          <PrimaryButton texto="CERRAR SESIÓN" clase="PrimaryButton" link="../../../../../index.html"></PrimaryButton>
        </div>
      </section>
    </aside>
  );
}