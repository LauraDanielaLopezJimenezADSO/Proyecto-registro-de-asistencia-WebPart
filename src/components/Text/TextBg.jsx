import React from "react";
import "../../styles/ComponentStyles/texts/TextBg.css"

export default function TextBg( {texto, clase} ){
    return (
        <h3 className={clase}>{texto}</h3>
    )
}