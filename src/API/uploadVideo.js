import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL, uploadVideoEndPoint } from '../utils/constants';
// import Cookies from 'js-cookie';

const uploadVideo = createApi({
    reducerPath: 'uploadVideo',
    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_URL,
        prepareHeaders: (headers) => {
            const authToken = "Bearer ZXlKaGJHY2lPaUpTVXpJMU5pSjkuZXlKemRXSWlPaUk1TWpVeUlpd2laRzl0WVdsdUlqb2lRMElpTENKd2FXUWlPamt6TURJc0ltOXBaQ0k2TmpFMU1Td2laWGh3SWpveE56RXpNVGc0TWpBMkxDSjFkV2xrSWpvaVpEZ3lOV00zWWpNdE16VXpaQzAwTVRrM0xUa3lNRFl0WlRJNFpXVmxNMlJpTTJZeklpd2lhV0YwSWpveE56RXdOVGsyTWpBMkxDSnFkR2tpT2lKbE1ETmlOVEUzWkMweVl6UTVMVFF5WVRJdE9EWmhZeTFsTjJVMU1HTTFNRE0zWWpZaWZRLlUyS2laWExWU3pWcmF6LXgydEVlYzJ5eWw5cW42bUxIVlNTS201QTdLakJJOE1HQTZmdC16R2pzbEFSbEFjVlkwTVNLVEJmUE9GdHIxc3JvUGpsLVVQcVlENWEtTkV0YXRFdEJONWlITGoxRnZmVWJLOGN3ZGkzRDAxSDJPbmtXUjc2TmFVQml1bmpfS0VJUFpIYnJtbG5qanpBczIxWC1oaEFONGdiR3Z0TmVTV2tHTGlqVG05NEt2T24wV3VnT3NlREFmZDJDVmZ2TWlxVzRQZ0xTRVhzM2JqTER2d3FXbnhQN3R5MU9xaGNUWnFaM0k0WUtaa3hSdkthSVA1WWprTmozWVRJRklUd1JvTmt3M3p2NXBtd3V6YXNfRThhalhVSzg1bVFGb0tUOFdaRnRWRGtJV1o0MXh6cFQ0dGNNWFZiX3NIOWY0NG9LLTZKNjlQVVJTQQ"
            // const authToken = `Bearer ${localStorage.getItem("__Secure-next-auth.session-token")}`;
            if (authToken) {
                // console.log("headers",headers);
                headers.set('Content-Type', 'multipart/form-data');
                headers.set('Authorization', authToken);
            }
            return headers;
        }
    }),
    tagTypes: ['uploadVideo'],
    endpoints: (builder) => ({
        UploadVideo: builder.mutation({
            query: ({file, filename, sourceType }) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('filename', filename);
                formData.append('sourceType', sourceType);
                return {
                url: uploadVideoEndPoint,
                method: 'POST',
                body: formData
            }},
            invalidatesTags: ['uploadVideo'],
        }),
    }),
});

export const {
    useUploadVideoMutation
} = uploadVideo;

export default uploadVideo;
