import React from "react";
import PrimaryButton from "../../buttons/primaryButton";
import { downloadArchivo } from "../../../context/API/API_TableContent.js";

export default function TableCustomBody({ rows }) {
    const handleDownload = async (id) => {
        try {
            await downloadArchivo(id);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <tbody>
            {rows.map((row, index) => (
                <tr key={index}>
                    <th>{row.Ambiente}</th>
                    <th>{row.Competencia}</th>
                    <th>{row.Instructor}</th>
                    <th>{row.Fecha}</th>
                    <th>{row.Ficha}</th>
                    <th>
                        <PrimaryButton texto="abrir" onClick={() => handleDownload(row.IDArchivo)} />
                    </th>
                </tr>
            ))}
        </tbody>
    );
}