import TableCustomHead from "./TableCustomContents/TableCustomHead.jsx";
import TableCustomBody from "./TableCustomContents/TableCustomBody.jsx";
import "../../styles/ComponentStyles/Table.css"



export default function PrimaryTable({ rows , tipo }) {
    if (!rows || rows.length === 0) {
        return <div>No hay datos disponibles para mostrar.</div>;
    }

    // Verificar las claves de las filas para asegurarte de que coinciden con las cabeceras de la tabla
    const headers = Object.keys(rows[0] || {});

    return (
        <table className="primary-table">
            <thead>
            <TableCustomHead headers={headers} tipo={tipo} />
            </thead>
            <tbody>
            <TableCustomBody rows={rows} tipo={tipo}/>
            </tbody>
        </table>
    );
}
