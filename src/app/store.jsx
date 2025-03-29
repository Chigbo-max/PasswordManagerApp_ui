import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {passwordManagerApi} from '../services/PasswordManagerApi';

export const store = configureStore({
    reducer: {
        [passwordManagerApi.reducerPath]: passwordManagerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(passwordManagerApi.middleware),
});

setupListeners(store.dispatch);