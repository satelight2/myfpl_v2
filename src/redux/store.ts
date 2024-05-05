import {configureStore} from '@reduxjs/toolkit';
import showLoadingModalReducer from './loadingSlice';
import userReducer from './userSlice';
import semesterSliceReducer from './SemesterSlice';
const store = configureStore({
  reducer: {
    showLoadingModalReducer,
    userReducer,
    semesterSliceReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
