import { toast } from 'react-toastify';

import { TOAST_OPTIONS } from 'src/configs';
import { EToastMessage, ToastMessageType } from 'src/types';

export const toastMessageProvider = {
  [EToastMessage.success]: (message: string, options: ToastMessageType) =>
    toast.success(message, options),
  [EToastMessage.info]: (message: string, options: ToastMessageType) =>
    toast.info(message, options),
  [EToastMessage.warning]: (message: string, options: ToastMessageType) =>
    toast.warning(message, options),
  [EToastMessage.error]: (message: string, options: ToastMessageType) =>
    toast.error(message, options),
};

export const showToastMessage = (
  message: string,
  variant: EToastMessage,
  options = TOAST_OPTIONS,
) => {
  return toastMessageProvider[variant](message, options);
};
