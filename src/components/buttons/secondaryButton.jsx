import React from "react";
import "../../styles/ComponentStyles/Buttons/SecondaryButton.css";

export default function SecondaryButton({ clase, texto, onClick }) {
  return <button className={clase} onClick={onClick}>{texto}</button>;
}
