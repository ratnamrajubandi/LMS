import actions from "./ResetPassword.action.types";
export default function resetPassword(password, id, token) {
  return async (dispatch, getState) => {
    const res = await fetch("http://localhost:4001/resetpassword", {
      method: "POST",
      body: JSON.stringify({ password, id, token }),
      headers: {
        "content-type": "application/JSON",
      },
    });

    dispatch({
      type: actions.RESETPASSWORD,
      payload: res.status,
    });
  };
}
