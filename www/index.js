//server that either gives a file or returns html with the app.js file
let fs = require('fs');
let http = require('http');

// for live reload use: nodemon index.js
http.createServer(function (req, res) {

    console.log(req.url)

    fs.readFile(__dirname + req.url, (error, data) => {
        if(error) {
            res.write(
                `<!DOCTYPE html>
<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
<meta content="utf-8" http-equiv="encoding">
<script type="module" src="/app.js"></script>
`);
            res.end();
        } else {
            fs.stat
            res.writeHead(200, { 'Content-Type': 'application/javascript' }); //todo setup to handle additional file types
            res.write(data.toString());
            res.end();
        }
    });

}).listen(3000, function(){
    console.log("server started");
});