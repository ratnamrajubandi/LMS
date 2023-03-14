import actions from "./SignUp.actions.types";

const initialState = {
  email: "",
  password: "",
  responseStatus: "",
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNUP:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        responseStatus: action.payload.responseStatus,
      };
    case actions.SIGNUP_ERROR:
      return {
        ...state,
        responseStatus: action.payload,
      };
    default:
      return state;
  }
};

export default signUpReducer;
