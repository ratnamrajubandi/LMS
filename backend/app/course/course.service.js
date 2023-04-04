const Course = require("./course.model");
const { nanoid } = require("nanoid");

exports.getAllCourses = async () => {
  return await Course.find();
};

exports.createCourse = async (course) => {
  // const randomId = 'asdfds';
  const randomId = nanoid();
  const courseToBeInserted = {
    ...course,
    courseID: randomId,
  };
  return await Course.create(courseToBeInserted);
};
exports.getCourseById = async (id) => {
  return await Course.findById(id);
};

exports.updateCourse = async (id, course) => {
  return await Course.findByIdAndUpdate(id, course);
};

exports.deleteCourse = async (id) => {
  return await Course.findByIdAndDelete(id);
};
