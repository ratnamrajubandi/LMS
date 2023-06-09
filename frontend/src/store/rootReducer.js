import { combineReducers } from "redux";
import addCoursesReducer from "../components/AdminCourses/AdminCourses.reducer";
import forgotPasswordReducer from "../components/Forgotpassword/ForgotPassword.reducer";
import loginReducer from "../components/Login/Login.reducer";
import resetPasswordReducer from "../components/ResetPassword/ResetPassword.reducer";
import signUpReducer from "../components/SignUp/SignUp.reducer";
import listAdminCoursesReducer from "../components/ListAdminCourses/ListAdminCourses.reducer";
import listUserAvailableCoursesReducer from "../components/UserPages/UserListAvailableCourses.reducer";
import userPurchasedCoursesReducer from "../components/UserPurchasedCourses/YourCourses.reducer";

export default combineReducers({
  login: loginReducer,
  signup: signUpReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  addCourses: addCoursesReducer,
  adminCourses: listAdminCoursesReducer,
  userAvailableCourses: listUserAvailableCoursesReducer,
  userPurchasedCourses: userPurchasedCoursesReducer,
});
