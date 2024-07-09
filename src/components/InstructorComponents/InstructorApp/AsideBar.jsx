import React from "react";
import "../../../styles/ComponentStyles/sideBar.css"
import PrimaryButton from "../../buttons/primaryButton.jsx"
import SecondaryButton from "../../buttons/secondaryButton.jsx";
import TextBg from "../../Text/TextBg.jsx";



export default function AsideBar({ UserName, Rol }){
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
          <SecondaryButton clase="SecondaryButton SecondaryButton--SecondaryButtonActive" texto="INICIO"></SecondaryButton>
          <SecondaryButton clase="SecondaryButton" texto="BUSCAR"></SecondaryButton>
          <SecondaryButton clase="SecondaryButton" texto="USUARIO"></SecondaryButton>
          <SecondaryButton clase="SecondaryButton" texto="CONFIGURACIÓN"></SecondaryButton>
        </div>
        <div className="sectionCont__unLogBtnContainer">
          <PrimaryButton texto="CERRAR SESIÓN"></PrimaryButton>
        </div>
      </section>
    </aside>
  );
}