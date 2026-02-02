// REST API using Node's http module
const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 8080;
const FILE_PATH = './students.json';

const readFile = () => {
    try{ 
        return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8")); 
    } catch(err){
        console.error("Error reading file:", err); 
        return []; 
    }
}

const writeFile = (data) => {
    try{
        fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
    }catch(err){
        console.error("Error writing file:", err);
        return []; 
    }
}

const sendJson = (res, status, data) => {
    res.writeHead(status, {"Content-Type": "application/json"});
    res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
    console.log(req.url + " " + req.method);
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parsedUrl.pathname;
    if(method === 'GET' && path === '/students'){
        const data = readFile();
        return sendJson(res, 200, data);
    }else if(method === 'POST' && path === '/students'){
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const students = readFile();
            const data = JSON.parse(body);
            if (!data.id || !data.name || !data.department) {
                return sendJson(res, 400, { message: "Missing required fields" });
            }
            if (students.some(s => String(s.id) === String(data.id))) {
                return sendJson(res, 409, { message: "Student with this ID already exists" });
            }                    
            const newStudent = {
                id: data.id,
                name: data.name,
                department: data.department
            };
            students.push(newStudent);
            writeFile(students);
            sendJson(res, 201, {
                message: "New Student added!",
                student: newStudent
            });
        });
        return;
    }else if(method === 'PUT' && path.startsWith("/students/")){
        const id = path.split('/')[2];
        let body = '';
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const students = readFile();
            const data = JSON.parse(body);
            if (!data.id || !data.name || !data.department) {
                return sendJson(res, 400, { message: "Missing required fields" });
            }
            const idx = students.findIndex(student => String(student.id) === id);
            if(idx === -1){
                return sendJson(res, 404, {message: "No student found!"});
            }
            students[idx].name = data.name || students[idx].name;
            students[idx].department = data.department || students[idx].department; 
            writeFile(students);
            sendJson(res, 200, {
                message: "Student Updated Successfully!",
                student: students[idx]
            })
        });
        return;
    }else if(method === "DELETE" && path.startsWith("/students/")){
        const id = path.split('/')[2];
        const students = readFile();
        const filteredStudents = students.filter(student => String(student.id) !== id);
        if(students.length === filteredStudents.length){
            return sendJson(res, 404, {message: "No student found!"});
        }
        writeFile(filteredStudents);
        return sendJson(res, 200, {message: "Student Deleted Successfully!"});
    }else{
        console.log(`Nothing is defined for ${path}`);
        sendJson(res, 404, {message: "No Route Found!"});
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on localhost: ${PORT}`);
});