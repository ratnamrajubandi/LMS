import actions from "./ForgotPassword.action.types";
import { url } from "../../utils";

export function forgotPassword(email) {
  return async (dispatch, getState) => {
    const res = await fetch(`${url}user/forgotpassword`, {
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

export function verifyEmail(id, token) {
  return async (dispatch, getState) => {
    dispatch({
      type: actions.VERIFY_EMAIL_START,
    });

    const res = await fetch(`${url}user/verifyEmail`, {
      method: "POST",
      body: JSON.stringify({ id, token }),
      headers: {
        "content-type": "application/JSON",
      },
    });

    dispatch({
      type: actions.VERIFY_EMAIL,
      payload: res.status,
    });
  };
}
