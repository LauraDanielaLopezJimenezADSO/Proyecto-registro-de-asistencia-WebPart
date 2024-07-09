import React from "react";
import PrimaryButton from "../../buttons/primaryButton";
import { downloadArchivo } from "../../../context/API/API_TableContent.js";
import "../../../styles/ComponentStyles/Table.css"

export default function TableCustomBody({ rows }) {
    const handleDownload = async (id) => {
        try {
            await downloadArchivo(id);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <tbody className="Table__TableBody">
            {rows.map((row, index) => (
                <tr key={index} className="TableBody__TableBodyRow">
                    <th className="TableBodyRow__RowItem">{row.Ambiente}</th>
                    <th className="TableBodyRow__RowItem">{row.Competencia}</th>
                    <th className="TableBodyRow__RowItem">{row.Instructor}</th>
                    <th className="TableBodyRow__RowItem">{row.Fecha}</th>
                    <th className="TableBodyRow__RowItem">{row.Ficha}</th>
                    <th className="TableBodyRow__RowItem">
                        <PrimaryButton texto="abrir" onClick={() => handleDownload(row.IDArchivo)} />
                    </th>
                </tr>
            ))}
        </tbody>
    );
}