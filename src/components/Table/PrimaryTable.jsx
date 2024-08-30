import TableCustomHead from "./TableCustomContents/TableCustomHead.jsx";
import TableCustomBody from "./TableCustomContents/TableCustomBody.jsx";
import "../../styles/ComponentStyles/Table.css"



export default function PrimaryTable({ rows }) {
    if (!rows || rows.length === 0) {
        return <div>No hay datos disponibles para mostrar.</div>;
    }

    return (
        <table className="primary-table">
            <thead>
            <TableCustomHead />
            </thead>
            <tbody>
            <TableCustomBody rows={rows} />
            </tbody>
        </table>
    );
}