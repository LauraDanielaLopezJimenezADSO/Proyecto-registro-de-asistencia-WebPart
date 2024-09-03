export async function traerInasistencias(DocumentoAprendiz) {
    return await fetch('http://localhost:8080/Horas/ObtenerUsuarioHorasInasistencia?documento=' + DocumentoAprendiz)
        .then(rp => rp.json())
}

export async function fetchInasistenciasPorRangoFechas(documento, fechaInicio) {
    try {
        const response = await fetch(`http://localhost:8080/Horas/ObtenerUsuarioHorasInasistenciaPorRangoFechas?documento=${documento}&fechaInicio=${fechaInicio}`);
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}