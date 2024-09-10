import React, {useEffect, useState} from "react";
import {fetchHistoricoInasistencias, fetchInasistenciasPorFecha} from "../../../../context/API/API_TableContent.js";
import Loading from "../../../LoadingCom.jsx";
import SubTitle from "../../../Text/SubTitle.jsx";
import PrimaryTable from "../../../Table/PrimaryTable.jsx";
import {DatePicker} from "@mui/x-date-pickers";

export default function MainUploadScreen({ UserFirstName , UserDoc}) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(String(new Date()));

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

    const handleDate = async (fecha) => {
        const convertF = String(fecha.getFullYear()) + '-' + String(fecha.getMonth() + 1) + '-' + String(fecha.getDate());
        setSelectedDate(convertF);

        const newDataTable = await fetchInasistenciasPorFecha(UserDoc, convertF);
        setRows(newDataTable);

        console.log(convertF);
    };

    return (
        <main id="main">
            <SubTitle texto="Listado de asistencias" />
            <DatePicker onChange={handleDate} />
            <PrimaryTable rows={rows} tipo='traerSoporte'/>
        </main>
    );
}