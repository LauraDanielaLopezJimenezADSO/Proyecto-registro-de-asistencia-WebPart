import React from "react";
import "../../styles/ComponentStyles/Buttons/SecondaryButton.css";

export default function SecondaryButton({ texto, onClick }) {
  return <button className="SecondaryButton" onClick={onClick}>{texto}</button>;
}
