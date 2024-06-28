import React from "react";
import "../../../styles/InstructorStyles/sideBar.css"
import PrimaryButton from "../../buttons/primaryButton.jsx"
import SecondaryButton from "../../buttons/secondaryButton.jsx";


export default function AsideBar(){
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
        <h3>XXXXXXXXXXXXXXXX</h3>
      </section>
      <section className="aside__sectionCont aside__sectionCont--SpaceBetween">
        <div className="sectionCont__linksBtnContainer">
          <SecondaryButton texto="btton1"></SecondaryButton>
          <SecondaryButton texto="btton2"></SecondaryButton>
          <SecondaryButton texto="btton3"></SecondaryButton>
          <SecondaryButton texto="btton4"></SecondaryButton>
          <SecondaryButton texto="btton5"></SecondaryButton>
          <SecondaryButton texto="btton6"></SecondaryButton>
        </div>
        <div className="sectionCont__unLogBtnContainer">
          <PrimaryButton texto="cerrar sesion"></PrimaryButton>
        </div>
      </section>
    </aside>
  );
}