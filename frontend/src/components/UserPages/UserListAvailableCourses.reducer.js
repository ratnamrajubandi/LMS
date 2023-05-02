import actions from "./UserListAvailableCourses.action.types";
const initialState = {
  courses: [],
};

const listUserAvailableCoursesReducer = (state = initialState, action) => {
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

export default listUserAvailableCoursesReducer;
