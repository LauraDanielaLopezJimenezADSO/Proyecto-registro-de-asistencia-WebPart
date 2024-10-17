import React, {useEffect, useState} from "react";

import Loading from "../../../LoadingCom.jsx";
import SubTitle from "../../../Text/SubTitle.jsx";
import PrimaryTable from "../../../Table/PrimaryTable.jsx";
import {DatePicker} from "@mui/x-date-pickers";
import {listarDetallesInasistenciasPorClase} from "../../../../context/API/AprendizAPIAction/API_TraerInasistencias.js";
import {Pagination} from "@mui/lab";
import {TextField, ThemeProvider} from "@mui/material";
import dayjs from "dayjs";
import {theme} from "../../../../App.jsx";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


export default function MainUploadScreen({ UserFirstName, UserDoc }) {
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        async function getData() {
            try {
                const data = await listarDetallesInasistenciasPorClase(UserDoc);
                setRows(data);
                setFilteredRows(data); // Mostrar todas las filas inicialmente
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [UserFirstName, UserDoc]);

    // Filtrar las filas basadas en la fecha seleccionada
    useEffect(() => {
        if (selectedDate) {
            console.log("Fecha seleccionada: ", selectedDate);

            const filtered = rows.filter((row) => {
                const rowDate = dayjs(row.FechaRegistro.split(' ')[0], 'DD/MM/YYYY'); // Parsear la fecha de la tabla
                const selectedFormattedDate = dayjs(selectedDate).format('DD/MM/YYYY'); // Formatear la fecha seleccionada
                console.log("Fecha de la tabla: ", rowDate);
                console.log("Fecha seleccionada formateada: ", selectedFormattedDate);

                return rowDate.isSame(dayjs(selectedFormattedDate, 'DD/MM/YYYY'), 'day'); // Comparar solo el día
            });
            setFilteredRows(filtered);
            setPage(1); // Reiniciar a la primera página después de filtrar
        } else {
            setFilteredRows(rows); // Si no hay fecha seleccionada, mostrar todas las filas
        }
    }, [selectedDate, rows]);

    if (loading) {
        return (
            <div id="loading">
                <Loading />
            </div>
        );
    }

    if (error) {
        return <div id="error"><h1>Error: {error.message}</h1></div>;
    }

    // Manejo del cambio de fecha
    const handleDateChange = (date) => {
        if (date && dayjs(date).isValid()) {
            const formattedDate = dayjs(date).format('DD/MM/YYYY'); // Formatear la fecha seleccionada a DD/MM/YYYY
            setSelectedDate(formattedDate); // Guardar la fecha formateada
        } else {
            setSelectedDate(null); // Si la fecha es inválida, se limpia la selección
        }
    };

    // Obtener los datos de la página actual
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedRows = filteredRows.slice(startIndex, endIndex);

    return (
        <ThemeProvider theme={theme}>
            <main id="main">
                <section className="main__UploadMainContent">
                    <SubTitle texto="Listado de asistencias" />
                    <section className="UploadMainContent__TableContainer">
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Seleccionar Fecha"
                                    className="SecondSection__DatePicker"
                                    value={selectedDate ? dayjs(selectedDate, 'DD/MM/YYYY') : null}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>

                        <PrimaryTable rows={paginatedRows} tipo="traerSoporte" /> {/* Mostrar la tabla con las filas paginadas */}

                    </section>
                    <Pagination
                        className="UploadMainContent__Pagination"
                        count={Math.ceil(filteredRows.length / rowsPerPage)} // Calcular la cantidad total de páginas según las filas filtradas
                        page={page}
                        onChange={(event, value) => setPage(value)}
                        color="primary"
                    />
                </section>
            </main>
        </ThemeProvider>
    );
}