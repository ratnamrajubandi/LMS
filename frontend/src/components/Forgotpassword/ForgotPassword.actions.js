import actions from "./ForgotPassword.action.types";

export function forgotPassword(email) {
  return async (dispatch, getState) => {
    const res = await fetch("http://localhost:4001/user/forgotpassword", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "content-type": "application/JSON",
      },
    });

    dispatch({
      type: actions.FORGOTPASSWORD,
      payload: res.status,
    });
  };
}
