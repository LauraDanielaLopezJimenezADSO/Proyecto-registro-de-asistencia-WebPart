import React from "react";
import "../../styles/InstructorStyles/button.css";

export default function SecondaryButton({ texto }) {
  return <button className="button button--secondaryBtn">{texto}</button>;
}