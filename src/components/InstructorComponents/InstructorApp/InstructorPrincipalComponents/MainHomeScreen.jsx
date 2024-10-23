import React, { useState, useEffect } from "react";
import SubTitle from "../../../Text/SubTitle.jsx";
import PrimaryTable from "../../../Table/PrimaryTable.jsx";
import CardComponent from "../../../AprendizComponents/AprendizApp/AprendizAppComplements/CardComponent.jsx";
import {
    fetchAsistencias, fetchInasistencias, fetchAsistenciasConDetalles
} from "../../../../context/API/API_Asis.js";
import "../../../../styles/InstructorStyles/InstructorHomePageStyle.css";
import Loading from "../../../LoadingCom.jsx";
import {Box, ThemeProvider} from "@mui/material";
import { theme } from "../../../../App.jsx";
import SecondaryButton from "../../../buttons/secondaryButton.jsx";
import { Modal } from '@mui/material';
import PrimaryButton from "../../../buttons/primaryButton.jsx";
import InasistenciasView from "./AprendizAsisViewer/ApAsisViewer.jsx";
import {Pagination} from "@mui/lab";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    backgroundColor: '#fff',
    boxShadow: 24,
    p: 4,
    padding: '2em',
};

export default function MainHomeScreen({ UserFirstName, UserDoc }) {
    const [rows, setRows] = useState([]);
    const [inasistencias, setInasistencias] = useState([]);
    const [resumenInasistencias, setResumenInasistencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentView, setCurrentView] = useState("home");
    const [showModal, setShowModal] = useState(false);
    const [selectedAsistencia, setSelectedAsistencia] = useState(null);

    const [filteredRows, setFilteredRows] = useState([]);
    const [paginatedRows, setPaginatedRows] = useState([]);
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        async function getData() {
            try {
                const dataAsistencias = await fetchAsistencias(UserDoc);
                setRows(dataAsistencias.slice(-7));

                const dataInasistencias = await fetchInasistencias(UserDoc);
                setInasistencias(dataInasistencias);

                const dataResumenInasistencias = await fetchAsistenciasConDetalles(UserDoc);
                setResumenInasistencias(dataResumenInasistencias);
                setFilteredRows(dataResumenInasistencias);

                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                setError(error);
                setLoading(false);
            }
        }
        getData();
    }, [UserFirstName, UserDoc]);

    useEffect(() => {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        setPaginatedRows(filteredRows.slice(startIndex, endIndex));
    }, [filteredRows, page]);

    const handleShowAllInasistencias = () => {
        setCurrentView("inasistencias");
    };

    const handleShowDetails = (idRegistroAsistencia) => {
        const asistencia = resumenInasistencias.find(a => a.IDRegistroAsistencia === idRegistroAsistencia);
        setSelectedAsistencia(asistencia);
        setShowModal(true);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    // Función auxiliar para descargar PDF
    const downloadPDF = (base64, fileName = 'documento.pdf') => {
        const linkSource = `data:application/pdf;base64,${base64}`;
        const downloadLink = document.createElement('a');
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    };

    if (loading) {
        return (
            <div id="loading">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div id="error">
                <h1>Error: {error.message}</h1>
            </div>
        );
    }

    if (currentView === "inasistencias") {
        return (
            <InasistenciasView inasistencias={inasistencias} setCurrentView={setCurrentView} />
        );
    }

    const renderCard = (inasistencia, index) => {
        if (!inasistencia) return <p key={index}>No hay datos disponibles.</p>;

        return (
            <CardComponent
                key={index}
                classNameParent="FirstSection__Card"
                classNameContentContainer="Card__cardContentContainer"
                Title={inasistencia.ClaseFormacion || "Clase no especificada"}
                FirstTxt={`Aprendiz: ${inasistencia.NombreAprendiz || 'No disponible'}`}
                SecordTxt={`Programa: ${inasistencia.ProgramaFormacion || 'No disponible'}`}
                ThirdTxt={`Horas de inasistencia: ${inasistencia.TotalHorasInasistencia || 0}`}
                FourthTxt={`Ficha: ${inasistencia.NumeroFicha || 'No disponible'}`}
            />
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <main id="main">
                <section className="main__gridContainer">
                    {/* Primera Sección */}
                    <section className="main-content__FirstSection">
                        <SubTitle text="Aprendices con más Inasistencias" />
                        {inasistencias && inasistencias.length > 0 ? (
                            inasistencias.slice(0, 2).map(renderCard)
                        ) : (
                            <p>No hay inasistencias registradas.</p>
                        )}
                        <SecondaryButton
                            clase="SecondaryButton"
                            texto="Mostrar todas las inasistencias"
                            onClick={handleShowAllInasistencias}
                        />
                    </section>

                    {/* Segunda Sección */}
                    <section className="main-content__SecondSection">
                        <SubTitle text="Últimas 5 asistencias" />
                        <PrimaryTable rows={rows} tipo="traerAsistencias" />
                    </section>

                    {/* Tercera Sección */}
                    <section className="main-content__ThirdSection">
                        <SubTitle text="Resumen de las últimas 2 asistencias" />
                        {resumenInasistencias && resumenInasistencias.length > 0 ? (
                            <PrimaryTable
                                rows={paginatedRows.slice(0, 2)}
                                tipo="traerDetallesAsistencias"
                                handleShowDetails={handleShowDetails}
                            />
                        ) : (
                            <p>No hay registros de asistencias disponibles.</p>
                        )}
                    </section>
                </section>

                {showModal && selectedAsistencia && (
                    <Modal open={showModal} onClose={() => setShowModal(false)}>
                        <Box sx={modalStyle} className="main__UploadMainContent">
                            <h2 style={{color: "black"}}>Detalles de Aprendices</h2>

                            <section className="UploadMainContent__TableContainer UploadMainContent__TableContainer--modalStyle">

                                {/* Tabla con los datos filtrados */}
                                <table className="primary-table">
                                    <thead className="Table__TableHead">
                                    <tr className="TableHeadRow__RowItem">
                                        <th>Nombre Aprendiz</th>
                                        <th>Documento</th>
                                        <th>Horas de Inasistencia</th>
                                        <th>Soporte</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {selectedAsistencia.AprendicesDetalles.map((aprendiz, index) => (
                                        <tr className="TableBodyRow__RowItem" key={index}>
                                            <td>{aprendiz.NombreAprendiz}</td>
                                            <td>{aprendiz.DocumentoAprendiz}</td>
                                            <td>{aprendiz.HorasInasistencia}</td>
                                            <td>
                                                {aprendiz.Soporte === 'No aplica' || aprendiz.Soporte === 'No adjunto' ? (
                                                    aprendiz.Soporte
                                                ) : (
                                                    <div style={{margin: "0.5em"}}>
                                                        <PrimaryButton
                                                            clase="PrimaryButton"
                                                            onClick={() => downloadPDF(aprendiz.Soporte, `soporte_${aprendiz.DocumentoAprendiz}.pdf`)}
                                                            texto="Descargar Soporte"
                                                        />
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                ) : (
                                <p>No hay detalles de aprendices disponibles.</p>
                            </section>
                            {/* Paginación dentro del modal */}
                            <Pagination
                                className="UploadMainContent__Pagination"
                                count={Math.ceil(filteredRows.length / rowsPerPage)}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                            />
                            {/* Botón de cierre del modal */}
                            <SecondaryButton clase="SecondaryButton" texto="Cerrar" onClick={() => setShowModal(false)} />
                        </Box>
                    </Modal>
                )}
            </main>
        </ThemeProvider>
    );
}
