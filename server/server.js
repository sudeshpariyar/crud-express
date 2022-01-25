require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = 8080;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
const con = mongoose.connection;
try {
  con.once("open", () => {
    console.log("connected");
  });
} catch (error) {
  console.log(`error: ` + error.message);
}
app.use(express.json());

const studentRouter = require("./routes/students");
app.use("/students", studentRouter);

app.listen(PORT, () => {
  console.log("HEllo app is running");
});
