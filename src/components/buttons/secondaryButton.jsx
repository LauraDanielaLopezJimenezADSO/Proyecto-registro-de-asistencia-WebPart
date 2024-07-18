// eslint-disable-next-line no-unused-vars
import React from "react";
import "../../styles/ComponentStyles/Buttons/SecondaryButton.css";

export default function SecondaryButton({ texto, clase, link }) {
  return <a className={ clase } href={ link }>{texto}</a>;
}
