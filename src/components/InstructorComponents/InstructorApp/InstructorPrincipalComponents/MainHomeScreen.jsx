import React, { useState, useEffect } from "react";
import Title from "../../../Text/Title.jsx";
import SubTitle from "../../../Text/SubTitle.jsx";
import PrimaryTable from "../../../Table/PrimaryTable.jsx";
import CardComponent from "../../../AprendizComponents/AprendizApp/AprendizAppComplements/CardComponent.jsx";
import {
    fetchAsistencias, fetchInasistencias
} from "../../../../context/API/API_Asis.js";
import "../../../../styles/InstructorStyles/InstructorHomePageStyle.css";
import Loading from "../../../LoadingCom.jsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../../../App.jsx";
import SecondaryButton from "../../../buttons/secondaryButton.jsx";

export default function MainHomeScreen({ UserFirstName, UserDoc }) {
    const [rows, setRows] = useState([]);
    const [inasistencias, setInasistencias] = useState([]);
    const [resumenInasistencias, setResumenInasistencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentView, setCurrentView] = useState("home"); // Vista actual

    // Llamadas para obtener las asistencias, inasistencias y resumen
    useEffect(() => {
        async function getData() {
            try {
                const dataAsistencias = await fetchAsistencias(UserDoc);
                setRows(dataAsistencias.slice(-5)); // Últimos 5 registros de asistencias

                // Asumiendo que tienes otro servicio o endpoint para obtener las inasistencias agrupadas por clase
                const dataInasistencias = await fetchInasistencias(UserDoc);
                setInasistencias(dataInasistencias.slice(0, 3)); // Mostrar solo las primeras 3 inasistencias



                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        getData();
    }, [UserFirstName, UserDoc]);

    const handleShowAllInasistencias = () => {
        setCurrentView("inasistencias");
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

    if (currentView === "inasistencias") {
        return (
            <div>
                {/* Mostrar todas las inasistencias en otra vista */}
                <SubTitle texto="Todas las inasistencias" />
                <PrimaryTable rows={inasistencias} tipo="traerInasistenciasPorInstructor" />
                <SecondaryButton texto="Volver" onClick={() => setCurrentView("home")} />
            </div>
        );
    }

    const renderCard = (inasistencia, index) => {
        if (!inasistencia) return <p key={index}>No hay datos disponibles.</p>;

        return (
            <CardComponent
                key={index}
                classNameParent="FirstSection__Card"
                classNameContentContainer="Card__cardContentContainer"
                Title={inasistencia.ClaseFormacion || "Clase no especificada"}
                FirstTxt={`Aprendiz: ${inasistencia.NombreAprendiz || 'No disponible'}`}
                SecordTxt={`Programa: ${inasistencia.ProgramaFormacion || 'No disponible'}`}
                ThirdTxt={`Horas de inasistencia: ${inasistencia.TotalHorasInasistencia || 0}`}
                FourthTxt={`Ficha: ${inasistencia.NumeroFicha || 'No disponible'}`}
            />
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <main id="main">
                <section className="main__gridContainer">
                    {/* Primera Sección - Ocupa 2/5 del ancho */}
                    <section className="main-content__FirstSection">
                        <SubTitle text="Aprendices con mas Inasistencias" />
                        {inasistencias.length > 0 ? (
                            inasistencias.map(renderCard) // Mostrar solo las primeras 3 clases con más inasistencias
                        ) : (
                            <p>No hay inasistencias registradas.</p>
                        )}
                        <SecondaryButton
                            clase="SecondaryButton"
                            texto="Mostrar todas las inasistencias"
                            onClick={handleShowAllInasistencias}
                        />
                    </section>

                    {/* Segunda Sección - Ocupa 3/5 del ancho */}
                    <section className="main-content__SecondSection">
                        <SubTitle text="Últimas 5 asistencias" />
                        <PrimaryTable rows={rows} tipo="traerAsistencias" /> {/* Mostrar las últimas 5 asistencias */}
                    </section>

                    {/* Tercera Sección - Ocupa ambas columnas */}
                    <section className="main-content__ThirdSection">
                        <SubTitle text="Resumen de inasistencias por clase" />
                        {resumenInasistencias.length > 0 ? (
                            <PrimaryTable rows={resumenInasistencias} tipo="verSoportes" /> // Resumen de inasistencias
                        ) : (
                            <p>No hay registros de inasistencias disponibles.</p>
                        )}
                    </section>
                </section>
            </main>
        </ThemeProvider>
    );
}