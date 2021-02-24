import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice';
import registerReducer from "./Containers/Register/registerSlice";
import loginReducer from "./Containers/Login/loginSlice";

export default configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
  },
});
