import React from "react";
import TableCustomHead from "./TableCustomContents/TableCustomHead.jsx";
import TableCustomBody from "./TableCustomContents/TableCustomBody.jsx";
import "../../styles/ComponentStyles/Table.css"


export default function PrimaryTable({ rows }) {
    return (
        <table className="Table">
            <TableCustomHead />
            <TableCustomBody rows={rows} />
        </table>
    );
}