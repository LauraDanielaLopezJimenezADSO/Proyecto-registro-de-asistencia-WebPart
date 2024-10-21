import React, { useEffect, useState } from "react";
import Loading from "../../../LoadingCom.jsx";
import SubTitle from "../../../Text/SubTitle.jsx";
import PrimaryTable from "../../../Table/PrimaryTable.jsx";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { listarDetallesInasistenciasPorClase } from "../../../../context/API/AprendizAPIAction/API_TraerInasistencias.js";
import { Pagination } from "@mui/lab";
import { TextField, ThemeProvider } from "@mui/material";
import dayjs from "dayjs";
import { theme } from "../../../../App.jsx";
import {subirSoportePDF} from "../../../../context/API/AprendizAPIAction/API_SubirSoporte.js";

export default function MainUploadScreen({ UserFirstName, UserDoc }) {
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    // Mover getData fuera del useEffect
    const getData = async () => {
        try {
            setLoading(true); // Mostrar loading mientras se obtienen los datos
            const data = await listarDetallesInasistenciasPorClase(UserDoc);
            setRows(data);
            // Aplicar filtrado si hay una fecha seleccionada
            if (selectedDate) {
                const filtered = data.filter((row) => {
                    const rowDate = dayjs(row.FechaRegistro);
                    if (!rowDate.isValid()) {
                        console.error(`Fecha inválida en los datos: ${row.FechaRegistro}`);
                        return false;
                    }
                    return rowDate.isSame(selectedDate, 'day');
                });
                setFilteredRows(filtered);
            } else {
                setFilteredRows(data);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [UserFirstName, UserDoc]);

    // Manejo del cambio de fecha
    const handleDateChange = (date) => {
        if (date && date.isValid()) {
            setSelectedDate(date.startOf('day'));
            // Aplicar filtrado al cambiar la fecha
            const filtered = rows.filter((row) => {
                const rowDate = dayjs(row.FechaRegistro);
                if (!rowDate.isValid()) {
                    console.error(`Fecha inválida en los datos: ${row.FechaRegistro}`);
                    return false;
                }
                return rowDate.isSame(date.startOf('day'), 'day');
            });
            setFilteredRows(filtered);
            setPage(1);
        } else {
            setSelectedDate(null);
            setFilteredRows(rows);
        }
    };

    // Función para manejar la carga de archivos
    const handleFileChange = async (event, idRegistroActividad) => {
        const file = event.target.files[0];

        if (file && file.type === 'application/pdf') {
            try {
                await subirSoportePDF(idRegistroActividad, file);
                alert('Soporte PDF subido exitosamente.');
                // Volver a obtener los datos actualizados
                await getData();
            } catch (error) {
                alert('Error al subir el soporte PDF.');
            }
        } else {
            alert('Por favor, seleccione un archivo PDF.');
        }
    };

    // Obtener los datos de la página actual
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedRows = filteredRows.slice(startIndex, endIndex);

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
                                    label="Seleccionar Fecha"
                                    className="SecondSection__DatePicker"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                    inputFormat="DD/MM/YYYY" // Especificar el formato de visualización
                                />
                            </LocalizationProvider>
                        </div>

                        {/* Pasar handleFileChange como prop */}
                        <PrimaryTable
                            rows={paginatedRows}
                            tipo="traerSoporte"
                            handleFileChange={handleFileChange}
                        />
                    </section>

                    {/* Mostrar paginación solo si hay más de una página */}

                    <Pagination
                        className="UploadMainContent__Pagination"
                        count={Math.ceil(filteredRows.length / rowsPerPage)}
                        page={page}
                        onChange={(event, value) => setPage(value)}
                        color="primary"
                    />

                </section>
            </main>
        </ThemeProvider>
    );
}