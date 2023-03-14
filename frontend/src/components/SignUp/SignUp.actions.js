import actions from "./SignUp.actions.types";

export function Signup(email, password) {
  return async (dispatch, getState) => {
    const reqBody = JSON.stringify({
      email,
      password,
    });
    const signUpRes = await fetch("http://localhost:4001/signup", {
      method: "POST",
      body: reqBody,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("signUpRes: ", signUpRes);

    if (!signUpRes.ok) {
      dispatch({
        type: actions.SIGNUP_ERROR,
        payload: signUpRes.status,
      });
      return;
    }
    const data = await signUpRes.json();
    console.log("data: ", data);
    dispatch({
      type: actions.SIGNUP,
      payload: {
        ...data,
        responseStatus: signUpRes.status,
      },
    });
  };
}
