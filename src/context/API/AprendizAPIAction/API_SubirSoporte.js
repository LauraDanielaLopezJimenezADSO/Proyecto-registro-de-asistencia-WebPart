export async function subirSoportePDF(fecha, archivo) {
    // Crear un FormData para enviar el archivo y la fecha
    const formData = new FormData();
    formData.append('fecha', fecha);       // Agregar la fecha
    formData.append('file', archivo);      // Agregar el archivo PDF

    try {
        // Realizar la solicitud fetch al endpoint de Spring Boot
        const response = await fetch('http://localhost:8080/Horas/AgregarSoporte', {
            method: 'POST',
            body: formData,
        });

        // Manejar la respuesta del servidor
        if (response.ok) {
            const result = await response.text(); // Obtener la respuesta como texto
            console.log('Soporte PDF agregado con éxito:', result);
            alert('Soporte PDF agregado con éxito');
        } else {
            // Manejar errores
            const errorText = await response.text();
            console.error('Error al agregar el soporte PDF:', errorText);
            alert('Error al agregar el soporte PDF: ' + errorText);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud: ' + error.message);
    }
}
