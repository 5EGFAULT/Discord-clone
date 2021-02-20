import { createStore } from "redux";

const initialStateRegister = {
  email: "",
  username: "",
  password: "",
  dob: {
    month: "",
    day: 0,
    year: 0,
  },
};

function RegisterReducer(state = initialStateRegister, action) {
  let dob;
  switch (action.type) {
    case "CHANGE_EMAIL":
      return { ...state, email: action.payload };
    case "CHANGE_USERNAME":
      return { ...state, username: action.payload };
    case "CHANGE_PASSWORD":
      return { ...state, password: action.payload };
    case "CHANGE_DOB_MONTH":
      dob = state.dob;
      return { ...state, dob: { ...dob, month: action.payload } };
    case "CHANGE_DOB_DAY":
      dob = state.dob;
      return { ...state, dob: { ...dob, day: action.payload } };
    case "CHANGE_DOB_YEAR":
      dob = state.dob;
      return { ...state, dob: { ...dob, year: action.payload } };
    // case "CHANGE_DOB":
    //   return { ...state, dob: action.payload };
    default:
      return state;
  }
}

export default createStore(RegisterReducer);

/*var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();
data.append('email', 'esdgdgdsgsdg');
data.append('password', 'fbdfbdfb');
data.append('username', 'sdgsdgsdg');
data.append('date_of_birth', '1-12-2000');

var config = {
  method: 'post',
  url: 'localhost:3003/register',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});*/
