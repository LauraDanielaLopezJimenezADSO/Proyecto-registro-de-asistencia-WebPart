import React from "react";
import "../../styles/ComponentStyles/Title.css"

export default function Title( {texto} ){
    return (
        <h1 className="Title">{texto}</h1>
    )
}