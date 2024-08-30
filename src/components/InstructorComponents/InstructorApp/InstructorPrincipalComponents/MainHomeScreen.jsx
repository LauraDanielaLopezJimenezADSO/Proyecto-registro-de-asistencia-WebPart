import React, { useState, useEffect } from "react";
import Title from "../../../Text/Title.jsx";
import SubTitle from "../../../Text/SubTitle.jsx";
import PrimaryTable from "../../../Table/PrimaryTable.jsx";
import { fetchAsistencias } from "../../../../context/API/API_TableContent.js";
import "../../../../styles/InstructorStyles/InstructorHomePageStyle.css";
import Loading from "../../../LoadingCom.jsx";

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
            <SubTitle texto="Últimas 5 asistencias" />
            <PrimaryTable rows={rows} />
        </main>
    );
}