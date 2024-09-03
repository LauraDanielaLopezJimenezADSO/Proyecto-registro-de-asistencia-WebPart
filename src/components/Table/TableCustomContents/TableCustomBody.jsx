import React from "react";

import { downloadArchivo } from "../../../context/API/API_TableContent.js";
import "../../../styles/ComponentStyles/Table.css"
import PrimaryButton from "../../buttons/primaryButton.jsx";
import '../../../styles/ComponentStyles/Buttons/PrimaryButton.css';

export default function TableCustomBody({ rows }) {
    return (
        <>
            {rows.map((row, index) => (
                <tr key={index}>
                    {Object.entries(row).map(([key, value], i) => (
                        <td key={i} className="TableBodyRow__RowItem">
                            {key === 'HorasInasistencia' && typeof value === 'number' ? (
                                // Renderizar el círculo de color con el valor al lado para HorasInasistencia
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <span style={{
                                    backgroundColor:
                                        value === 1 ? '#ffa460' :
                                            value === 2 ? '#ff7c39' :
                                                value === 3 ? '#fc4b08' :
                                                    value === 4 ? '#de2e03' :
                                                        value === 5 ? '#c00000' :
                                                            'gray',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    width: '15px',
                                    height: '15px',
                                    marginRight: '8px'
                                }}></span>
                                    {value} horas
                                </div>
                            ) : key === 'IDArchivo' && typeof value === 'number' ? (
                                // Renderizar botón de descarga si existe un IDArchivo
                                <PrimaryButton clase="PrimaryButton"
                                               onClick={() => downloadArchivo(value)}
                                               texto="Descargar"/>

                            ) : (

                                value
                            )}
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}