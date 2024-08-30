import React from "react";
import "../../../styles/ComponentStyles/Table.css"


export default function TableCustomHead() {
    return (
        <tr className="Table__TableHead">
            <th className="TableHeadRow__RowItem">Ambiente</th>
            <th className="TableHeadRow__RowItem">Competencia</th>
            <th className="TableHeadRow__RowItem">Instructor</th>
            <th className="TableHeadRow__RowItem">Fecha</th>
            <th className="TableHeadRow__RowItem">Ficha</th>
            <th className="TableHeadRow__RowItem">Acciones</th>
        </tr>
    );
}