import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL, PREVRECORD_POST  } from '../utils/constants';
// import Cookies from 'js-cookie';



const prevRecodApi = createApi({
  reducerPath:'prevRecordApi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL,
    prepareHeaders: (headers) => {
      const authToken = "Bearer token-goes-here"
      if (authToken) {
        console.log("headers",headers);
        headers.set('Authorization', authToken);
      }
      return headers;
    }
  }),
  tagTypes: ['prevRecord'],
  endpoints: (builder) => ({
    
    getPrevRecord: builder.mutation({
      query: (values) => ({
        url: PREVRECORD_POST,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['prevRecord'],
    }),

  
  }),
});

export const {
useGetPrevRecordMutation
} = prevRecodApi;

export default prevRecodApi;
