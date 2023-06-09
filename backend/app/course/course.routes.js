const express = require("express");
const {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  addCurriculum,
  updateCurriculum,
  deleteCurriculum,
  // getUserOrderedCourses
} = require("./course.controller");

const router = express.Router();

router.route("/").get(getAllCourses).post(createCourse);
router.route("/:id").get(getCourseById).put(updateCourse).delete(deleteCourse);
router.route("/:id/curriculum").post(addCurriculum);
router
  .route("/:courseId/curriculum/:curriculumId")
  .patch(updateCurriculum)
  .delete(deleteCurriculum);

  //
  // router.route("/:email").get(getUserOrderedCourses);
  //

module.exports = router;
