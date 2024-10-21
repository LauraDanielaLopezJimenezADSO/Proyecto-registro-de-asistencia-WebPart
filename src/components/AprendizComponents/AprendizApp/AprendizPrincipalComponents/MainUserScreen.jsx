import React, { useState, useEffect } from 'react';
import LabelField from "../../../sectionDatos/labelFile.jsx";
import { useAuth } from "../../../../context/API/APISessionManager/userSession.jsx";
import ObtenerUsuario from "../../../../context/API/API_ObtenerUsuario.js";
import PrimaryTable from "../../../Table/PrimaryTable.jsx";
import {Pagination, ThemeProvider} from '@mui/material'; // Importar Pagination de Material-UI
import {theme} from "../../../../App.jsx";

export default function MainUserScreen() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    // Estados para la paginación
    const [page, setPage] = useState(1);
    const rowsPerPage = 1; // Mostrar 1 dato por página
    const [paginatedRows, setPaginatedRows] = useState([]);

    const auth = useAuth();

    if (!auth) {
        console.error('useAuth() returned undefined. Make sure your component is wrapped with <AuthProvider>.');
        return null;
    }

    const { user } = auth;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await ObtenerUsuario(user.Documento);
                console.log('Datos del usuario:', data);
                setUserData(data);
                setPage(1); // Reiniciar la página al cargar nuevos datos
            } catch (err) {
                setError('Error al obtener los datos del usuario');
                console.error(err);
            }
        };

        if (user && user.Documento) {
            fetchUserData();
        }
    }, [user]);

    // Asegurarse de que Vinculaciones es un arreglo completo
    const totalVinculaciones = Array.isArray(userData?.vinculaciones)
        ? userData.vinculaciones
        : userData?.vinculaciones
            ? [userData.vinculaciones]
            : [];

    // Actualizar los datos paginados cada vez que cambie la página o las vinculaciones
    useEffect(() => {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        setPaginatedRows(totalVinculaciones.slice(startIndex, endIndex));
    }, [totalVinculaciones, page]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
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
                            buttonText={userData.tipoDocumento || 'No disponible'}
                        />
                        <LabelField
                            label="Documento"
                            id="documento"
                            type="text"
                            buttonText={userData.documento || 'No disponible'}
                        />
                        <LabelField
                            label="Nombres"
                            id="nombres"
                            type="text"
                            buttonText={`${userData.nombres} ${userData.apellidos}` || 'No disponible'}
                        />
                        <LabelField
                            label="Correo electrónico"
                            id="correo"
                            type="text"
                            buttonText={userData.correo || 'No disponible'}
                        />
                        <LabelField
                            label="Género"
                            id="genero"
                            type="text"
                            buttonText={userData.genero || 'No disponible'}
                        />
                        <LabelField
                            label="Celular"
                            id="celular"
                            type="text"
                            buttonText={userData.telefono || 'No disponible'}
                        />
                        <LabelField
                            label="Residencia"
                            id="residencia"
                            type="text"
                            buttonText={userData.residencia || 'No disponible'}
                        />
                        <LabelField
                            label="Usuario"
                            id="usuario"
                            type="text"
                            buttonText={userData.user || 'No disponible'}
                        />
                        <LabelField
                            label="Contraseña"
                            id="contraseña"
                            type="password"
                            buttonText={'* * * * * * * * *'}
                        />
                    </div>
                </div>

                <h2>Vinculaciones</h2>
                {totalVinculaciones.length > 0 ? (
                    <>
                        <PrimaryTable rows={paginatedRows} tipo="vinculaciones" />

                        <Pagination
                            count={Math.ceil(totalVinculaciones.length / rowsPerPage)}
                            page={page}
                            onChange={(event, value) => setPage(value)}
                            color="primary"
                        />
                    </>
                ) : (
                    <p>No hay vinculaciones disponibles.</p>
                )}
            </section>
        </ThemeProvider>
    );
}