import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice';
import registerReducer from "../features/counter/counterSlice";
import loginReducer from "../features/counter/counterSlice";

export default configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
  },
});
