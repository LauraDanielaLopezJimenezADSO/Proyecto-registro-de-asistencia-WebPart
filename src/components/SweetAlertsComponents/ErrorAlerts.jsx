import Swal from "sweetalert2";

export const ErrorToast = Swal.mixin({
    toast: true,
    position: "top-end",
    icon: "error",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

export const showErrorToast = (message) => {
    ErrorToast.fire({
        title: message,
    });
};