import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";
import serverReducer from "./Features/serverSlice";
import errorsReducer from "./Features/errorsSlice";
import thunk from "redux-thunk";
import { logger } from "redux-logger";

export default configureStore({
  reducer: {
    auth: authReducer,
    server: serverReducer,
    errors: errorsReducer,
  },
  middleware: [logger, thunk],
});
