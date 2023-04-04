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
