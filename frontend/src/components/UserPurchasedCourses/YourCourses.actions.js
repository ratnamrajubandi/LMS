import actions from "./YourCourses.action.types";
import { url } from "../../utils";

export function listUserPurchasedCourses(email) {
  return async (dispatch, getState) => {
    try {
      console.log("email: ", email);
      const courseResponse = await fetch(`${url}items/${email}`);
      if (courseResponse?.ok) {
        const courseData = await courseResponse.json();
        console.log("course data: ", courseData);

        dispatch({
          type: actions.GET_USER_COURSES,
          payload: courseData || [],
        });
        return;
      }
      console.log("error in fetching courses: ", courseResponse);
    } catch (err) {
      console.log("err in fetching courses: ", err);
    }
  };
}
