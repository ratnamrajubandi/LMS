import actions from "./ForgotPassword.action.types";
const initialState = {
  responseStatus: "",
};

export default function forgotPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FORGOTPASSWORD:
      return {
        ...state,
        responseStatus: action.payload,
      };
    default:
      return state;
  }
}
