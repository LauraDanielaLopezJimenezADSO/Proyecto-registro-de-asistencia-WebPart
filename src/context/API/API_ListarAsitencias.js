

export async function fetchAsistencias(instructor, ambiente, IDprograma, ficha) {
    try {
        let StrUrlExt = '';
        if (ambiente != null){
            StrUrlExt += '&ambiente' + ambiente;
        }

        if (IDprograma != null){
            StrUrlExt += '&idProgramaFormacion=' + IDprograma;
        }

        if (ficha != null){
            StrUrlExt += '&ficha=' + ficha;
        }

        const response = await fetch(`http://localhost:8080/Archives/ListarAsistencias?instructor=${instructor}` + StrUrlExt)
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
        const data = await response.json();
        console.log(data);
        return data.map(item => ({
            Ambiente: item.ambiente,
            Competencia: item.competencia,
            Instructor: item.instructor,
            Fecha: item.fecha,
            Ficha: item.ficha,
            IDArchivo: item.IDArchivo
        }));
    } catch (error) {
        console.error('Error en el fetch:', error);
        throw error;
    }
}

export async function downloadArchivo(id) {
    try {
        const response = await fetch(`http://localhost:8080/Archives/descargarArchivo/${id}`);
        if (!response.ok) {
            throw new Error('Error downloading file');
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `asistencia_${id}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
    }
}

