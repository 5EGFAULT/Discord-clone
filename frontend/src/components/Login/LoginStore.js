import { createStore } from "redux";

const initialStateLogin = {
  email: "",
  password: "",
};

function LoginReducer(state = initialStateLogin, action) {
  switch (action.type) {
    case "CHANGE_EMAIL":
      return { ...state, email: action.payload };
    case "CHANGE_PASSWORD":
      return { ...state, password: action.payload };
    default:
      return state;
  }
}

export default createStore(LoginReducer);
