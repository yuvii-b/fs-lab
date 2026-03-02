import express from 'express';
import cors from 'cors';

const PORT = 3000;

const students = [];
let studentId = 1;

const app = express();
app.use(express.json());
app.use(cors());

const validateStudent = (req, res, next) => {
    const {name, rollNo, dept} = req.body;
    if(!name || name.trim().length < 2){
        return res.status(400).json({error: "Name must be atleast 3 characters"});
    }
    if(!rollNo || rollNo.toString().trim().length < 5){
        return res.status(400).json({error: "RollNo must be atleast 5 numbers"});
    }
    if(!dept || dept.trim().length < 2){
        return res.status(400).json({error: "Dept must be atleast 2 characters"});
    }
    next();
}

app.get("/", (req, res) => {
    res.status(200).send("WELCOME");
    console.log("/ endpoint");
});

// READ
app.get("/students", (req, res) => {
    res.status(200).json({
        count: students.length,
        data: students
    });
});

// CREATE
app.post("/students", validateStudent, (req, res) => {
    const newStudent = {
        id: studentId++,
        ...req.body
    };
    students.push(newStudent);
    res.status(201).json({
        message: "Student Added",
        data: newStudent
    });
});

//UPDATE
app.put("/students/:id", validateStudent, (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if(!student){
        return res.status(404).json({error: `Student with id ${id} not found`});
    }
    student.name = req.body.name || student.name;
    student.rollNo = req.body.rollNo || student.rollNo;
    student.dept = req.body.dept || student.dept;
    res.status(200).json({
        message: "Student Updated",
        data: student
    });
});

// DELETE
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = students.findIndex(student => student.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Student not found" });
    }
    const deletedStudent = students.splice(index, 1)[0];
    res.status(200).json({
        message: "Student Deleted",
        data: deletedStudent
    });
});

app.use((req, res) => {
    res.status(404).json({message: `No route defined for this endpoint ${req.url}`});
});

app.listen(PORT, () => console.log(`Server listening on PORT http://localhost:${PORT}`));