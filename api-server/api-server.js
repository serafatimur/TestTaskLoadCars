var fs = require('fs');
var bodyparser = require('body-parser');
var express = require('express');

const filesCount = 5;
var cars;

var server = express();
var port = 3030;

server.listen(port, function () {
    console.log('server listening on port ' + port);
});

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.use(bodyparser.urlencoded({
    extended: false
}));
server.use(bodyparser.json());

for (let i = 1; i <= filesCount; i++) {
    server.get('/cars' + i, function (request, response) {
        try {
            cars = fs.readFileSync('./data/cars-' + i + '.json');
            response.send(cars);
        } catch (err) {
            console.log(err);
            response.send(null);
        }
    });
}

server.get('/cars' + (filesCount + 1), function (request, response) {
    response.send(null);
});