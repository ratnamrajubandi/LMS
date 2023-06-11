import actions from "./Login.action.types";
import { url } from "../../utils";

export function login(email, password) {
  return async (dispatch, getState) => {
    const reqBody = JSON.stringify({
      email,
      password,
    });
    try {
      const res = await fetch(`${url}login`, {
        method: "POST",
        body: reqBody,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const data = await res.text();

        dispatch({
          type: actions.LOGIN_ERROR,
          payload: {
            status: res.status,
            message: data || "",
          },
        });
        return;
      }
      const data = await res.json();

      dispatch({
        type: actions.LOGIN,
        payload: data,
      });
    } catch (err) {
      console.log("err: ", err);
      console.log("err in login: ", err);
    }
  };
}

export function initializeLogin() {
  return async (dispatch, getState) => {
    dispatch({
      type: actions.LOGIN_INITIALIZE,
    });
  };
}
