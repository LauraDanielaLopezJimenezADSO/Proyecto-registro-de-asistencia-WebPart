export async function subirSoportePDF(idRegistroActividad, file) {
    try {
        console.log('subirSoportePDF llamado con ID:', idRegistroActividad);
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`http://localhost:8080/Asistencia/subirSoporte/${idRegistroActividad}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error al subir el soporte PDF.');
        }

        const data = await response.text(); // Si el backend devuelve texto
        return data;
    } catch (error) {
        console.error('Error al subir el soporte PDF:', error);
        throw error;
    }
}