import React, { useState, useEffect } from "react";
import Title from "../../../Text/Title.jsx";

import { fetchAsistencias } from "../../../../context/API/API_TableContent.js";
import "../../../../styles/AprendizStyles/AprendizHomePageStyle.css";
import Loading from "../../../LoadingCom.jsx";
import CardComponent from "../AprendizAppComplements/CardComponent.jsx";

export default function MainHomeScreen({ UserFirstName }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const data = await fetchAsistencias(UserFirstName);
                setRows(data.slice(-5)); // Últimos 5 registros
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [UserFirstName]); // Asegúrate de que `UserFirstName` está bien definido

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

    return (
        <main id="main">
            <Title texto="Bienvenido al sistema de visualización de asistencias" />

            <section className="main__gridContainer">
                <section className="gridContainer__grid-item main-content">
                    <section className="main-content__FirstSection">
                        <CardComponent classNameParent="FirstSection__Card"
                                       classNameContentContainer="Card__cardContentContainer"
                                       Title="Clase con mas inasistencias"
                                       FirstTxt="Instructor: XXXXXXXXXXXXX"
                                       SecordTxt="Horas totales: xxx"
                                       ThirdTxt="Horas inasistencia: xx"/>

                        <CardComponent classNameParent="FirstSection__Card"
                                       classNameContentContainer="Card__cardContentContainer"
                                       Title="Clase con mas inasistencias"
                                       FirstTxt="Instructor: XXXXXXXXXXXXX"
                                       SecordTxt="Horas totales: xxx"
                                       ThirdTxt="Horas inasistencia: xx"/>

                        <CardComponent classNameParent="FirstSection__Card"
                                       classNameContentContainer="Card__cardContentContainer"
                                       Title="Clase con mas inasistencias"
                                       FirstTxt="Instructor: XXXXXXXXXXXXX"
                                       SecordTxt="Horas totales: xxx"
                                       ThirdTxt="Horas inasistencia: xx"/>

                    </section>
                    <section></section>
                    <section></section>
                </section>
                <section className="gridContainer__grid-item sidebar">

                </section>
            </section>

        </main>
    );
}