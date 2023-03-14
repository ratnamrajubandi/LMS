import actions from "./Login.action.types";

const initialState = {
  email: "",
  password: "",
  responseStatus: "",
  jwt: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        responseStatus: "",
        jwt: action.payload.token,
      };
    case actions.LOGIN_ERROR:
      return {
        ...state,
        responseStatus: action.payload,
        jwt: "",
      };
    default:
      return state;
  }
};

export default loginReducer;
