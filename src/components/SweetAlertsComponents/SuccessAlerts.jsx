import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Inicializa SweetAlert con React
const MySwal = withReactContent(Swal);

// Función para mostrar el Toast de éxito
export const SuccessToast = ({ title }) => {
    // Definir las opciones del Toast
    const Toast = MySwal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        width: '25%',
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    // Llama a la función Toast.fire con el ícono y el título proporcionados
    Toast.fire({
        icon: "success",
        title: title
    });

    return null; // No necesitas renderizar ningún componente visible
};