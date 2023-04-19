import actions from "./ListAdminCourses.action.types";
import { url } from "../../utils";

export function listAdminCourses() {
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

export function deleteAdminCourse(id) {
  return async (dispatch, getState) => {
    try {
      const deleteResponse = await fetch(`${url}course/${id}`, {
        method: "DELETE",
      });
      console.log("deleteResponse: ", deleteResponse);
      dispatch(listAdminCourses());
    } catch (err) {
      console.log("error in deleting course: ", err);
    }
  };
}

export function updateCourse(id, body) {
  return async (dispatch, getState) => {
    try {
      const updateResponse = await fetch(`${url}course/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("updateResponse: ", updateResponse);
      dispatch(listAdminCourses());
    } catch (err) {
      console.log("error in update course: ", err);
    }
  };
}
