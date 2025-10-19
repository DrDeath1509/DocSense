import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const successToast = (title, message) => {
  Swal.fire({
    icon: 'success',
    title,
    text: message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

export const rejectedToast = (title, message) => {
  Swal.fire({
    icon: 'error',
    title,
    text: message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};
