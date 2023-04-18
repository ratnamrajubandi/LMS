import actions from "./AdminCourses.actions.types";
import { url } from "../../utils";

export function addCourses(courseID, courseName, duration, curriculum, price) {
  return async (dispatch, getState) => {
    dispatch({
      type: actions.RESET_COURSE,
    });
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

export function getCourseByCourseId(courseId) {
  return async (dispatch, getState) => {
    const res = await fetch(`${url}course/${courseId}`);
    if (!res.ok) {
      dispatch({
        type: actions.GET_COURSE_ERROR,
        payload: res.status,
      });
      return;
    }

    const course = await res.json();
    console.log("course in fetch: ", course);
    dispatch({
      type: actions.GET_COURSE,
      payload: course?.data?.[0] || {},
    });
  };
}

export function addCurriculum(courseId, topicName, topicNotes) {
  return async (dispatch, getState) => {
    try {
      const res = await fetch(`${url}course/${courseId}/curriculum`, {
        method: "POST",
        body: JSON.stringify({
          topicName,
          topicNotes,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.log("invalid res: ", res);
      }

      const data = await res.json();
      console.log("data after insert curicullum: ", data);
      dispatch(getCourseByCourseId(courseId));
    } catch (err) {
      console.log("err: ", err);
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
