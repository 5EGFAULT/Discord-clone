import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    email: "",
    password: "",
    username: "",
    day_of_birth: 0,
    year_of_birth: 0,
    month_of_birth: "",
  },
  reducers: {
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    changeUsername: (state, action) => {
      state.username = action.payload;
    },
    changeMonth: (state, action) => {
      state.month_of_birth = action.payload;
    },
    changeDay: (state, action) => {
      state.day_of_birth = action.payload;
    },
    changeYear: (state, action) => {
      state.year_of_birth = action.payload;
    },
    changePassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const {
  changePassword,
  changeEmail,
  changeDay,
  changeMonth,
  changeUsername,
  changeYear,
} = registerSlice.actions;
export const selectEmail = (state) => state.register.email;
export const selectUsername = (state) => state.register.username;
export const selectDay = (state) => state.register.day_of_birth;
export const selectMonth = (state) => state.register.month_of_birth;
export const selectYear = (state) => state.register.year_of_birth;
export const selectPassword = (state) => state.register.password;

export default registerSlice.reducer;
