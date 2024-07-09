import React, { useState, useEffect } from "react";
import Title from "../../Text/Title.jsx";
import PrimaryTable from "../../Table/PrimaryTable.jsx";
import { fetchAsistencias } from "../../../context/API/API_TableContent.js";
import "../../../styles/InstructorStyles/InstructorHomePageStyle.css"

export default function Main() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const data = await fetchAsistencias('Jeisson');
                setRows(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        getData();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <main id="main">
            <Title texto="Bienvenido al sistema de visualización de asistencias" />
            <PrimaryTable rows={rows} />
        </main>
    );
}