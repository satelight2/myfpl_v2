import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../types/User';
import AxiosInstance from '../helper/axiosInstance';
import {Semester} from '../types/Semester';
export const getSemester = createAsyncThunk(
  'semester/getSemester',
  // Declare the type your function argument here:
  async () => {
    try {
      const response = await AxiosInstance().get('semester');
      return response.data;
      // Inferred return type: Promise<MyData>
    } catch (err) {
      console.log(err);
    }
  },
);
export type LoadingModalSliceState = {
  semesters: Semester[];
};
const semesterSliceInitialState: LoadingModalSliceState = {
  semesters: [],
};
export const semesterSlice = createSlice({
  name: 'semester',
  initialState: semesterSliceInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSemester.pending, state => {})
      .addCase(getSemester.fulfilled, (state, action) => {
        state.semesters = action.payload;
      })
      .addCase(getSemester.rejected, (state, action) => {});
  },
});
export default semesterSlice.reducer;
