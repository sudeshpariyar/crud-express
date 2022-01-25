const express = require("express");

//const student_Acount = require("../controller/students");

const router = express.Router();
const Student = require("../models/student");

router.get("/", async (req, res) => {
  try {
    const student = await Student.find();
    res.send(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    roll: req.body.roll,
    subjects: req.body.subjects,
  });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", getStudent, (req, res) => {
  res.json(res.student);
});

router.patch("/:id", getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.roll != null) {
    res.student.roll = req.body.roll;
  }
  if (req.body.subjects != null) {
    res.student.subjects = req.body.subjects;
  }
  try {
    const updatestudent = await res.student.save();
    res.json(res.student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", getStudent, async (req, res) => {
  try {
    await res.student.remove();
    res.json({ message: "Deleated student" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getStudent(req, res, next) {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: "Cant find the student" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.student = student;
  next();
}
module.exports = router;
