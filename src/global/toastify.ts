/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ToastOptions, toast } from 'react-toastify'

const Emmiter: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light'
}

export const notifyError = (msg: string) => {
  toast.dismiss()
  toast.error(msg, Emmiter)
}

export const notifySuccess = (msg: string) => {
  toast.dismiss()
  toast.success(msg, Emmiter)
}
