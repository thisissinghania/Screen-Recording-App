import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL, PREVRECORD_POST  } from '../utils/constants';
// import Cookies from 'js-cookie';



const prevRecodApi = createApi({
  reducerPath:'prevRecordApi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL,
    prepareHeaders: (headers) => {
      const authToken = "Bearer ZXlKaGJHY2lPaUpTVXpJMU5pSjkuZXlKemRXSWlPaUk1TWpVeUlpd2laRzl0WVdsdUlqb2lRMElpTENKd2FXUWlPamt6TURJc0ltOXBaQ0k2TmpFMU1Td2laWGh3SWpveE56RTBPREE0TmpFMExDSjFkV2xrSWpvaVpEZ3lOV00zWWpNdE16VXpaQzAwTVRrM0xUa3lNRFl0WlRJNFpXVmxNMlJpTTJZeklpd2lhV0YwSWpveE56RXlNakUyTmpFMExDSnFkR2tpT2lJME16YzFZamhqWmkxak1EUmxMVFEyWVRJdFlUQm1NeTB3TlRJelptSXhZamhsTURZaWZRLlNxa3pWaEJnQ3piM0pqMm04dVZDb04weGZxWWE2NFg2ZkxHdkpOc3NlUW5sT0hhVml2dFh5TDRSME5YZFNOSzh1MXVwLWdpd1JGLXVUY0FhRmRCX2l0amV5cldHb0hZOEJMMUNBRFhaUEpHQ1dzanVmVmdSTnI3cnNLd3dHdWxUNzcyWUtJMUx6LWJiQWk2WVZkVHVkXzRJZmw4THBLRHBFZF9mMkJoMG9jWHFWYW04Q3FydndzWk1vVVpJa1liazFFZzVFSWpBR1IzLUxSZjF1cktwWVRjSDRQanVMT3dqdFZmcXl0WmZfRG9BdmZKZElaanJpN1g4a0VBVmFFWHozWEtGYnRvZElMVmo5Q0pCZkk4QnJJbTA5TDluRmJpRHdRYVdBVmkxd1Z0bTJIa1l3M2xjWEZVQTJCSTlZNGYtTmpweHVLbzdzRXdud2ZidS1LOHJsUQ=="
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
