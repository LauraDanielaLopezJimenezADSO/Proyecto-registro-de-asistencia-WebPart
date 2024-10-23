import React, { useState, useEffect } from "react";
import Title from "../../../Text/Title.jsx";
import SubTitle from "../../../Text/SubTitle.jsx";
import PrimaryTable from "../../../Table/PrimaryTable.jsx";
import { fetchAsistenciasConDetalles } from "../../../../context/API/API_Asis.js";
import "../../../../styles/InstructorStyles/InstructorHomePageStyle.css";
import "../../../../styles/InstructorStyles/InstructorSearchPageStyle.css";
import Loading from "../../../LoadingCom.jsx";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../../../App.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField, Pagination, Modal, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SecondaryButton from "../../../buttons/secondaryButton.jsx";
import PrimaryButton from "../../../buttons/primaryButton.jsx";
import dayjs from 'dayjs';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function MainVerifyScreen({ UserFirstName, UserDoc }) {
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [paginatedRows, setPaginatedRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null); // Solo una fecha
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedAsistencia, setSelectedAsistencia] = useState(null);
    const rowsPerPage = 10;

    // Obtener todas las asistencias al montar el componente
    useEffect(() => {
        fetchAllData();
    }, [UserFirstName, UserDoc]);

    // Función para obtener todas las asistencias con detalles
    const fetchAllData = async () => {
        try {
            setLoading(true);
            const data = await fetchAsistenciasConDetalles(UserDoc);
            console.log('Asistencias con detalles:', data); // Para depuración
            setRows(data);
            setFilteredRows(data);
            setPage(1);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    // Filtrar los datos según la fecha seleccionada
    const filterByDate = (date) => {
        if (date) {
            const filtered = rows.filter(row => {
                const fechaRegistro = dayjs(row.FechaRegistro).format('YYYY-MM-DD');
                const selectedFormatted = dayjs(date).format('YYYY-MM-DD');
                return fechaRegistro === selectedFormatted;
            });
            setFilteredRows(filtered);
        } else {
            setFilteredRows(rows); // Mostrar todas las asistencias si no hay fecha seleccionada
        }
        setPage(1);
    };

    // Manejo del cambio de fecha
    const handleDateChange = (date) => {
        setSelectedDate(date);
        filterByDate(date);
    };

    // Paginación
    useEffect(() => {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        setPaginatedRows(filteredRows.slice(startIndex, endIndex));
    }, [filteredRows, page]);

    // Mostrar detalles de asistencia en el modal
    const handleShowDetails = (idRegistroAsistencia) => {
        const asistencia = filteredRows.find(a => a.IDRegistroAsistencia === idRegistroAsistencia);
        setSelectedAsistencia(asistencia);
        setShowModal(true);
    };

    // Función para descargar el soporte en PDF
    const downloadPDF = (base64, fileName = 'documento.pdf') => {
        const linkSource = `data:application/pdf;base64,${base64}`;
        const downloadLink = document.createElement('a');
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    };

    if (loading) {
        return (
            <div id="loading">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div id="error">
                <h1>Error: {error.message}</h1>
            </div>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <main id="main">
                <section className="main__UploadMainContent">-
                    <section className="UploadMainContent__TableContainer">
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className="SecondSection__DatePicker"
                                    label="Selecciona una Fecha"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                    inputFormat="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                        </div>

                        {/* Tabla de asistencias */}
                        <PrimaryTable
                            rows={paginatedRows}
                            tipo="traerDetallesAsistencias"
                            handleShowDetails={handleShowDetails}
                        />
                    </section>
                    <Pagination
                        className="UploadMainContent__Pagination"
                        count={Math.ceil(filteredRows.length / rowsPerPage)}
                        page={page}
                        onChange={(event, value) => setPage(value)}
                        color="primary"
                    />


                    {/* Modal para mostrar los detalles */}
                    {showModal && selectedAsistencia && (
                        <Modal open={showModal} onClose={() => setShowModal(false)}>
                            <Box sx={modalStyle}>
                                <h2 style={{color: "black"}}>Detalles de Aprendices</h2>
                                {selectedAsistencia.AprendicesDetalles && selectedAsistencia.AprendicesDetalles.length > 0 ? (
                                    <table className="primary-table">
                                        <thead className="Table__TableHead">
                                        <tr className="TableHeadRow__RowItem">
                                            <th>Nombre Aprendiz</th>
                                            <th>Documento</th>
                                            <th>Horas de Inasistencia</th>
                                            <th>Soporte</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {selectedAsistencia.AprendicesDetalles.map((aprendiz, index) => (
                                            <tr className="TableBodyRow__RowItem" key={index}>
                                                <td>{aprendiz.NombreAprendiz}</td>
                                                <td>{aprendiz.DocumentoAprendiz}</td>
                                                <td>{aprendiz.HorasInasistencia}</td>
                                                <td>
                                                    {aprendiz.Soporte === 'No aplica' || aprendiz.Soporte === 'No adjunto' ? (
                                                        aprendiz.Soporte
                                                    ) : (
                                                        <div style={{margin: "0.5em"}}>
                                                            <PrimaryButton
                                                                clase="PrimaryButton"
                                                                onClick={() => downloadPDF(aprendiz.Soporte, `soporte_${aprendiz.DocumentoAprendiz}.pdf`)}
                                                                texto="Descargar Soporte"
                                                            />
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No hay detalles de aprendices disponibles.</p>
                                )}
                                <SecondaryButton clase="SecondaryButton" texto="Cerrar" onClick={() => setShowModal(false)} />
                            </Box>
                        </Modal>
                    )}
                </section>
            </main>
        </ThemeProvider>
    );
}
