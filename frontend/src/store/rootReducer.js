import { combineReducers } from "redux";
import forgotPasswordReducer from "../components/Forgotpassword/ForgotPassword.reducer";
import loginReducer from "../components/Login/Login.reducer";
import resetPasswordReducer from "../components/ResetPassword/ResetPassword.reducer";
import signUpReducer from "../components/SignUp/SignUp.reducer";

export default combineReducers({
  login: loginReducer,
  signup: signUpReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
});
