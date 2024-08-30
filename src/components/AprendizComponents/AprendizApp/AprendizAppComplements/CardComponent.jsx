import React from "react";
import "../../../../styles/AprendizStyles/AprendizHomePageStyle.css";

export default function CardComponent({ classNameParent, classNameContentContainer, Title, FirstTxt, SecordTxt, ThirdTxt }) {
    return (
        <div className={classNameParent}>
            <div className={classNameContentContainer}>
                <h2>{Title}</h2>
                <p>{FirstTxt}</p>
                <p>{SecordTxt}</p>
                <p>{ThirdTxt}</p>
            </div>
        </div>
    )
}