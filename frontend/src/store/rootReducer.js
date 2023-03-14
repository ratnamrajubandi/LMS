import { combineReducers } from "redux";
import loginReducer from "../components/Login/Login.reducer";
import signUpReducer from "../components/SignUp/SignUp.reducer";

export default combineReducers({
  login: loginReducer,
  signup: signUpReducer
});
