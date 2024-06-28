import React from "react";
import "../../styles/InstructorStyles/button.css"

export default function PrimaryButton({ texto }) {
  return <button className="button">{texto}</button>;
}