const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  roll: {
    type: Number,
    require: true,
  },
  subjects: {
    type: [String],
    require: true,
  },
  registration: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("student-crud", studentSchema);
