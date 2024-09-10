import React from "react";

import { downloadArchivo } from "../../../context/API/API_TableContent.js";
import "../../../styles/ComponentStyles/Table.css"
import PrimaryButton from "../../buttons/primaryButton.jsx";
import '../../../styles/ComponentStyles/Buttons/PrimaryButton.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {subirSoportePDF} from "../../../context/API/AprendizAPIAction/API_SubirSoporte.js";


// Función para descargar PDFs desde Base64
const downloadPDF = (base64, fileName = 'documento.pdf') => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// Función para verificar si el valor es un PDF en Base64
const isBase64PDF = (value) => {
    return typeof value === 'string' && value.trim().startsWith('JVBERi0');
};

export default function TableCustomBody({ rows, tipo }) {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleFileChange = async (event, fecha) => {
        const file = event.target.files[0]; // Solo tomar el primer archivo

        if (file && file.type === 'application/pdf') { // Asegurarse de que el archivo es un PDF
            await subirSoportePDF(fecha, file);
        } else {
            alert('Por favor, seleccione un archivo PDF.');
        }
    };

    return (
        <>
            {rows.map((row, index) => (
                <tr key={index}>
                    {Object.entries(row).map(([key, value], i) => (
                        <td key={i} className="TableBodyRow__RowItem">
                            {/* Aplicar la lógica de colores para "HorasInasistencia" en "traerHistorico" y "verSoportes" */}
                            {key === 'HorasInasistencia' && (tipo === 'traerHistorico' || tipo === 'verSoportes') && typeof value === 'number' ? (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{
                                        backgroundColor:
                                            value === 0 ? '#289700' :
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
                            ) : tipo === 'traerAsistencias' && key === 'IDArchivo' && typeof value === 'number' ? (
                                // Manejo de tipo "traerAsistencias" para descargar Excel
                                <PrimaryButton
                                    clase="PrimaryButton"
                                    onClick={() => downloadArchivo(value)}
                                    texto="Descargar"
                                />
                            ) : tipo === 'traerSoporte' && key === 'HorasInasistencia' && typeof value === 'number' ? (
                                // Manejo de tipo "traerSoporte" para cargar soportes
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                    <Button
                                        component="label"
                                        variant="contained"
                                        startIcon={<CloudUploadIcon />}
                                        style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#002240' }}
                                    >
                                        Cargar Soporte
                                        <VisuallyHiddenInput
                                            type="file"
                                            onChange={(event) => handleFileChange(event, row.Fecha?.split(' ')[0])} // Extrae la fecha en formato YYYY-MM-DD si está disponible
                                            multiple={false}
                                        />
                                    </Button>
                                </div>
                            ) : tipo === 'verSoportes' && key === 'Soporte' ? (
                                // Manejo del tipo "verSoportes" para descargar PDF o mostrar texto
                                isBase64PDF(value) ? (
                                    // Si el soporte es un PDF en Base64, mostrar botón de descarga
                                    <PrimaryButton
                                        clase="PrimaryButton"
                                        onClick={() => downloadPDF(value, `soporte_${row.Documento}.pdf`)}
                                        texto="Descargar PDF"
                                    />
                                ) : (
                                    // Mostrar texto si no hay soporte adjunto o es "No Aplica"
                                    value
                                )
                            ) : (
                                // Mostrar el valor por defecto si no cae en ninguna de las condiciones
                                value
                            )}
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}