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
            data.User,
            data.Password,
            data.Documento,
            data.TipoDocumento,
            data.Nombres,
            data.Apellidos,
            data.FechaNacimiento,
            data.Telefono,
            data.Correo,
            data.Genero,
            data.Residencia,
            data.Ficha,
            data.ProgramaFormacion,
            data.JornadaFormacion,
            data.NivelFormacion,
            data.Sede,
            data.Area
        );

        return aprendiz;
    } catch (error) {
        console.error('Error en ObtenerAprendiz:', error);
        throw error;
    }
}