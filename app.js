// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
var express = require('express');
var app = express();
var sys = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;

//register body-parser to handle json from res / req
app.use( bodyParser.json() );

//register public dir to serve static files (html, css, js)
app.use( express.static( path.join(__dirname, "public") ) );

// END DO NOT CHANGE!


/**************************************************************************
****************************** csv2json *********************************
**************************************************************************/
var csv = require("csvtojson");
var jsonArray = [];

csv()
  .fromFile("world_data.csv")
  .on("end_parsed",function(jsonArrayObj){ //when parse finished, result will be emitted here.
     jsonArray = jsonArrayObj;
     // console.log(jsonArray);

   })
/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/

// GET
app.get('/items', function (req, res) {
         res.header("Access-Control-Allow-Origin", "*");
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         res.send(jsonArray);
})

app.get('/items/:id', function (req, res) {
         res.header("Access-Control-Allow-Origin", "*");
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         var response = jsonArray[req.params.id-1];
         res.send(response);
})

// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});