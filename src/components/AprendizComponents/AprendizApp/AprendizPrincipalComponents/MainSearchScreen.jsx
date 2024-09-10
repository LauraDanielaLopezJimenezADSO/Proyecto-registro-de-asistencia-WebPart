import React, { useState, useEffect } from "react";
import Title from "../../../Text/Title.jsx";
import SubTitle from "../../../Text/SubTitle.jsx";
import PrimaryTable from "../../../Table/PrimaryTable.jsx";
import {fetchAsistencias, fetchHistoricoInasistencias} from "../../../../context/API/API_TableContent.js";
import "../../../../styles/InstructorStyles/InstructorSearchPageStyle.css";
import Loading from "../../../LoadingCom.jsx";
import PrimaryButton from "../../../buttons/primaryButton.jsx";
import PrimaryInput from "../../../inputs/primaryInput.jsx";

export default function MainSearchScreen({ UserFirstName , UserDoc}) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const data = await fetchHistoricoInasistencias(UserDoc);
                setRows(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [UserFirstName]);

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
            <SubTitle texto="Listado de asistencias" />
            <PrimaryTable rows={rows} tipo="traerHistorico"/>
        </main>
    );
}