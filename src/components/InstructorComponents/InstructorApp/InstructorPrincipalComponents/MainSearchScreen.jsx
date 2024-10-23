import React, { useState, useEffect } from "react";
import Title from "../../../Text/Title.jsx";
import SubTitle from "../../../Text/SubTitle.jsx";
import PrimaryTable from "../../../Table/PrimaryTable.jsx";
import CardComponent from "../../../AprendizComponents/AprendizApp/AprendizAppComplements/CardComponent.jsx";
import { fetchAsistencias } from "../../../../context/API/API_Asis.js";
import "../../../../styles/InstructorStyles/InstructorSearchPageStyle.css";
import Loading from "../../../LoadingCom.jsx";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../../../App.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField, Pagination, Modal, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import SecondaryButton from "../../../buttons/secondaryButton.jsx";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function MainSearchScreen({ UserFirstName, UserDoc }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFicha, setSelectedFicha] = useState(null); // Para la ficha seleccionada en el modal
    const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada para filtrar
    const [filteredRows, setFilteredRows] = useState([]); // Asistencias filtradas por ficha
    const [paginatedRows, setPaginatedRows] = useState([]); // Paginación dentro del modal
    const [page, setPage] = useState(1);
    const rowsPerPage = 6;
    const [openModal, setOpenModal] = useState(false);

    // Para la paginación de las cards
    const [cardPage, setCardPage] = useState(1);
    const [paginatedCards, setPaginatedCards] = useState([]);
    const cardsPerPage = 4; // Número de cards por página

    // Obtener todas las asistencias al montar el componente
    useEffect(() => {
        fetchAllData();
    }, [UserFirstName, UserDoc]);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const data = await fetchAsistencias(UserDoc);
            setRows(data); // Guardar todas las asistencias
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    // Obtener solo las fichas únicas para las cards
    const getUniqueFichas = () => {
        const fichasUnicas = Array.from(new Set(rows.map(row => row.Ficha)));
        return fichasUnicas.map(ficha => rows.find(row => row.Ficha === ficha));
    };

    // Paginación de las cards
    useEffect(() => {
        const startIndex = (cardPage - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        setPaginatedCards(getUniqueFichas().slice(startIndex, endIndex));
    }, [rows, cardPage]);

    // Abrir modal con la ficha seleccionada
    const handleOpenModal = (ficha) => {
        setSelectedFicha(ficha);
        filterRowsByFicha(ficha.Ficha);
        setOpenModal(true);
    };

    // Filtrar asistencias por ficha y por fecha si está seleccionada
    const filterRowsByFicha = (ficha, date = selectedDate) => {
        let filtered = rows.filter(row => row.Ficha === ficha); // Mostrar todas las asistencias para la ficha

        if (date) {
            filtered = filtered.filter(row => {
                const fechaRegistro = dayjs(row.FechaRegistro).format('YYYY-MM-DD');
                const selectedFormatted = dayjs(date).format('YYYY-MM-DD');
                return fechaRegistro === selectedFormatted;
            });
        }

        setFilteredRows(filtered); // Guardar las asistencias filtradas
        setPage(1); // Reiniciar paginación dentro del modal
    };

    // Filtrar por fecha dentro del modal
    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (selectedFicha) {
            filterRowsByFicha(selectedFicha.Ficha, date);
        }
    };

    // Paginación dentro del modal
    useEffect(() => {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        setPaginatedRows(filteredRows.slice(startIndex, endIndex));
    }, [filteredRows, page]);

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedDate(null); // Limpiar filtro de fecha al cerrar el modal
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <h1>Error: {error.message}</h1>;
    }

    const renderCard = (ficha, index) => {
        if (!ficha) return <p key={index} style={{ color: "#000" }}>No hay datos disponibles.</p>;

        return (
            <CardComponent
                key={index}
                classNameParent="FirstSection__Card FirstSection__Card--AsisViewer"
                classNameContentContainer="Card__cardContentContainer"
                Title={`Ficha: ${ficha.Ficha}`}
                FirstTxt={`Programa: ${ficha.ProgramaFormacion}`}
                ThirdTxt={`Instructor: ${ficha.Instructor}`}
                onButtonClick={() => handleOpenModal(ficha)}
                textButton="Ver asistencias"
            />
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <main id="main">
                <Title texto="Listado de fichas" />
                <SubTitle texto="Selecciona una ficha para ver las asistencias" />

                {/* Renderizar cards para cada ficha con paginación */}
                <section className="main__FichasAisViewer">
                    <section className="FirstSection__AsisContainer" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {paginatedCards.length > 0 ? paginatedCards.map(renderCard) :
                            <p>No hay fichas disponibles.</p>}
                    </section>
                </section>

                {/* Paginación para las cards */}
                <Pagination
                    className="UploadMainContent__Pagination"
                    count={Math.ceil(getUniqueFichas().length / cardsPerPage)}
                    page={cardPage}
                    onChange={(event, value) => setCardPage(value)}
                    color="primary"
                />

                {/* Modal para mostrar detalles de asistencias por ficha */}
                {openModal && selectedFicha && (
                    <Modal open={openModal} onClose={handleCloseModal}>
                        <Box sx={modalStyle} className="main__UploadMainContent">
                            <h2 style={{ color: "black" }}>Asistencias para la ficha {selectedFicha.Ficha}</h2>

                            <section className="UploadMainContent__TableContainer UploadMainContent__TableContainer--modalStyle">
                                {/* Filtro por fecha */}
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            className="SecondSection__DatePicker"
                                            label="Selecciona una Fecha"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                            inputFormat="DD/MM/YYYY"
                                        />
                                    </LocalizationProvider>
                                </div>

                                {/* Tabla de asistencias filtrada por ficha y fecha */}
                                <PrimaryTable
                                    rows={paginatedRows}
                                    tipo="traerAsistenciasDetalles"
                                />
                            </section>

                            {/* Paginación dentro del modal */}
                            <Pagination
                                className="UploadMainContent__Pagination"
                                count={Math.ceil(filteredRows.length / rowsPerPage)}
                                page={page}
                                onChange={(event, value) => setPage(value)}
                                color="primary"
                            />

                            <SecondaryButton clase="SecondaryButton" texto="Cerrar" onClick={handleCloseModal} />
                        </Box>
                    </Modal>
                )}
            </main>
        </ThemeProvider>
    );
}

