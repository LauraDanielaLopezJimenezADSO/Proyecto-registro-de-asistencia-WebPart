import React, { useState, useEffect } from "react";
import LabelField from "../../../sectionDatos/labelFile.jsx";
import {useAuth} from "../../../../context/API/APISessionManager/userSession.jsx";
import {ObtenerInstructor} from "../../../../context/API/API_ObtenerUsuario.js";
import { Pagination, ThemeProvider } from "@mui/material";
import { theme } from "../../../../App.jsx";

export default function MainInstructorScreen() {
    const [instructorData, setInstructorData] = useState(null);
    const [error, setError] = useState(null);

    // Estados para la paginación de clases
    const [page, setPage] = useState(1);
    const rowsPerPage = 1; // Mostrar 3 clases por página
    const [paginatedRows, setPaginatedRows] = useState([]);

    const auth = useAuth();

    if (!auth) {
        console.error('useAuth() returned undefined. Make sure your component is wrapped with <AuthProvider>.');
        return null;
    }

    const { user } = auth;

    useEffect(() => {
        const fetchInstructorData = async () => {
            try {
                const data = await ObtenerInstructor(user.Documento);
                console.log('Datos del instructor:', data);
                setInstructorData(data);
                setPage(1); // Reiniciar la página al cargar nuevos datos
            } catch (err) {
                setError('Error al obtener los datos del instructor');
                console.error(err);
            }
        };

        if (user && user.Documento) {
            fetchInstructorData();
        }
    }, [user]);

    // Obtener el total de las clases para la paginación
    const totalClases = Array.isArray(instructorData?.ClaseFormacion) ? instructorData.ClaseFormacion : [];
    const totalFichas = Array.isArray(instructorData?.Fichas) ? instructorData.Fichas : [];

    // Actualizar los datos paginados cuando cambia la página o los datos de clases
    useEffect(() => {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        setPaginatedRows(totalClases.slice(startIndex, endIndex));
    }, [totalClases, page]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!instructorData) {
        return <div>Cargando...</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            <section className="view-container__datos">
                <h2>Datos del Usuario</h2>
                <div className="datos">
                    <div className="datos__cont">
                        <LabelField
                            label="Tipo de documento"
                            id="tipo_documento"
                            type="text"
                            buttonText={instructorData.TipoDocumento || 'No disponible'}
                        />
                        <LabelField
                            label="Documento"
                            id="documento"
                            type="text"
                            buttonText={instructorData.Documento || 'No disponible'}
                        />
                        <LabelField
                            label="Nombres"
                            id="nombres"
                            type="text"
                            buttonText={`${instructorData.Nombres} ${instructorData.Apellidos}` || 'No disponible'}
                        />
                        <LabelField
                            label="Correo electrónico"
                            id="correo"
                            type="text"
                            buttonText={instructorData.Correo || 'No disponible'}
                        />
                        <LabelField
                            label="Género"
                            id="genero"
                            type="text"
                            buttonText={instructorData.Genero || 'No disponible'}
                        />
                        <LabelField
                            label="Celular"
                            id="celular"
                            type="text"
                            buttonText={instructorData.Telefono || 'No disponible'}
                        />
                        <LabelField
                            label="Residencia"
                            id="residencia"
                            type="text"
                            buttonText={instructorData.Residencia || 'No disponible'}
                        />
                        <LabelField
                            label="Usuario"
                            id="usuario"
                            type="text"
                            buttonText={instructorData.User || 'No disponible'}
                        />
                    </div>
                </div>

                    <h2>Clases del Instructor</h2>
                    {totalClases.length > 0 ? (
                        <>
                            {/* Tabla manual de clases */}
                            <table className="primary-table">
                                <thead>
                                <tr className="Table__TableHead">
                                    <th className="TableHeadRow__RowItem">Clase</th>
                                    <th className="TableHeadRow__RowItem">Ficha</th>
                                    <th className="TableHeadRow__RowItem">Programa de Formación</th>
                                    <th className="TableHeadRow__RowItem">Jornada</th>
                                    <th className="TableHeadRow__RowItem">Centro</th>
                                    <th className="TableHeadRow__RowItem">Área</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginatedRows.map((clase, index) => (
                                    <tr key={index}>
                                        <td className="TableBodyRow__RowItem">{clase || 'No disponible'}</td>
                                        <td className="TableBodyRow__RowItem">{totalFichas[index] || 'No disponible'}</td>
                                        <td className="TableBodyRow__RowItem">{instructorData.ProgramasFormacion[index] || 'No disponible'}</td>
                                        <td className="TableBodyRow__RowItem">{instructorData.JornadasFormacion[index] || 'No disponible'}</td>
                                        <td className="TableBodyRow__RowItem">{instructorData.CentrosFormacion[index] || 'No disponible'}</td>
                                        <td className="TableBodyRow__RowItem">{instructorData.Areas[index] || 'No disponible'}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            {/* Paginación */}
                            <Pagination
                                count={Math.ceil(totalClases.length / rowsPerPage)}
                                page={page}
                                onChange={(event, value) => setPage(value)}
                                color="primary"
                            />
                        </>
                    ) : (
                        <p>No hay clases disponibles.</p>
                    )}
            </section>
        </ThemeProvider>
);
}
