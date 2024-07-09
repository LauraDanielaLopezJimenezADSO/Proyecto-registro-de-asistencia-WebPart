import React from "react";
import "../../styles/ComponentStyles/Buttons/SecondaryButton.css";

export default function SecondaryButton({ texto, clase }) {
  return <a className={ clase }>{texto}</a>;
}
