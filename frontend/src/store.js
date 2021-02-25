import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./Features/registerSlice";
import loginReducer from "./Features/loginSlice";

export default configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
  },
});
