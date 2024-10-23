import React, { useState, useEffect } from "react";
import { Pagination, ThemeProvider, TextField } from "@mui/material";
import { theme } from "../../../../../App.jsx";
import SecondaryButton from "../../../../buttons/secondaryButton.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PrimaryTable from "../../../../Table/PrimaryTable.jsx";

export default function InasistenciasView({ inasistencias, setCurrentView }) {
    const [filteredRows, setFilteredRows] = useState(inasistencias);  // Datos filtrados
    const [paginatedRows, setPaginatedRows] = useState([]);  // Datos paginados
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        setFilteredRows(inasistencias);
    }, [inasistencias]);

    // Filtrado por fechas
    const filterByDates = (startDate, endDate) => {
        if (!startDate && !endDate) {
            setFilteredRows(inasistencias);  // Sin filtros, se muestran todas las inasistencias
        } else {
            const filtered = inasistencias.filter((inasistencia) => {
                const fechaInasistencia = new Date(inasistencia.fecha);  // Suponiendo que el campo de fecha sea `fecha`
                if (startDate && endDate) {
                    return fechaInasistencia >= startDate.toDate() && fechaInasistencia <= endDate.toDate();
                } else if (startDate) {
                    return fechaInasistencia >= startDate.toDate();
                } else if (endDate) {
                    return fechaInasistencia <= endDate.toDate();
                }
                return true;
            });
            setFilteredRows(filtered);
        }
        setPage(1);  // Resetear a la primera página después del filtrado
    };

    // Cambio de fecha de inicio
    const handleStartDateChange = (date) => {
        setStartDate(date);
        filterByDates(date, endDate);
    };

    // Cambio de fecha de fin
    const handleEndDateChange = (date) => {
        setEndDate(date);
        filterByDates(startDate, date);
    };

    // Paginación
    useEffect(() => {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        setPaginatedRows(filteredRows.slice(startIndex, endIndex));
    }, [filteredRows, page]);

    return (
        <ThemeProvider theme={theme}>
            <main id="main">
                <section className="main__UploadMainContent">
                    <section className="UploadMainContent__TableContainer">
                        <h2>Todas las inasistencias</h2>

                        {/* Tabla con las inasistencias paginadas */}
                        <PrimaryTable
                            rows={paginatedRows}
                            tipo="traerInasistenciasPorInstructor"
                        />
                    </section>

                    {/* Paginación */}
                    <Pagination
                        className="UploadMainContent__Pagination"
                        count={Math.ceil(filteredRows.length / rowsPerPage)}
                        page={page}
                        onChange={(event, value) => setPage(value)}
                        color="primary"
                    />

                    {/* Botón para volver */}
                    <SecondaryButton clase="SecondaryButton" texto="Volver" onClick={() => setCurrentView("home")} />
                </section>
            </main>
        </ThemeProvider>
    );
}
