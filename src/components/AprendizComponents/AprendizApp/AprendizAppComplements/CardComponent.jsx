import React from "react";


export default function CardComponent({ classNameParent, classNameContentContainer, Title, FirstTxt, SecordTxt, ThirdTxt, FourthTxt}) {
    return (
        <div className={classNameParent}>
            <div className={classNameContentContainer}>
                <h2>{Title}</h2>
                <p>{FirstTxt}</p>
                <p>{SecordTxt}</p>
                <p>{ThirdTxt}</p>
                <p>{FourthTxt}</p>
            </div>
        </div>
    )
}