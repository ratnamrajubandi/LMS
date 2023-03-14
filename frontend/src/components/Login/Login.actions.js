import actions from "./Login.action.types";

export function login(email, password) {
  return async (dispatch, getState) => {
    const reqBody = JSON.stringify({
      email,
      password,
    });
    try {
      const res = await fetch("http://localhost:4001/login", {
        method: "POST",
        body: reqBody,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        dispatch({
          type: actions.LOGIN_ERROR,
          payload: res.status,
        });
        return;
      }
      const data = await res.json();

      dispatch({
        type: actions.LOGIN,
        payload: data,
      });
    } catch (err) {
      console.log("err in login: ", err);
    }
  };
}
