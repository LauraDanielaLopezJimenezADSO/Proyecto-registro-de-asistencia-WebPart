import TableCustomHead from "./TableCustomContents/TableCustomHead.jsx";
import TableCustomBody from "./TableCustomContents/TableCustomBody.jsx";
import "../../styles/ComponentStyles/Table.css"

export default function PrimaryTable({ rows, tipo }) {
    if (!rows || rows.length === 0) {
        return <div>No hay datos disponibles para mostrar.</div>;
    }

    // Función para obtener los encabezados según el tipo
    const getHeadersByTipo = (tipo) => {
        switch (tipo) {
            case 'traerHistorico':
                return ['Fecha', 'Clase', 'Instructor', 'Horas de Inasistencia', 'Ambiente', 'Tipo de Asistencia'];
            case 'traerAsistencias':
                return ['Fecha', 'Descargar Archivo'];
            case 'traerSoporte':
                return ['Fecha', 'Clase', 'Instructor', 'Horas de Inasistencia', 'Tipo de Asistencia', 'Acciones'];
            case 'verSoportes':
                return ['Fecha', 'Clase', 'Instructor', 'Horas de Inasistencia', 'Soporte'];
            default:
                // Fallback a las claves de los objetos si el tipo no coincide
                return Object.keys(rows[0] || {});
        }
    };

    const headers = getHeadersByTipo(tipo);

    return (
        <table className="primary-table">
            <thead>
            <TableCustomHead headers={headers} tipo={tipo} />
            </thead>
            <tbody>
            <TableCustomBody rows={rows} tipo={tipo} />
            </tbody>
        </table>
    );
}
