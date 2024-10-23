import TableCustomHead from "./TableCustomContents/TableCustomHead.jsx";
import TableCustomBody from "./TableCustomContents/TableCustomBody.jsx";
import "../../styles/ComponentStyles/Table.css"

export default function PrimaryTable({ rows, tipo, handleFileChange, handleShowDetails }) {
    console.log(tipo)
    // Función para obtener los encabezados según el tipo
    const getHeadersByTipo = (tipo) => {
        switch (tipo) {
            case 'traerHistorico':
                return ['Fecha', 'Clase', 'Instructor', 'Horas de Inasistencia', 'Ambiente', 'Tipo de Asistencia'];
            case 'traerAsistencias':
                return ['Fecha', 'Descargar Archivo'];
            case 'traerDetallesAsistencias':
                return ['Fecha', 'Clase Formación', 'Ficha', 'Programa Formación', 'Tipo de Asistencia', 'Acciones'];
            case 'traerSoporte':
                return ['Fecha', 'Clase', 'Instructor', 'Horas de Inasistencia', 'Tipo de Asistencia', 'Acciones'];
            case 'verSoportes':
                return ['Fecha', 'Clase', 'Instructor', 'Horas de Inasistencia', 'Soporte'];
            case 'vinculaciones':
                return ['Ficha', 'Área', 'Sede', 'Clase Formación', 'Jornada Formación', 'Instructor', 'Nivel Formación', 'Programa Formación'];
            case 'traerAsistenciasDetalles':
                return ['Fecha', 'Clase Formación', 'Ficha', 'Programa Formación', 'Tipo de Asistencia', 'Acciones'];
            default:
                // Fallback a las claves de los objetos si el tipo no coincide
                return Object.keys(rows && rows.length > 0 ? rows[0] : {});
        }
    };

    const headers = getHeadersByTipo(tipo);
    console.log(headers)

    return (
        <table className="primary-table">
            <thead>
            <TableCustomHead headers={headers} tipo={tipo} />
            </thead>
            <tbody>
            {rows && rows.length > 0 ? (
                <TableCustomBody
                    rows={rows}
                    tipo={tipo}
                    handleFileChange={handleFileChange}
                    handleShowDetails={handleShowDetails} // Aseguramos que esta función se pasa
                />
            ) : (
                // Mostrar una fila con mensaje si no hay datos
                <tr>
                    <td colSpan={headers.length} style={{ textAlign: 'center', color: '#000' }}>
                        No hay datos disponibles para mostrar.
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
}
