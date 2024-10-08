// Archivo: /src/context/API/API_TableContent.js

// Función para obtener las asistencias de un instructor específico
export async function fetchAsistencias(documentoInstructor) {
    try {
        const response = await fetch(`http://localhost:8080/Asistencia/listar/InstructorAsis?documentoInstructor=${documentoInstructor}`);
        if (!response.ok) {
            throw new Error('Error al obtener las asistencias');
        }
        const data = await response.json();
        return data.map(item => ({
            Ambiente: item.Ambiente,
            ClaseFormacion: item.ClaseFormacion,
            Instructor: item.Instructor,
            FechaRegistro: item.FechaRegistro,
            Ficha: item.Ficha,
            TipoAsistencia: item.TipoAsistencia,
            ArchivoExcel: item.ArchivoExcel // Este campo está en Base64
        }));
    } catch (error) {
        console.error('Error al obtener las asistencias:', error);
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




