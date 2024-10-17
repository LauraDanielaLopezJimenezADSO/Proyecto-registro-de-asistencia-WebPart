import React, { useState, useEffect } from "react";
import "../../../../styles/AprendizStyles/AprendizHomePageStyle.css";
import "../../../../styles/ComponentStyles/Buttons/SecondaryButton.css";
import Loading from "../../../LoadingCom.jsx";
import CardComponent from "../AprendizAppComplements/CardComponent.jsx";
import PrimaryTable from "../../../Table/PrimaryTable.jsx";
import SubTittle from "../../../Text/SubTitle.jsx";
import {
    traerHistoricoInasistencias,
    traerInasistencias
} from "../../../../context/API/AprendizAPIAction/API_TraerInasistencias.js";
import BarChartInasistencias from "../AprendizAppComplements/BarChartInasistencias.jsx";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SecondaryButton from "../../../buttons/secondaryButton.jsx";
import AsisViewerScreen from "./MainHomeScreenComponents/AsisViewer.jsx";
import dayjs from 'dayjs';
import {theme} from "../../../../App.jsx";
import {ThemeProvider} from "@mui/material";

export default function MainHomeScreen({ UserFirstName, UserDoc }) {
    const [AprendizInasistencias, setAprendizInasistencias] = useState([]);
    const [historicoInasistencias, setHistoricoInasistencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Inicializar la fecha seleccionada a hace 7 días desde hoy
    const today = dayjs();
    const lastWeek = today.subtract(7, 'day');
    const [selectedDate, setSelectedDate] = useState(lastWeek);

    const [currentView, setCurrentView] = useState('home'); // Nuevo estado para manejar la vista actual

    useEffect(() => {
        async function getData() {
            if (!UserDoc) {
                setError(new Error("Documento del usuario no está definido."));
                setLoading(false);
                return;
            }

            try {
                // Llamada al endpoint para obtener las inasistencias agrupadas por clase
                const dataInasistenciasClase = await traerInasistencias(UserDoc);
                setAprendizInasistencias(dataInasistenciasClase.slice(0, 2)); // Mostrar solo las primeras 2 inasistencias
                console.log("Inasistencias por clase:", dataInasistenciasClase);

                // Llamada al endpoint para obtener el histórico de inasistencias
                const dataHistoricoInasistencias = await traerHistoricoInasistencias(UserDoc);
                setHistoricoInasistencias(dataHistoricoInasistencias.slice(0, 5));
                console.log("Histórico de inasistencias:", dataHistoricoInasistencias);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [UserFirstName, UserDoc]);

    const handleDate = (date) => {
        if (!date) return;
        setSelectedDate(date);
        console.log("Fecha seleccionada:", date.format('YYYY-MM-DD'));
    };

    const handleShowClasses = () => {
        setCurrentView('inasistencias');
    };

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

    // Renderiza el componente según el estado `currentView`
    if (currentView === 'inasistencias') {
        return <AsisViewerScreen UserFirstName={UserFirstName} UserDoc={UserDoc} />;
    }

    const renderCard = (inasistencia, index) => {
        if (!inasistencia) return <p key={index}>No hay datos disponibles.</p>;

        return (
            <CardComponent
                key={index}
                classNameParent="FirstSection__Card"
                classNameContentContainer="Card__cardContentContainer"
                Title={inasistencia.ClaseFormacion || 'Clase no especificada'}
                FirstTxt={`Instructor: ${inasistencia.Instructor || 'No disponible'}`}
                SecordTxt={`Total Asistencias: ${inasistencia.TotalAsistencias || 0}`}
                ThirdTxt={`Horas de Inasistencia: ${inasistencia.TotalHorasInasistencia || 0}`}
            />
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <main id="main">
                <section className="main__gridContainer">
                    {/* Primera Sección - Ocupa 2/5 del ancho */}
                    <section className="main-content__FirstSection">
                        <SubTittle text="Clases con más inasistencias" />
                        {AprendizInasistencias.length > 0 ? (
                            AprendizInasistencias.map(renderCard) // Renderiza solo los primeros 2 elementos si existen
                        ) : (
                            <p>No hay inasistencias registradas.</p>
                        )}
                        <SecondaryButton texto="Mostrar clases con inasistencias" onClick={handleShowClasses} /> {/* Cambia la vista al hacer clic */}
                    </section>

                    {/* Segunda Sección - Ocupa 3/5 del ancho */}
                    <section className="main-content__SecondSection">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                className="SecondSection__DatePicker"
                                label="Seleccione una fecha"
                                value={selectedDate}
                                onChange={handleDate}
                                format="DD/MM/YYYY"
                            />
                        </LocalizationProvider>
                        <BarChartInasistencias initialDate={selectedDate} UserDoc={UserDoc} />
                    </section>

                    {/* Tercera Sección - Ocupa ambas columnas */}
                    <section className="main-content__ThirdSection">
                        <SubTittle text="Ultimas asistencias" />
                        {historicoInasistencias.length > 0 ? (
                            <PrimaryTable rows={historicoInasistencias} tipo="traerHistorico" /> // Usa tu componente de tabla con los datos
                        ) : (
                            <p>No hay registros de inasistencias disponibles.</p>
                        )}
                    </section>
                </section>
            </main>
        </ThemeProvider>
    );
}