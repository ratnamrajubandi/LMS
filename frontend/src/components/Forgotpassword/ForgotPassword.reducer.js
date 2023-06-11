import actions from "./ForgotPassword.action.types";
const initialState = {
  responseStatus: "",
  loading: false,
  verifyEmailResponseStatus: "",
};

export default function forgotPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FORGOTPASSWORD:
      return {
        ...state,
        responseStatus: action.payload,
      };

    case actions.VERIFY_EMAIL_START:
      return {
        ...state,
        loading: true,
      };
    case actions.VERIFY_EMAIL:
      return {
        ...state,
        loading: false,
        verifyEmailResponseStatus: action.payload,
      };

    default:
      return state;
  }
}
