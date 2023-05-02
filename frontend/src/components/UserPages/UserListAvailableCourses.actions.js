import actions from "./UserListAvailableCourses.action.types";
import { url } from "../../utils";

export function listUserAvailableCourses() {
  return async (dispatch, getState) => {
    try {
      const courseResponse = await fetch(`${url}course`);
      if (courseResponse?.ok) {
        const courseData = await courseResponse.json();

        dispatch({
          type: actions.GET_COURSES,
          payload: courseData?.data || [],
        });
        return;
      }
      console.log("error in fetching courses: ", courseResponse);
    } catch (err) {
      console.log("err in fetching courses: ", err);
    }
  };
}