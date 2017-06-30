var express = require('express');
var compression = require('compression');

var app = express();
var port = 7644

app.use(compression());
app.use(express.static('public'));

app.listen(port, function (err) {
  if (err) throw err;

  console.log('Rx toy dev running, browse to http://localhost:' + port);
});
