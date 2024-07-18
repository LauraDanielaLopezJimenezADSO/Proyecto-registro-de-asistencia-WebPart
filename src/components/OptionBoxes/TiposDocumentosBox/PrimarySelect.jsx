// eslint-disable-next-line no-unused-vars
import React from "react";
import PrimarySelectOption from "./SelectCustomOptions/PrimarySelectOption.jsx";
import '../../../styles/ComponentStyles/Select/Select.css'

export default function PrimarySelect({ Endpoint, Disabled }) {


    return (
        <select id="Select" disabled={Disabled}>
            <PrimarySelectOption Endpoint={Endpoint} />
        </select>
    );
}
