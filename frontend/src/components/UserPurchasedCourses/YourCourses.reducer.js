import actions from "./YourCourses.action.types";
const initialState = {
  courses: [],
};

const YourCoursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_USER_COURSES:
      return {
        ...initialState,
        courses: action.payload,
      };
    default:
      return state;
  }
};

export default YourCoursesReducer;
