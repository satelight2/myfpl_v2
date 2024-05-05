import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export type LoadingModalSliceState = {
  isShowLoadingModal: boolean;
};
const loadingSliceInitialState: LoadingModalSliceState = {
  isShowLoadingModal: false,
};
const LoadingModalSlice = createSlice({
  name: 'loading',
  initialState: loadingSliceInitialState,
  reducers: {
    setShowLoadingModal: (
      state,
      action: PayloadAction<LoadingModalSliceState>,
    ) => {
      state.isShowLoadingModal = action.payload.isShowLoadingModal;
    },
  },
});
export const {setShowLoadingModal} = LoadingModalSlice.actions;
export default LoadingModalSlice.reducer;
