import React from "react";
import "../../styles/ComponentStyles/Buttons/SecondaryButton.css";

export default function SecondaryButton({ texto, clase, onClick }) {
  return <button className={clase} onClick={onClick}>{texto}</button>;
}
