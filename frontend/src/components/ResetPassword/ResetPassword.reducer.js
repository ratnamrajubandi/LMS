import actions from "./ResetPassword.action.types";
const initialState = {
  responseStatus: "",
};

export default function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case actions.RESETPASSWORD:
      return {
        ...state,
        responseStatus: action.payload.status,
        responseStatusMessage: action.payload.statusMessage,
      };
    default:
      return state;
  }
}
