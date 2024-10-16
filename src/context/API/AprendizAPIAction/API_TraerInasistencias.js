export async function traerInasistencias(DocumentoAprendiz) {
    try {
        const response = await fetch(`http://localhost:8080/Asistencia/listarAsistenciasAgrupadasPorClase?documento=${DocumentoAprendiz}`);
        if (!response.ok) {
            throw new Error('Error al obtener el histórico de inasistencias');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el histórico de inasistencias:', error);
        throw error;
    }
}

// Función para obtener inasistencias de un aprendiz en una semana a partir de una fecha de inicio
export async function obtenerInasistenciasPorSemana(documento, fechaInicio) {
    try {
        const response = await fetch(`http://localhost:8080/Asistencia/ObtenerUsuarioHorasInasistenciaPorSemana?documento=${documento}&fechaInicio=${fechaInicio}`);

        // Si la respuesta es 404 (no encontrado), devolvemos una lista vacía
        if (response.status === 404) {
            console.warn('No se encontraron datos para el documento y la semana especificados.');
            return [];
        }

        if (!response.ok) {
            throw new Error('Error al obtener inasistencias por semana');
        }

        const data = await response.json();
        return data.map(item => ({
            Fecha: item.Fecha,
            NombreClase: item.NombreClase,
            Instructor: item.Instructor,
            Aprendiz: item.Aprendiz,
            HorasInasistencia: item.HorasInasistencia
        }));
    } catch (error) {
        console.error('Error al obtener inasistencias por semana:', error);
        throw error;
    }
}


export async function traerHistoricoInasistencias(documento) {
    try {
        const response = await fetch(`http://localhost:8080/Asistencia/listarAsistenciasPorAprendiz?documento=${documento}`);
        if (!response.ok) {
            throw new Error('Error al obtener el histórico de inasistencias');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el histórico de inasistencias:', error);
        throw error;
    }
}

export async function listarDetallesInasistenciasPorClase(documento) {
    try {
        const response = await fetch(`http://localhost:8080/Asistencia/listarDetallesInasistenciasPorClase?documento=${documento}`);
        if (!response.ok) {
            throw new Error('Error al obtener el histórico de inasistencias');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el histórico de inasistencias:', error);
        throw error;
    }
}

