// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { API_SelectOptionContent } from "../../../../context/API/API_SelectContent/API_SelectOptionContent.js";
import '../../../../styles/ComponentStyles/Select/Option.css'

export default function PrimarySelectOption({ Endpoint }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function fetchOptions() {
            const data = await API_SelectOptionContent(Endpoint);
            setOptions(data);
        }
        fetchOptions();
    }, [Endpoint]);

    return (
        <>
            {options.map((element, index) => (
                <option id="Select" key={index} value={element}>
                    {element}
                </option>
            ))}
        </>
    );
}
