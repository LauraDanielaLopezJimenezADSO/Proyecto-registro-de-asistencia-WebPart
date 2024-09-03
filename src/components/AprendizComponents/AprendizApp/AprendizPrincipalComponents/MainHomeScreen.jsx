import React, { useState, useEffect } from "react";
import Title from "../../../Text/Title.jsx";
import {fetchAsistencias, fetchHistoricoInasistencias} from "../../../../context/API/API_TableContent.js";
import "../../../../styles/AprendizStyles/AprendizHomePageStyle.css";
import Loading from "../../../LoadingCom.jsx";
import CardComponent from "../AprendizAppComplements/CardComponent.jsx";
import PrimaryTable from "../../../Table/PrimaryTable.jsx";
import SubTittle from "../../../Text/SubTitle.jsx";
import {traerInasistencias} from "../../../../context/API/AprendizAPIAction/API_TraerInasistencias.js";
import BarChartInasistencias from "../AprendizAppComplements/BarChartInasistencias.jsx";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {TextField} from "@mui/material";

export default function MainHomeScreen({ UserFirstName, UserDoc }) {
    const [AprendizInasistencias, setAprendizInasistencias] = useState([]);
    const [historicoInasistencias, setHistoricoInasistencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(String(new Date()));

    useEffect(() => {
        async function getData() {
            if (!UserDoc) {
                setError(new Error("Documento del usuario no está definido."));
                setLoading(false);
                return;
            }

            try {
                // Obtener el histórico de inasistencias para llenar la tabla
                const dataHistorico = await fetchHistoricoInasistencias(UserDoc);
                setHistoricoInasistencias(dataHistorico);
                console.log(dataHistorico)

                // Obtener las inasistencias para llenar las tarjetas
                const dataInasistenciasClase = await traerInasistencias(UserDoc);
                setAprendizInasistencias(dataInasistenciasClase.slice(0, 2)); // Mostrar solo las primeras 2 inasistencias
                console.log(dataInasistenciasClase)

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [UserFirstName, UserDoc]);

    const handleDate = (fecha) => {
        const convertF = String(fecha.getFullYear()) + '-' + String(fecha.getMonth() + 1) + '-' + String(fecha.getDate())
        setSelectedDate(convertF)
        console.log(convertF)
    }


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


    const renderCard = (inasistencia, index) => {
        if (!inasistencia) return <p key={index}>No hay datos disponibles.</p>;

        return (
            <CardComponent
                key={index}
                classNameParent="FirstSection__Card"
                classNameContentContainer="Card__cardContentContainer"
                Title={inasistencia.NombreClase || 'Clase no especificada'}
                FirstTxt={`Instructor: ${inasistencia.NombreInstructor || 'No disponible'}`}
                SecordTxt={`Ficha: ${inasistencia.ProgramaFormacion || 'No disponible'} ${inasistencia.NumeroFicha || ''}`}
                ThirdTxt={`Horas inasistencia: ${inasistencia.HorasInasistencia || 0}`}
            />
        );
    };

    return (
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
                </section>

                {/* Segunda Sección - Ocupa 3/5 del ancho */}
                <section className="main-content__SecondSection">
                    <DatePicker
                        onChange={handleDate}
                    />
                    <BarChartInasistencias initialDate={selectedDate} />
                </section>

                {/* Tercera Sección - Ocupa ambas columnas */}
                <section className="main-content__ThirdSection">
                    <SubTittle text="Histórico de Inasistencias" />
                    {historicoInasistencias.length > 0 ? (
                        <PrimaryTable rows={historicoInasistencias} /> // Usa tu componente de tabla con los datos
                    ) : (
                        <p>No hay registros de inasistencias disponibles.</p>
                    )}
                </section>
            </section>
        </main>
    );
}