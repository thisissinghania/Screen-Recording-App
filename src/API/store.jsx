import { configureStore, } from '@reduxjs/toolkit';
import prevRecodApi from './PrevRecordAPI';
import checkUserApi from './CheckUser';
import uploadVideo from './uploadVideo';
import idReducer from './videoSlice'
import settingReducer from './settingSlice';
import deviceReducer from './selectedDevice'
export const store = configureStore({
  reducer: {
    [prevRecodApi.reducerPath]: prevRecodApi.reducer,
    [checkUserApi.reducerPath]: checkUserApi.reducer,
    [uploadVideo.reducerPath]: uploadVideo.reducer,
    id: idReducer,
    setting: settingReducer,
    device: deviceReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      prevRecodApi.middleware,
      checkUserApi.middleware,
      uploadVideo.middleware,
    ),
});

export default store;
