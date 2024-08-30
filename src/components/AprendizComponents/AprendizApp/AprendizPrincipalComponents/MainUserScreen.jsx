import LabelField from "../../../sectionDatos/labelFile.jsx";
import UserCredentials from "../../../../context/API/APISessionManager/userSession.js";

export default function MainUserScreen() {
    const userInstance = UserCredentials.getInstance();

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
                        buttonText={userInstance.getUserDocument()}
                    />
                    <LabelField
                        label="Nombres"
                        id="nombres"
                        type="text"
                        buttonText={userInstance.getUserFirstName()}
                    />
                    <LabelField
                        label="Apellidos"
                        id="apellidos"
                        type="text"
                        buttonText={userInstance.getUserLastName()}
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