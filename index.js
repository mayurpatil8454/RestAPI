const express = require('express');
const http = require('http');
const https = require('https');
const xml = require('xml');
const bodyparser  = require('body-parser-json')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var cors = require('cors')
var app = express();

app.use(bodyparser.json({limit: '50mb'}));
app.use(cors())
app.post('/GetLocationDetails', function (req, res) {  
   var response; 
   console.log(req.body);
   var url ='https://nominatim.openstreetmap.org/reverse?format=xml&lat=' + req.body.lat+'&lon='+ req.body.lon +'&zoom=18&addressdetails=1';
   //var url  ='https://nominatim.openstreetmap.org/reverse?format=xml&lat=43.2222&lon=20.111&zoom=18&addressdetails=1%22';
   var xhttp;
      xhttp=new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         response = EditXml(this );
         res.send({response})
      }
   };
  xhttp.open("GET", url, true);
  xhttp.send();

})

EditXml = (xml) => {
   
   var txt ='';
   var xmlDoc = xml.responseText;
   // x = xmlDoc.getElementsByTagName("country");
   // for (i = 0; i< x.length; i++) {
   //   txt += x[i].childNodes[0].nodeValue + "<br>";
   // }
   console.log(xmlDoc);
   var value = xmlDoc.indexOf("<country>")
   var value1 = xmlDoc.indexOf("</country>")
   value = value + 6;
   txt = xmlDoc.slice(value,value1);
   //console.log(txt);
    return txt;

}
app.get('/', function (req, res) {  
  res.send('Welcome to REST service');  
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})