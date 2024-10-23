// TableCustomBody.jsx
import React from 'react';
import dayjs from 'dayjs';
import { downloadArchivoBase64 } from "../../../context/API/API_Asis.js";
import "../../../styles/ComponentStyles/Table.css";
import PrimaryButton from "../../buttons/primaryButton.jsx";
import '../../../styles/ComponentStyles/Buttons/PrimaryButton.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { subirSoportePDF } from "../../../context/API/AprendizAPIAction/API_SubirSoporte.js";

// Estilo para el input oculto
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
});

// Funciones auxiliares

// Función para descargar PDFs desde Base64
const downloadPDF = (base64, fileName = 'documento.pdf') => {
    const linkSource = `data:application/pdf;base64,${base64}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
};

// Función para verificar si el valor es un PDF en Base64
const isBase64PDF = (value) => {
    return typeof value === 'string' && value.trim().startsWith('JVBERi0');
};

// Función para obtener el color según las horas de inasistencia
const obtenerColorPorHoras = (value) => {
    switch (value) {
        case 0:
            return '#289700';
        case 1:
            return '#ffa460';
        case 2:
            return '#ff7c39';
        case 3:
            return '#fc4b08';
        case 4:
            return '#de2e03';
        case 5:
            return '#c00000';
        default:
            return 'gray';
    }
};

// Función para formatear la fecha
const formatearFecha = (fecha) => {
    return fecha ? dayjs(fecha).format('DD/MM/YYYY HH:mm') : 'Fecha no disponible';
};

export default function TableCustomBody({ rows, tipo, handleFileChange, handleShowDetails }) {
    // Función para determinar si el soporte ha sido subido
    const isSoporteSubido = (row) => {
        return row.Soporte && row.Soporte !== '';
    };

    // Función para renderizar filas según el tipo
    const renderRowByTipo = (row, index) => {
        switch (tipo) {
            case 'traerHistorico':
                // Renderizado para 'traerHistorico'
                return (
                    <tr key={index}>
                        <td className="TableBodyRow__RowItem">
                            {formatearFecha(row.FechaRegistro)}
                        </td>
                        <td className="TableBodyRow__RowItem">{row.ClaseFormacion || 'No especificado'}</td>
                        <td className="TableBodyRow__RowItem">{row.Instructor || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span
                                    style={{
                                        backgroundColor: obtenerColorPorHoras(row.HorasInasistencia),
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        width: '15px',
                                        height: '15px',
                                        marginRight: '8px',
                                    }}
                                ></span>
                                {row.HorasInasistencia} horas
                            </div>
                        </td>
                        <td className="TableBodyRow__RowItem">{row.Ambiente || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">{row.TipoAsistencia || 'No disponible'}</td>
                    </tr>
                );
            case 'traerAsistencias':
                // Renderizado para 'traerAsistencias'
                return (
                    <tr key={index}>
                        <td className="TableBodyRow__RowItem">
                            {formatearFecha(row.FechaRegistro)}
                        </td>
                        <td className="TableBodyRow__RowItem">
                            <PrimaryButton
                                clase="PrimaryButton"
                                onClick={() => downloadArchivoBase64(row.ArchivoExcel, `asistencia_${row.FechaRegistro}.xlsx`)}
                                texto="Descargar"
                            />
                        </td>
                    </tr>
                );
            case 'traerSoporte':
                return (
                    <tr key={index} id={`${row.ID}`}>
                        <td className="TableBodyRow__RowItem">
                            {formatearFecha(row.FechaRegistro)}
                        </td>
                        <td className="TableBodyRow__RowItem">{row.ClaseFormacion || 'No especificado'}</td>
                        <td className="TableBodyRow__RowItem">{row.Instructor || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">
                            <div
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <span
                                    style={{
                                        backgroundColor: obtenerColorPorHoras(row.TotalHorasInasistencia),
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        width: '15px',
                                        height: '15px',
                                        marginRight: '8px',
                                    }}
                                ></span>
                                {row.TotalHorasInasistencia} horas
                            </div>
                        </td>
                        <td className="TableBodyRow__RowItem">{row.TipoAsistencia || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">
                            {row.TotalHorasInasistencia > 0 ? (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {/* Rectángulo que indica el estado del soporte */}
                                    <div
                                        style={{
                                            width: '15px',
                                            height: '55px',
                                            backgroundColor: isSoporteSubido(row) ? '#289700' : '#c00000',
                                            marginRight: '8px',
                                            borderRadius: '4px',
                                        }}
                                    ></div>
                                    {/* Botón para cargar el soporte */}
                                    <Button
                                        component="label"
                                        variant="contained"
                                        startIcon={<CloudUploadIcon />}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            backgroundColor: '#002240',
                                        }}
                                    >
                                        Cargar Soporte
                                        <VisuallyHiddenInput
                                            type="file"
                                            onChange={(event) => handleFileChange(event, row.ID)}
                                            multiple={false}
                                        />
                                    </Button>
                                </div>
                            ) : (
                                <span>No Aplica</span>
                            )}
                        </td>
                    </tr>
                );
            case 'verSoportes':
                // Renderizado para 'verSoportes'
                return (
                    <tr key={index}>
                        <td className="TableBodyRow__RowItem">
                            {formatearFecha(row.FechaRegistro)}
                        </td>
                        <td className="TableBodyRow__RowItem">{row.ClaseFormacion || 'No especificado'}</td>
                        <td className="TableBodyRow__RowItem">{row.Instructor || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">
                            <div
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <span
                                    style={{
                                        backgroundColor: obtenerColorPorHoras(row.HorasInasistencia),
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        width: '15px',
                                        height: '15px',
                                        marginRight: '8px',
                                    }}
                                ></span>
                                {row.HorasInasistencia} horas
                            </div>
                        </td>
                        <td className="TableBodyRow__RowItem">
                            {isBase64PDF(row.Soporte) ? (
                                <PrimaryButton
                                    clase="PrimaryButton"
                                    onClick={() => downloadPDF(row.Soporte, `soporte_${row.Documento}.pdf`)}
                                    texto="Descargar PDF"
                                />
                            ) : (
                                row.Soporte || 'No Aplica'
                            )}
                        </td>
                    </tr>
                );
            case 'vinculaciones':
                return (
                    <tr key={index}>
                        <td className="TableBodyRow__RowItem">{row.Ficha || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">{row.Area || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">{row.Sede || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">{row.ClaseFormacion || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">{row.JornadaFormacion || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">{row.NombreInstructor || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">{row.NivelFormacion || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">{row.ProgramaFormacion || 'No disponible'}</td>
                    </tr>
            );

            case 'traerDetallesAsistencias':
                return (
                    <tr key={index}>
                        <td className="TableBodyRow__RowItem">
                            {formatearFecha(row.FechaRegistro)}
                        </td>
                        <td className="TableBodyRow__RowItem">{row.ClaseFormacion || 'No especificado'}</td>
                        <td className="TableBodyRow__RowItem">{row.NumeroFicha || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">{row.ProgramaFormacion || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">{row.TipoAsistencia || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">
                            <PrimaryButton
                                clase="PrimaryButton"
                                onClick={() => handleShowDetails(row.IDRegistroAsistencia)}
                                texto="Ver detalles"
                            />
                        </td>
                    </tr>
                );

            case 'traerAsistenciasDetalles':
                return (
                    <tr key={index}>
                        <td className="TableBodyRow__RowItem">
                            {formatearFecha(row.FechaRegistro)}
                        </td>
                        <td className="TableBodyRow__RowItem">{row.ClaseFormacion || 'No especificado'}</td>
                        <td className="TableBodyRow__RowItem">{row.Ficha || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">{row.ProgramaFormacion || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">{row.TipoAsistencia || 'No disponible'}</td>
                        <td className="TableBodyRow__RowItem">
                            <PrimaryButton
                                clase="PrimaryButton"
                                onClick={() => downloadArchivoBase64(row.ArchivoExcel, `asistencia_${row.FechaRegistro}.xlsx`)}
                                texto="Descargar"
                            />
                        </td>
                    </tr>
                );

            default:
            // Renderizado por defecto si el tipo no coincide
                return (
                    <tr key={index}>
                        {Object.entries(row).map(([key, value], idx) => (
                            <td key={idx} className="TableBodyRow__RowItem">
                                {key.toLowerCase().includes('fecha') ? formatearFecha(value) : value}
                            </td>
                        ))}
                    </tr>
                );
        }
    };

    return (
        <>
            {rows.map((row, index) => renderRowByTipo(row, index))}
        </>
    );
}