const Course = require("./course.model");
// const CourseOrder = require("../user/userOrderModel");
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
  return await Course.find({
    courseID: id,
  });
};

exports.updateCourse = async (id, course) => {
  return await Course.findByIdAndUpdate(id, course);
};

exports.deleteCourse = async (id) => {
  return await Course.findByIdAndDelete(id);
};

exports.addCurriculum = async (id, topicName, topicNotes) => {
  const randomId = nanoid();
  return await Course.updateOne(
    {
      courseID: id,
    },
    {
      $push: {
        curriculum: { name: topicName, notes: topicNotes, id: randomId },
      },
    }
  );
};

////////////
// exports.getUserOrderedCourses = async (email) => {
//   return await CourseOrder.find({
//     email: email,
//   });
// };
////////////

exports.updateCurriculum = async (
  courseId,
  topicName,
  topicNotes,
  curriculumId
) => {
  const updateCondition = {
    courseID: courseId,
    "curriculum.id": curriculumId,
  };

  const updateQuery = {
    $set: {
      "curriculum.$.name": topicName,
      "curriculum.$.notes": topicNotes,
    },
  };
  return await Course.updateOne(updateCondition, updateQuery);
};

exports.deleteCurriculum = async (courseId, curriculumId) => {
  const whereCondition = {
    courseID: courseId,
  };

  const deleteQuery = {
    $pull: { curriculum: { id: curriculumId } },
  };

  return await Course.updateOne(whereCondition, deleteQuery);
};
