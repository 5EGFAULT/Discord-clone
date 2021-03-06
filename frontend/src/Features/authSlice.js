import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    email: "",
    password: "",
    username: "",
    day_of_birth: 0,
    year_of_birth: 0,
    month_of_birth: "",
    userpic: null,
    id: null,
  },
  reducers: {
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserpic: (state, action) => {
      state.userpic = action.payload;
    },
    setid: (state, action) => {
      state.id = action.payload;
    },
    setisAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
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
  setisAuthenticated,
  setUserpic,
  setid,
} = authSlice.actions;
export const selectisAuthenticated = (state) => state.auth.isAuthenticated;
export const selectEmail = (state) => state.auth.email;
export const selectid = (state) => state.auth.id;
export const selectUserpic = (state) => state.auth.Userpic;
export const selectUsername = (state) => state.auth.username;
export const selectDay = (state) => state.auth.day_of_birth;
export const selectMonth = (state) => state.auth.month_of_birth;
export const selectYear = (state) => state.auth.year_of_birth;
export const selectPassword = (state) => state.auth.password;

export default authSlice.reducer;
