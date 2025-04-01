import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const passwordManagerApi = createApi({
    reducerPath: 'passwordManagerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('access_token');
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

            getUser: builder.query({
                query: () => "api/get-user",
            }),

            getCredentials: builder.query({
                query: () => "api/retrieve-credentials",
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

            activateAccount: builder.mutation({
                query: (activationData) => ({
                    url: 'api/admin/activate-account',
                    method: 'PATCH',
                    body: activationData,
                }),
            }),

            getUsers: builder.query({
                query: () => 'api/admin/view-all-users',
            }),

            getAuditLogs: builder.query({
                query: ()=> 'api/admin/view-audit-logs',
            }),

            suspendAccount: builder.mutation({
                query: (suspendData) => ({
                    url: 'api/admin/suspend-account',
                    method: 'PATCH',
                    body: suspendData,
                }),
            }),

            closeAccount: builder.mutation({
                query: (closeData) => ({
                    url: 'api/admin/close-account',
                    method: 'PATCH',
                    body: closeData,
                    }),
                    }),

            deleteCredentials: builder.mutation({
                query: (website) => ({
                    url: `api/delete-credential/${encodeURIComponent(website)}`,
                    method: 'PATCH',
                }),
            }),

            updateCredentials: builder.mutation({
                query: (credentials ) => ({
                    url: `api/update-credentials`,
                    method: 'PATCH',
                    body: credentials,
                }),
            }),

            refreshToken: builder.mutation({
                query: () => ({
                    url: 'api/refresh',
                    method: 'POST',
                    body: { refresh_token: localStorage.getItem('refresh_token') },
                }),
            }),


            


        
    })
})

export const {useRefreshTokenMutation,
    useUpdateCredentialsMutation,
     useDeleteCredentialsMutation,
      useGetCredentialsQuery,
       useCloseAccountMutation,
        useSuspendAccountMutation,
         useGetAuditLogsQuery,
          useGetUsersQuery,
           useActivateAccountMutation,
            useGetUserQuery,
             useSignUpMutation,
              useResetPasswordConfirmMutation,
     useForgetPasswordMutation,
      useSaveCredentialsMutation,
      useLoginMutation } = passwordManagerApi;