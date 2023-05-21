const http = require('http');

//create server object
http.createServer((req, res) => {
    //write response
    res.write('Hello world 5000');
    res.end();
}).listen(5000, () => console.log('Server running...'));