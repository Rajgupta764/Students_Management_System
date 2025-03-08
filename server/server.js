const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rajgupta12345", // If you set a MySQL password, put it here
  database: "students", // This must match the database name you created
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// Add Student
app.post("/add_user", (req, res) => {
  const sql =
    "INSERT INTO student_details (`name`,`email`,`age`,`gender`) VALUES (?, ?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ message: "Something unexpected has occurred", error: err });
    }
    res.json({ success: "Student added successfully" });
  });
});

// Get All Students
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM student_details";
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ message: "Server error", error: err });
    }
    res.json(result);
  });
});

// Get Single Student by ID
app.get("/get_student/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM student_details WHERE `id`= ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ message: "Server error", error: err });
    }
    res.json(result);
  });
});

// Edit Student
app.post("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE student_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id=?";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ message: "Something unexpected has occurred", error: err });
    }
    res.json({ success: "Student updated successfully" });
  });
});

// Delete Student
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM student_details WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ message: "Something unexpected has occurred", error: err });
    }
    res.json({ success: "Student deleted successfully" });
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
