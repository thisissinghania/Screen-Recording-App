import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL, CHECKUSER  } from '../utils/constants';
// import Cookies from 'js-cookie';

const checkUserApi = createApi({
  reducerPath:'checkUserApi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL,
    prepareHeaders:async (headers) => {

      let authToken;
      // // Using async/await to wait for chrome.storage.local.get() to finish
      // await new Promise((resolve) => {
      //   chrome.storage.local.get(['cookieValue'], function (result) {
      //     if (result.cookieValue) {
      //       authToken = `Bearer ${result.cookieValue} `;
      //     }
      //     resolve();
      //   });
      // });

       authToken =  "Bearer token-goes-here"
      // const authToken = `Bearer ${localStorage.getItem("__Secure-next-auth.session-token")}`;
      if (authToken) {
        headers.set('Authorization', authToken);
      }
      return headers;
    }
  }),
  tagTypes: ['checkUser'],
  endpoints: (builder) => ({
    getUserCheck: builder.mutation({
      query: () => ({
        url: CHECKUSER,
        method: 'GET',
        // body: values,
      }),
      invalidatesTags: ['checkUser'],
    }),
  }),
});

export const {
useGetUserCheckMutation
} = checkUserApi;

export default checkUserApi;
