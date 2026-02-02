const http = require('http');
const { XMLParser, XMLBuilder, XMLValidator } = require('fast-xml-parser');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if(req.url === '/xml' && req.method === 'GET'){
        const xmlData = fs.readFileSync("library.xml", "utf-8");
        res.writeHead(200, {'Content-Type': 'application/xml'});
        res.end(xmlData);
    }else if(req.url === '/add-xml' && req.method === 'GET'){
        fs.readFile('input.html', 'utf-8', (err, data) => {
            if(err){
                console.log(err.message);
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
    else if(req.url === '/add-xml' && req.method === 'POST'){
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const parsed = new URLSearchParams(body);
            const xmlToAdd = parsed.get("xmlText");
            if(XMLValidator.validate(xmlToAdd) !== true){
                res.writeHead(400, { "Content-Type": "text/plain" });
                res.end("Invalid XML");
                return;
            }
            let existingXML = fs.readFileSync("library.xml", "utf-8");
            if (existingXML.trim().endsWith("</library>")) { 
                existingXML = existingXML.trim().slice(0, -("</library>".length)); 
            }
            const updatedXML = existingXML + "\n" + xmlToAdd + "\n</library>";
            fs.writeFileSync("library.xml", updatedXML);
            res.writeHead(301, { "Location": "/xml" });
            res.end();
        });
    }else{
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>Page Not Found</h1>');
    }
});

server.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));
