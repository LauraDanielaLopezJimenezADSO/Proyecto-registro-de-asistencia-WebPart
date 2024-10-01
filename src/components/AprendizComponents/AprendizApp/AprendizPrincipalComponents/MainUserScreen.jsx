import LabelField from "../../../sectionDatos/labelFile.jsx";
import {useAuth} from "../../../../context/API/APISessionManager/userSession.jsx";
import {useEffect, useState} from "react";
import ObtenerUsuario from "../../../../context/API/API_ObtenerUsuario.js";



export default function MainUserScreen() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const auth = useAuth();

    if (!auth) {
        console.error('useAuth() returned undefined. Make sure your component is wrapped with <AuthProvider>.');
        return null; // Maneja el error según tu lógica de aplicación
    }

    const { user } = auth;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log(user.Documento);
                const data = await ObtenerUsuario(user.Documento);
                setUserData(data);
                console.log(userData)
            } catch (err) {
                setError('Failed to fetch user data');
                console.error(err);
            }
        };

        if (user && user.Documento) {
            fetchUserData();
        }
    }, [user]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <section className="section__datos">
            <div className="datos">
                <h2>Datos del Instructor</h2>
            </div>
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
                        buttonText={userData.nombres + ' ' + userData.apellidos || 'No disponible'}
                    />
                    <LabelField
                        label="Correo electrónico"
                        id="correo"
                        type="text"
                        buttonText={userData.correo || 'No disponible'}
                    />
                    <LabelField
                        label="Sexo"
                        id="sexo"
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
                        label="Sede"
                        id="sede"
                        type="text"
                        buttonText={userData.sede || 'No disponible'}
                    />
                    <LabelField
                        label="Usuario"
                        id="usuario"
                        type="text"
                        buttonText={userData.user || 'No disponible'}
                    />
                    <LabelField
                        label="Programa de Formación"
                        id="programa_formacion"
                        type="text"
                        buttonText={userData.programaFormacion || 'No disponible'}
                    />
                    <LabelField
                        label="Jornada de Formación"
                        id="jornada_formacion"
                        type="text"
                        buttonText={userData.jornadaFormacion || 'No disponible'}
                    />
                    <LabelField
                        label="Nivel de Formación"
                        id="nivel_formacion"
                        type="text"
                        buttonText={userData.nivelFormacion || 'No disponible'}
                    />
                    <LabelField
                        label="Número de Ficha"
                        id="numero_ficha"
                        type="text"
                        buttonText={userData.ficha || 'No disponible'}
                    />
                    <LabelField
                        label="Contraseña"
                        id="contraseña"
                        type="password" // Cambiado a 'password' para mayor seguridad
                        buttonText={'••••••••'} // No mostrar la contraseña en texto plano
                    />
                </div>
            </div>
        </section>
    );
}