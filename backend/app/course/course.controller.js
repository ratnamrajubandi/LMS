const courseService = require("./course.service");

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json({ data: courses, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const course = await courseService.createCourse(req.body);
    res.json({ data: course, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    res.json({ data: course, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body);
    res.json({ data: course, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await courseService.deleteCourse(req.params.id);
    res.json({ data: course, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addCurriculum = async (req, res) => {
  try {
    const course = await courseService.addCurriculum(
      req.params.id,
      req.body.topicName,
      req.body.topicNotes
    );
    res.json({ course, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCurriculum = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const curriculumId = req.params.curriculumId;
    const result = await courseService.updateCurriculum(
      courseId,
      req.body.topicName,
      req.body.topicNotes,
      curriculumId
    );

    res.json({ result, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCurriculum = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const curriculumId = req.params.curriculumId;
    const result = await courseService.deleteCurriculum(courseId, curriculumId);
    res.json({ result, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
