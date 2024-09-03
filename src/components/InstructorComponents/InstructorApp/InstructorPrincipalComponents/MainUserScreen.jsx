import LabelField from "../../../sectionDatos/labelFile.jsx";
import {useAuth} from "../../../../context/API/APISessionManager/userSession.jsx";

export default function MainUserScreen() {
    const auth = useAuth();

    if (!auth) {
        console.error('useAuth() returned undefined. Make sure your component is wrapped with <AuthProvider>.');
        return null; // O maneja el error de otra manera
    }

    const { user } = auth;

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
                        buttonText="CC" // Modifica si tienes este dato disponible
                    />
                    <LabelField
                        label="Documento"
                        id="documento"
                        type="text"
                        buttonText={user.documento}
                    />
                    <LabelField
                        label="Nombres"
                        id="nombres"
                        type="text"
                        buttonText={user.nombres}
                    />
                    <LabelField
                        label="Apellidos"
                        id="apellidos"
                        type="text"
                        buttonText={user.apellidos}
                    />
                    <LabelField
                        label="Correo electrónico"
                        id="correo"
                        type="text"
                        buttonText="correo@example.com" // Modifica si tienes este dato disponible
                    />
                    <LabelField
                        label="Sexo"
                        id="sexo"
                        type="text"
                        buttonText="Masculino" // Modifica si tienes este dato disponible
                    />
                    <LabelField
                        label="Celular"
                        id="celular"
                        type="text"
                        buttonText="123456789" // Modifica si tienes este dato disponible
                    />
                    <LabelField
                        label="Especialización"
                        id="especializacion"
                        type="text"
                        buttonText="Especialista" // Modifica si tienes este dato disponible
                    />
                    <LabelField
                        label="Tipo de Instructor"
                        id="tipo_instructor"
                        type="text"
                        buttonText="Instructor" // Modifica si tienes este dato disponible
                    />
                </div>
            </div>
        </section>
    );
}