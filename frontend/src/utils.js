import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right',
        // autoClose: 3000,
        // hideProgressBar: true,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
    });
}

export const handleError = (msg) => {
    toast.success(msg, {
        position: 'top-right',
        // autoClose: 3000,
        // hideProgressBar: true,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
    });
}