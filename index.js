const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        fs.readFile(path.join(__dirname, 'public', 'index.html'),
         (err,content) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type':'text/html'})
            res.end(content)
        })      
    };
    if(req.url === '/about'){
        fs.readFile(path.join(__dirname, 'public', 'about.html'),
         (err,content) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type':'text/html'})
            res.end(content)
        })      
    };
    if(req.url === '/api/users'){
        const users = [
            {name: 'Bob Smith', age:40},
            {name: 'Bob Bith', age:30}
        ];
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
    }

    //Build File path
    let filepath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    //Extension of file
    let extname = path.extname(filepath);

    //Initial content type
    let contentType = 'text/html';

    //check ext and set content type
    switch(extname){
        case '.js':
        contentType = 'text/javascript';
        break;
        case '.css':
        contentType = 'text/html';
        break;
        case '.json':
        contentType = 'application/json';
        break;
        case '.png':
        contentType = 'image/png';
        break;
        case '.jpg':
        contentType = 'image/jpg';
        break; 
    }

    //Read File
    fs.readFile(filepath, (err, content) => {
        if(err){
            if(err.code == 'ENOENT'){
                //Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf8');
                });
            }else{
                //some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }else{
            //success
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content, 'utf8');
        }
    })
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))