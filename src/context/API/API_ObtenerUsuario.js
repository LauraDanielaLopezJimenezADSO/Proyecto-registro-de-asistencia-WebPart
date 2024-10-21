import {AprendizModel} from "../../model/AprendizModel.js";

export default async function ObtenerAprendiz(Doc) {
    try {
        const response = await fetch('http://localhost:8080/Aprendiz/' + Doc);
        if (!response.ok) {
            throw new Error('Error al obtener el aprendiz');
        }
        const data = await response.json();

        // Crear una instancia de AprendizModel con los datos obtenidos
        const aprendiz = new AprendizModel(
            data.User,                    // user
            data.Password,                // password
            data.Documento,               // documento
            data.TipoDocumento,           // tipoDocumento
            data.Nombres,                 // nombres
            data.Apellidos,               // apellidos
            data.FecNacimiento,           // fechaNacimiento
            data.Telefono,                // telefono
            data.Correo,                  // correo
            data.Genero,                  // genero
            data.Residencia,              // residencia
            data.Vinculaciones            // vinculaciones
        );
        return aprendiz;
    } catch (error) {
        console.error('Error en ObtenerAprendiz:', error);
        throw error;
    }
}