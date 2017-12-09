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
         // Zum Testen -- Cross Origin Policy umgehen
         res.header("Access-Control-Allow-Origin", "*");
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         // Sende komplettes Array an Client
         res.send(jsonArray);
})

app.get('/items/:id', function (req, res) {
         // Zum Testen -- Cross Origin Policy umgehen
         res.header("Access-Control-Allow-Origin", "*");
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         // Iteration über gesamtes Array
         for (var i=0; i<=jsonArray.length; i++)
         {
                 // ID nicht gefunden --> Fehler
                 if (i == jsonArray.length)
                 {
                         res.send("No such id {" +req.params.id+ "} in databse");
                         break;
                 }
                 // ID in Array mit übergebener ID vergleichen
                 if (parseInt(jsonArray[i]["id"]) == req.params.id)
                 {
                         // ID gefunden --> Antwort senden
                         var response = jsonArray[i];
                         res.send(response);
                         break;
                 }

         }
})

app.get('/items/:id1/:id2', function (req, res) {
         // Zum Testen -- Cross Origin Policy umgehen
         //res.header("Access-Control-Allow-Origin", "*");
         //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         var responseArray = [];
         for (var i=0; i<jsonArray.length; i++)
         {
                 if (req.params.id1 <= 0 && req.params.id2 <= jsonArray.length)
                 {
                         res.send("Range not possible");
                         break;
                 }
                 if (parseInt(jsonArray[i]["id"]) == req.params.id1)
                 {
                         var item = jsonArray[i];
                         responseArray.push(item);
                         i++;
                         if (i >= jsonArray.length)
                         {
                                 res.send("Range not possible");
                                 break;
                         }

                         while (parseInt(jsonArray[i]["id"]) != req.params.id2)
                         {
                                 if (i >= jsonArray.length)
                                 {
                                         res.send("Range not possible");
                                         break;
                                 }
                                 item = jsonArray[i];
                                 responseArray.push(item);
                                 i++;
                         }
                         item = jsonArray[i];
                         responseArray.push(item);
                         i++;
                         res.send(responseArray);
                 }
         }
})

app.get('/properties', function (req, res) {
         res.header("Access-Control-Allow-Origin", "*");
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         var object = jsonArray[0];
         var properties = [];
         for (var key in object)
         {
                 properties.push(key);
         }
         res.send(properties);
})

app.get('/properties/:num', function (req, res) {
         res.header("Access-Control-Allow-Origin", "*");
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         var object = jsonArray[0];
         var properties = [];
         for (var key in object)
         {
                 properties.push(key);
         }
         if (req.params.num > 0 && req.params.num < 15)
                 res.send(properties[req.params.num-1]);
         else
                 res.send("No such property.");
})

// POST
app.post('/items', function (req, res) {
         jsonArray.push(req.body);
         for (var key in req.body)
         {
                 if (key == "name")
                         res.send("Added country {" +req.body[key]+ "} to list!");
         }

})

// DELETE
app.delete('/items', function (req, res) {
         var deleted = jsonArray.pop();
         res.header("Access-Control-Allow-Origin", "*");
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         res.send("Deleted last country: {" +deleted["name"]+ "}");
})

app.delete('/items/:id', function (req, res) {
         var deleted = jsonArray.pop();
         res.send("Deleted last country: {" +deleted["name"]+ "}");
})

// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});