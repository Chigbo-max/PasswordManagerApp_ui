import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const passwordManagerApi = createApi({
    reducerPath: 'passwordManagerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),

    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data) => ({
                url: 'api/signup',
                method: 'POST',
                body: data,
            }),
        }),

        saveCredentials: builder.mutation({
            query: (credentials) => ({
                url: 'api/save-credentials',
                method: 'POST',
                body: credentials,
            }),
        }),

            login: builder.mutation({
                query: (loginData) => ({
                    url: 'api/login',
                    method: 'POST',
                    body: loginData,
                }),
            }),

            resetPassword: builder.mutation({
                query: (resetData) => ({
                    url: 'api/reset-password',
                    method: 'POST',
                    body: resetData,
                }),
            }),

            resetPasswordConfirm: builder.mutation({
                query: (changeData) => ({
                    url: 'api/reset-password-confirm',
                    method: 'POST',
                    body: changeData,
                }),
            }),
        
    })
})

export const { useSignUpMutation, useresetPasswordConfirmMutation,
     useResetPasswordMutation, useSaveCredentialsMutation,
      useLoginMutation } = passwordManagerApi;