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
                url: 'api/register',
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
                    headers: {
                        "Content-Type": "application/json"
                    }, 
                }),
            }),

            forgetPassword: builder.mutation({
                query: (forgetData) => ({
                    url: 'api/forget-password',
                    method: 'POST',
                    body: forgetData,
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

export const { useSignUpMutation, useResetPasswordConfirmMutation,
     useForgetPasswordMutation, useSaveCredentialsMutation,
      useLoginMutation } = passwordManagerApi;