var http = require('http');
var fs = require('fs');

var staticPage = './index.html';
var staticPageContentType = 'text/html';
var failPage = './notfound.html';
var failPageContentType = 'text/html';

var port = process.env.PORT || 3000;

var server = http.createServer(function(req, res) {

  var path = '.' + req.url;
  if (path == './') {
    path = staticPage;
  }

  fs.readFile(path, function(err, file) {
    if (err) {
      if (err.code == 'ENOENT') {
        fs.readFile(failPage, function(err, file) {
          res.writeHead(404, {'Content-Type': failPageContentType});
          res.end(file);
        });
      } else {
        res.writeHead(500);
        res.end('An internal error occurred. Error: ' + err.code);
      }
    } else {
      res.writeHead(200, {'Content-Type': staticPageContentType});
      res.end(file);
    };
  })
});

server.listen(port, function() {
  console.log('server is listening on port ' + port);
});
