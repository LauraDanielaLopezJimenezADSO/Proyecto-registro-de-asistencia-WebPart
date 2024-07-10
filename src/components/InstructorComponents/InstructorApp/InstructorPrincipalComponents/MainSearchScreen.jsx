import React, { useState, useEffect } from "react";
import Title from "../../../Text/Title.jsx";
import SubTitle from "../../../Text/SubTitle.jsx";
import PrimaryTable from "../../../Table/PrimaryTable.jsx";
import { fetchAsistencias } from "../../../../context/API/API_TableContent.js";
import "../../../../styles/InstructorStyles/InstructorSearchPageStyle.css";
import Loading from "../../../LoadingCom.jsx";
import PrimaryButton from "../../../buttons/primaryButton.jsx";
import PrimaryInput from "../../../inputs/primaryInput.jsx";

export default function MainSearchScreen( { UserFirstName } ){
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const data = await fetchAsistencias(UserFirstName);
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
        return <div id="loading">
            <Loading />
        </div>;;
    }

    if (error) {
        return <div id="error"><h1>Error: {error.message}</h1></div>;
    }

    return (
        <main id="main">
            <Title texto="Bienvenido al sistema de visualización de asistencias" />
            <SubTitle texto="Listado de asistencias" />
            <PrimaryButton>Buscar</PrimaryButton>
            <PrimaryInput></PrimaryInput>
            <PrimaryTable rows={rows} />
        </main>
    );
}