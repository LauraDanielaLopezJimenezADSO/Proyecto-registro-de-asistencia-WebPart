import React, { useState, useEffect } from "react";
import SubTitle from "../../../Text/SubTitle.jsx";
import PrimaryTable from "../../../Table/PrimaryTable.jsx";
import "../../../../styles/InstructorStyles/InstructorSearchPageStyle.css";
import Loading from "../../../LoadingCom.jsx";
import {
    obtenerInasistenciasPorSemana,
    traerHistoricoInasistencias
} from "../../../../context/API/AprendizAPIAction/API_TraerInasistencias.js";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../../../App.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField, Pagination } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';

export default function MainSearchScreen({ UserFirstName, UserDoc }) {
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [paginatedRows, setPaginatedRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(null); // Fecha de inicio
    const [endDate, setEndDate] = useState(null);     // Fecha de fin
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    // Obtener todas las asistencias al montar el componente
    useEffect(() => {
        fetchAllData();
    }, [UserFirstName, UserDoc]);

    // Función para obtener todas las asistencias
    const fetchAllData = async () => {
        try {
            setLoading(true);
            const data = await traerHistoricoInasistencias(UserDoc);
            setRows(data);
            setFilteredRows(data);
            setPage(1);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    // Función para obtener asistencias por semana
    const fetchDataForWeek = async (fechaInicio) => {
        try {
            setLoading(true);
            const fechaInicioFormatted = fechaInicio.format('YYYY-MM-DD'); // Asegúrate de que esté en el formato correcto
            const data = await obtenerInasistenciasPorSemana(UserDoc, fechaInicioFormatted);
            setRows(data);
            setFilteredRows(data);
            setPage(1);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    // Manejo del cambio de fecha de inicio
    const handleStartDateChange = (date) => {
        if (date && date.isValid()) {
            const newStartDate = date.startOf('day');
            const newEndDate = date.add(6, 'day').endOf('day'); // Una semana después
            setStartDate(newStartDate);
            setEndDate(newEndDate);
            fetchDataForWeek(newStartDate);
        } else {
            setStartDate(null);
            setEndDate(null);
            // Volver a obtener todas las asistencias
            fetchAllData();
        }
    };

    // Manejo del cambio de fecha de fin
    const handleEndDateChange = (date) => {
        if (date && date.isValid()) {
            const newEndDate = date.endOf('day');
            const newStartDate = date.subtract(6, 'day').startOf('day'); // Una semana antes
            setEndDate(newEndDate);
            setStartDate(newStartDate);
            fetchDataForWeek(newStartDate);
        } else {
            setStartDate(null);
            setEndDate(null);
            // Volver a obtener todas las asistencias
            fetchAllData();
        }
    };

    // Paginación
    useEffect(() => {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        setPaginatedRows(filteredRows.slice(startIndex, endIndex));
    }, [filteredRows, page]);

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
                <section className="main__UploadMainContent">
                    <SubTitle texto="Listado de asistencias" />
                    <section className="UploadMainContent__TableContainer">
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className="SecondSection__DatePicker"
                                    label="Fecha Inicio"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                    inputFormat="DD/MM/YYYY"
                                />
                                <DatePicker
                                    className="SecondSection__DatePicker"
                                    label="Fecha Fin"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                    inputFormat="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                        </div>

                        <PrimaryTable
                            rows={paginatedRows}
                            tipo="traerHistorico"
                        />
                    </section>

                    {/* Mostrar paginación solo si hay más de una página */}
                    {filteredRows.length > rowsPerPage && (
                        <Pagination
                            className="UploadMainContent__Pagination"
                            count={Math.ceil(filteredRows.length / rowsPerPage)}
                            page={page}
                            onChange={(event, value) => setPage(value)}
                            color="primary"
                        />
                    )}
                </section>
            </main>
        </ThemeProvider>
    );
}