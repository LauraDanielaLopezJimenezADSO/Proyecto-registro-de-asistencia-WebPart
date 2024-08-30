import React from "react";

import { downloadArchivo } from "../../../context/API/API_TableContent.js";
import "../../../styles/ComponentStyles/Table.css"
import PrimaryButton from "../../buttons/primaryButton.jsx";
import '../../../styles/ComponentStyles/Buttons/PrimaryButton.css';

export default function TableCustomBody({ rows }) {
    const handleDownload = (id) => {
        downloadArchivo(id);
    };

    return (
        <>
            {rows.map((row, index) => (
                <tr key={index}>
                    <td className="TableBodyRow__RowItem">{row.Ambiente}</td>
                    <td className="TableBodyRow__RowItem">{row.Competencia}</td>
                    <td className="TableBodyRow__RowItem">{row.Instructor}</td>
                    <td className="TableBodyRow__RowItem">{row.Fecha}</td>
                    <td className="TableBodyRow__RowItem">{row.Ficha}</td>
                    <td className="TableBodyRow__RowItem">
                        <PrimaryButton texto="Descargar" clase="PrimaryButton" onClick={() => handleDownload(row.IDArchivo)}>Descargar</PrimaryButton>
                    </td>
                </tr>
            ))}
        </>
    );
}