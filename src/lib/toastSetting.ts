//src\lib\toastSetting.ts
import { toast, type ToastOptions, Bounce } from 'react-toastify';

// Default toast options for both success, error, and warning
const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false, 
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light",
  transition: Bounce
};

export const showToast = (type: 'success' | 'error' | 'warning', message: string) => {
  if (type === 'success') {
    toast.success(message, toastOptions);
  } else if (type === 'error') {
    toast.error(message, toastOptions);
  } else if (type === 'warning') {
    toast.warn(message, toastOptions);  // Add warning toast
  }
};

// Example usage:
// showToast('success', 'This is a success message!');
// showToast('error', 'This is an error message!');
// showToast('warning', 'This is a warning message!');  // Example for warning toast