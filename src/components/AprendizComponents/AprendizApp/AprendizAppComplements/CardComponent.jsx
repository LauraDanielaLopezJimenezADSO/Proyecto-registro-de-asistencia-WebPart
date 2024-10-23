import React from "react";
import PrimaryButton from "../../../buttons/primaryButton.jsx";

export default function CardComponent({
                                          classNameParent,
                                          classNameContentContainer,
                                          Title,
                                          FirstTxt,
                                          SecordTxt,
                                          ThirdTxt,
                                          FourthTxt,
                                          onButtonClick,
                                          textButton
                                      }) {
    return (
        <div className={classNameParent}>
            <div className={classNameContentContainer}>
                <h2>{Title}</h2>
                <p style={{marginBottom: '0.25em', marginTop: '1em'}}>{FirstTxt}</p>
                <p style={{marginBottom: '0.25em'}}>{SecordTxt}</p>
                <p style={{marginBottom: '0.25em'}}>{ThirdTxt}</p>
                <p style={{marginBottom: '0.25em'}}>{FourthTxt}</p>

                {/* Mostrar el botón solo si onButtonClick está presente */}
                {onButtonClick && (
                    <PrimaryButton
                        clase="PrimaryButton"
                        texto={textButton}
                        onClick={onButtonClick}
                    />
                )}
            </div>
        </div>
    );
}