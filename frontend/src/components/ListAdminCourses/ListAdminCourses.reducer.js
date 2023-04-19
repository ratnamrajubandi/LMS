import actions from "./ListAdminCourses.action.types";
const initialState = {
  courses: [],
};

const listAdminCoursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_COURSES:
      return {
        ...initialState,
        courses: action.payload,
      };
    default:
      return state;
  }
};

export default listAdminCoursesReducer;
