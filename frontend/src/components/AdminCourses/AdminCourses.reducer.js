import actions from "./AdminCourses.actions.types";

const initialState = {
  courseId: "",
  courseName: "",
  duration: 0,
  curriculum: [],
  price: 0,
};

const addCoursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADDCOURSES:
      return {
        ...state,
        courseId: action.payload.courseId,
        courseName: action.payload.courseName,
        duration: action.payload.duration,
        curriculum: action.payload.curriculum,
        price: action.payload.price,
        responseStatus: 200,
      };
    case actions.ADDCOURSES_ERROR:
      return {
        ...state,
        responseStatus: action.payload,
      };
    default:
      return state;
  }
};

export default addCoursesReducer;
