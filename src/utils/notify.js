import { toast } from 'react-toastify'

const showSuccess = (msg) => {
  return toast.success(msg)
}

const showInfo = (msg) => {
  return toast.info(msg)
}
const showWarning = (msg) => {
  return toast.warning(msg)
}
const showError = (msg) => {
  return toast.error(msg);
}


export const notify = {
  showSuccess,
  showInfo,
  showWarning,
  showError
}