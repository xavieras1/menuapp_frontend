const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const history = require('connect-history-api-fallback');

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(history({
    disableDotRule: true,
    verbose: true
}));

app.get(/.*/, function (req, res) {
    res.render(path.join(__dirname + 'dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);



/* const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);

app.get('/', function (req, res) {
  res.render(path.join(__dirname + '/dist/index.html'));
});

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});*/