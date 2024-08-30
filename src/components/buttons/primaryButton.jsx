import React from "react";
import "../../styles/ComponentStyles/Buttons/PrimaryButton.css"

export default function PrimaryButton({ texto, clase, onClick }) {
  return <button className={clase} onClick={onClick}>{texto}</button>;
}



