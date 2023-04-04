import actions from "./ResetPassword.action.types";
import { url } from "../../utils";

export default function resetPassword(password, id, token) {
  return async (dispatch, getState) => {
    const res = await fetch(`${url}user/resetpassword`, {
      method: "POST",
      body: JSON.stringify({ password, id, token }),
      headers: {
        "content-type": "application/JSON",
      },
    });
    let statusMessage = "";
    try {
      statusMessage = await res.text();
    } catch (err) {
      console.log("err: ", err);
    }
    dispatch({
      type: actions.RESETPASSWORD,
      payload: {
        status: res.status,
        statusMessage,
      },
    });
  };
}
