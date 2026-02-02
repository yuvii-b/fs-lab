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
    }else{
        console.log(`Nothing is defined for ${req.url}`);
    }
});

server.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));