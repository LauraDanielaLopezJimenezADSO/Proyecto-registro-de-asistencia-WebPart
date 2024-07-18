// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Title from "../../../Text/Title.jsx";
import SubTitle from "../../../Text/SubTitle.jsx";
import PrimaryTable from "../../../Table/PrimaryTable.jsx";
import { fetchAsistencias } from "../../../../context/API/API_ListarAsitencias.js";
import "../../../../styles/InstructorStyles/InstructorSearchPageStyle.css";
import Loading from "../../../LoadingCom.jsx";
import PrimarySelect from "../../../OptionBoxes/TiposDocumentosBox/PrimarySelect.jsx";

export default function MainSearchScreen({ UserFirstName }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const data = await fetchAsistencias(UserFirstName, null, null, null);
                setRows(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        getData();


    }, [UserFirstName]);

    if (loading) {
        return <div id="loading"><Loading /></div>;
    }

    if (error) {
        return <div id="error"><h1>Error: {error.message}</h1></div>;
    }

    return (
        <main id="main">
            <Title texto="Bienvenido al sistema de visualización de asistencias" />
            <SubTitle texto="Listado de asistencias" />
            <div className="main__ContentContainer">
                <div className="ContentContainer__SelectContainer">
                    <PrimarySelect Endpoint="AmbientesData" Disabled={false} />
                    <PrimarySelect Endpoint="ProgramaFormacionData" Disabled={false} />
                    <PrimarySelect Endpoint="FichasData" Disabled={true} />
                </div>
                <PrimaryTable rows={rows} />
            </div>
        </main>
    );
}
