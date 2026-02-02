// REST API Using Express
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const PORT = 3000;
const FILE_PATH = path.join(__dirname, "students.json");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next();
});

const readFile = async () => {
  try {
    return JSON.parse(await fs.readFile(FILE_PATH, "utf-8"));
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
}

const writeFile = async (data) => {
  try {
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing file:", error);
    return [];
  }
}

app.get("/", (req, res) => {
  res.send("Welcome");
  console.log("Home Page Hit");
});

app.get("/students", async (req, res) => {
  try {
    const data = await readFile();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error reading data.")
  }
});

app.post("/students", async (req, res) => {
  const newStudent = req.body;
  if (!newStudent.id || !newStudent.name || !newStudent.department) {
    return res.status(400).send("Missing required fiels");
  }
  try {
    const students = await readFile();
    if (students.some(s => String(s.id) === String(newStudent.id))) {
      return res.status(409).json({ message: "Student with this ID already exists" });
    }
    students.push(newStudent);
    await writeFile(students);
    res.status(201).json({
      message: "New Student added!",
      student: newStudent
    });
  } catch (error) {
    res.status(500).send("Error writing data.");
  }
});

app.put("/students/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (!data.id || !data.name || !data.department) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const students = await readFile();
    const idx = students.findIndex(student => String(student.id) === String(id));

    if (idx === -1) {
      return res.status(404).json({ message: "No student found!" });
    }

    students[idx].name = data.name || students[idx].name;
    students[idx].department = data.department || students[idx].department;

    await writeFile(students);

    res.status(200).json({
      message: "Student Updated Successfully!",
      student: students[idx]
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Error updating student." });
  }
});

app.delete("/students/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const students = await readFile();
    const filteredStudents = students.filter(student => String(student.id) !== String(id));

    if (students.length === filteredStudents.length) {
      return res.status(404).json({ message: "No student found!" });
    }

    await writeFile(filteredStudents);

    res.status(200).json({ message: "Student Deleted Successfully!" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Error deleting student." });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "No route defined for this endpoint" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});