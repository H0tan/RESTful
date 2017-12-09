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
                         // Schleige verlassen
                         break;
                 }
                 // ID in Array mit übergebener ID vergleichen
                 if (parseInt(jsonArray[i]["id"]) == req.params.id)
                 {
                         // ID gefunden --> Antwort senden
                         var response = jsonArray[i];
                         res.send(response);
                         // Schleige verlassen
                         break;
                 }

         }
})

app.get('/items/:id1/:id2', function (req, res) {
         // Zum Testen -- Cross Origin Policy umgehen
         res.header("Access-Control-Allow-Origin", "*");
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         var responseArray = [];
         // Iteration über Array
         for (var i=0; i<jsonArray.length; i++)
         {
                 // Abfangen der Grenzen
                 if (req.params.id1 <= 0 && req.params.id2 <= jsonArray.length)
                 {
                         // Fehler
                         res.send("Range not possible");
                         break;
                 }
                 // Vergleich IDs
                 if (parseInt(jsonArray[i]["id"]) == req.params.id1)
                 {
                         // wenn ID1 gefunden, dann Objekt in neues Array pushen
                         var item = jsonArray[i];
                         responseArray.push(item);
                         i++;
                         // Abruch (Range beachten)
                         if (i >= jsonArray.length)
                         {
                                 res.send("Range not possible");
                                 break;
                         }
                         // bis ID2 Objekte auf Antwortarray pushen
                         while (parseInt(jsonArray[i]["id"]) != req.params.id2)
                         {
                                 // Range..
                                 if (i >= jsonArray.length)
                                 {
                                         res.send("Range not possible");
                                         break;
                                 }
                                 item = jsonArray[i];
                                 responseArray.push(item);
                                 i++;
                         }
                         // letztes Objekt mit ID2 pushen
                         item = jsonArray[i];
                         responseArray.push(item);
                         i++;
                         // Antwort senden
                         res.send(responseArray);
                 }
         }
})

app.get('/properties', function (req, res) {
         res.header("Access-Control-Allow-Origin", "*");
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         // Properties aus Array holen
         var object = jsonArray[0];
         var properties = [];
         // einzelne Keys in Array pushen
         for (var key in object)
         {
                 properties.push(key);
         }
         // Antwort senden
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
         // Einschränkungen fpür num beachten und bei True geforderte property zurückgeben
         if (req.params.num > 0 && req.params.num < 15)
                 res.send(properties[req.params.num-1]);
         else
                 res.send("No such property.");
})

// POST
app.post('/items', function (req, res) {
         // neues Objekt
         var obj = req.body;
         // IDs fprtführend vergeben
         obj.id = (jsonArray.length+1).toString();
         // erstelltes Objekt in Array pushen
         jsonArray.push(obj);
         for (var key in obj)
         {
                 // name suchen udn zurückgeben
                 if (key == "name")
                         res.send("Added country {" +req.body[key]+ "} to list!");
         }

})

// DELETE
app.delete('/items', function (req, res) {
         // löschen letztes Objekt
         var deleted = jsonArray.pop();
         res.header("Access-Control-Allow-Origin", "*");
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         res.send("Deleted last country: {" +deleted["name"]+ "}");
})

app.delete('/items/:id', function (req, res) {
         for (var i=0; i<=jsonArray.length; i++)
         {
                 // ID nicht gefunden --> Fehler
                 if (i == jsonArray.length)
                 {
                         res.send("No such id {" +req.params.id+ "} in databse");
                         break;
                 }
                 if (parseInt(jsonArray[i]["id"]) == req.params.id)
                 {
                         // ID gefunden --> löschen
                         jsonArray.splice(i, 1);
                         res.send("Item {" +req.params.id+ "} deleted successfully");
                         break;
                 }

         }
})

// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});