// Archivo: /src/context/API/API_Asis.js

// Función para obtener las asistencias de un instructor específico
export async function fetchAsistencias(documentoInstructor) {
    try {
        const response = await fetch(`http://localhost:8080/Asistencia/listar/InstructorAsis?documentoInstructor=${documentoInstructor}`);
        if (!response.ok) {
            throw new Error('Error al obtener las asistencias');
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error al obtener las asistencias:', error);
        throw error;
    }
}

// Función para obtener las inasistencias agrupadas por clase, ficha y aprendiz
export async function fetchInasistencias(documentoInstructor) {
    try {
        const response = await fetch(`http://localhost:8080/Data/Instructores/aprendices-inasistencias?documentoInstructor=${documentoInstructor}`);
        if (!response.ok) {
            throw new Error('Error al obtener las inasistencias');
        }
        const data = await response.json();
        console.log(data)
        return data.map(item => ({
            NombreAprendiz: item.NombreAprendiz,
            DocumentoAprendiz: item.DocumentoAprendiz,
            ClaseFormacion: item.ClaseFormacion,
            NumeroFicha: item.NumeroFicha,
            ProgramaFormacion: item.ProgramaFormacion,
            TotalHorasInasistencia: item.TotalHorasInasistencia,
            ClasesInasistencia: item.ClasesInasistencia,
        }));
    } catch (error) {
        console.error('Error al obtener las inasistencias:', error);
        throw error;
    }
}

// Función para descargar el archivo de asistencia a partir del Base64
export function downloadArchivoBase64(base64Data, fileName = 'asistencia.xlsx') {
    const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64Data}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

export async function fetchAsistenciasConDetalles(documentoInstructor) {
    try {
        const response = await fetch(`http://localhost:8080/Data/Instructores/listar/AsistenciasInstructorConDetalles?documentoInstructor=${documentoInstructor}`);
        if (response.status === 204) { // No Content
            return []; // Devolvemos un array vacío
        }

        if (!response.ok) {
            throw new Error('Error al obtener las asistencias con detalles');
        }

        const data = await response.json();
        return data; // Aseguramos que siempre sea un array
    } catch (error) {
        console.error('Error al obtener las asistencias con detalles:', error);
        throw error;
    }
}






