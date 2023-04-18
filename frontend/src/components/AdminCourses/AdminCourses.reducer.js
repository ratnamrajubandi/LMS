import actions from "./AdminCourses.actions.types";

const initialState = {
  courseId: "",
  courseName: "",
  duration: 0,
  curriculum: [],
  price: 0,
  courses: {},
};

const addCoursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RESET_COURSE:
      return initialState;
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
    case actions.GET_COURSE:
      return {
        ...state,
        courses: {
          ...state.courses,
          [action.payload.courseID]: action.payload,
        },
      };
    default:
      return state;
  }
};

export default addCoursesReducer;
