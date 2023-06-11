import actions from "./Login.action.types";

const initialState = {
  email: "",
  password: "",
  responseStatus: "",
  jwt: "",
  errorMessage: "",
  ////
  // userid:"",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_INITIALIZE:
      return {
        ...initialState,
      };
    case actions.LOGIN:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        responseStatus: "",
        errorMessage: "",
        jwt: action.payload.token,
        role: action.payload.role,
        /////
        // userid:action.payload._id
      };
    case actions.LOGIN_ERROR:
      return {
        ...state,
        responseStatus: action.payload.status,
        errorMessage: action.payload.message,
        jwt: "",
      };
    default:
      return state;
  }
};

export default loginReducer;
