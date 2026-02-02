const http = require('http');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url + " " + req.method);
    if(req.url === '/' && req.method === 'GET'){
        fs.readFile("index.html", (err, data) => {
            if(err){
                console.log(err.message);
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        })        
    }
    else if(req.url === '/style.css' && req.method === 'GET'){
        fs.readFile("style.css", (err, data) => {
            if(err){
                console.log(err.message);
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(data);
        })
    }
    else if(req.url === '/script.js' && req.method === 'GET'){
        fs.readFile("script.js", (err, data) => {
            if(err){
                console.log(err.message);
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.end(data);
        })
    }
    else if(req.url === '/library.xml' && req.method === 'GET'){
        fs.readFile("library.xml", (err, data) => {
            if(err){
                console.log(err.message);
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/xml'});
            res.end(data);
        })
    }
    else{
        console.log(`Nothing is defined for ${req.url}`);
        res.end();
    }
});

server.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));