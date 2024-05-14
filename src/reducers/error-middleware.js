import {isRejectedWithValue} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

export const ErrorMiddleware = api => next => action => {
  if (action.type.startsWith('moviesApi/') && isRejectedWithValue(action)) {
    Toast.show({
      type: 'error',
      text1: action.payload?.data?.status_message ?? action.error.message,
    });
  }

  return next(action);
};
