import React, {useEffect, useState} from "react";

import Loading from "../../../LoadingCom.jsx";
import SubTitle from "../../../Text/SubTitle.jsx";
import {DatePicker} from "@mui/x-date-pickers";
import PrimaryTable from "../../../Table/PrimaryTable.jsx";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export default function MainVerifyScreen({ UserFirstName, UserDoc }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState('2024-08-31');
    const [ficha, setFicha] = useState(2696521);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            try {
                // Usa los valores de estado que están definidos
                console.log(ficha, selectedDate);

                setRows(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        // Solo ejecuta getData si ficha y selectedDate tienen valores válidos
        if (ficha && selectedDate) {
            getData();
        }
    }, [ficha, selectedDate]); // Dependencias para asegurarse de que `getData` se ejecute cuando estos cambien

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
        const convertF = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;
        setSelectedDate(convertF);

        try {

        } catch (err) {
            setError(err);
        }
    };

    return (
        <main id="main">
            <SubTitle texto="Listado de asistencias" />
            <DatePicker onChange={handleDate} />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Ficha</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ficha}
                    label="Ficha"
                    onChange={(e) => setFicha(e.target.value)}
                >
                    <MenuItem value={2696521}>Ficha 2696521</MenuItem>
                </Select>
            </FormControl>
            <PrimaryTable rows={rows} tipo='verSoportes' />
        </main>
    );
}