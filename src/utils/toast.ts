// utils/toast.ts
import Swal from "sweetalert2";

type ToastType = "success" | "error" | "warning" | "info" | "question";

export function toast(message: string, icon: ToastType = "success") {
    return Swal.fire({
        toast: true,
        icon,
        title: message,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
    });
}


export function toastLoading(message: string) {
    return Swal.fire({
        title: message,
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
    });
}
