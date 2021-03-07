import { createSlice } from "@reduxjs/toolkit";

export const errorsSlice = createSlice({
  name: "errors",
  initialState: {
    errors: null,
  },
  reducers: {
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const { setErrors } = errorsSlice.actions;
export const selectErrors = (state) => state.errors.errors;

export default errorsSlice.reducer;
