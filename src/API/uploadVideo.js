import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL, uploadVideoEndPoint } from '../utils/constants';
// import Cookies from 'js-cookie';

const uploadVideo = createApi({
    reducerPath: 'uploadVideo',
    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_URL,
        prepareHeaders: (headers) => {
            const authToken = "Bearer token-goes-here"
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
