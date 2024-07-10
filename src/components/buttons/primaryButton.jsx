import React from "react";
import "../../styles/ComponentStyles/Buttons/PrimaryButton.css"

export default function PrimaryButton({ texto, clase, link }) {
  return <a className={ clase } href={ link }>{texto}</a>;
}



