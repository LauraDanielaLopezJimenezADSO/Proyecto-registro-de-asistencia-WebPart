import React from "react";
import "../../../styles/ComponentStyles/Table.css"


export default function TableCustomHead({ headers }) {
    return (
        <tr className="Table__TableHead">
            {headers.map((header, index) => (
                <th key={index} className="TableHeadRow__RowItem">{header}</th>
            ))}
        </tr>
    );
}