const Course = require("./course.model");

exports.getAllCourses = async () => {
  return await Course.find();
};

exports.createCourse = async (course) => {
  return await Course.create(course);
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
