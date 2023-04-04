import actions from "./AdminCourses.actions.types";
import { url } from "../../utils";

export function addCourses(courseID, courseName, duration, curriculum, price) {
  return async (dispatch, getState) => {
    const reqBody = JSON.stringify({
      courseID,
      courseName,
      duration,
      curriculum,
      price,
    });
    try {
      // const res = await fetch("http://localhost:4001/course", {
      const res = await fetch(`${url}course`, {
        method: "POST",
        body: reqBody,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        dispatch({
          type: actions.ADDCOURSES_ERROR,
          payload: res.status,
        });
        return;
      }
      const data = await res.json();
      // console.log("data: ", data);

      dispatch({
        type: actions.ADDCOURSES,
        payload: data,
      });
    } catch (err) {
      console.log("err in adding the course: ", err);
    }
  };
}

// export function initializeLogin() {
//   return async (dispatch, getState) => {
//     dispatch({
//       type: actions.LOGIN_INITIALIZE,
//     });
//   };
// }
