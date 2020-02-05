var express = require("express");
var app = express();
var routes = require("./routes.js");
var router = require("./timelinerouter.js");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
fs = require("fs-extra");

var cors = require("cors");
app.use(cors());
app.use(express.static("Uploads"));

mongoose.connect("mongodb://localhost:27017/ppldb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/route", routes);
app.use("/time", router);

/*
app.post('/process_post', function (req, res) {
const data = req.body;
console.log("data",data)


schema.find({email : data.email}, function(err, result){
   if(result.length > 0){
      schema.find({}, function (err,re) {
         if(re) {
            let a = { result: re, status : "Already Exists"}
            res.send(a);
         }
      });
      //console.log('already Exists');
      //res.send("E-mail already Exists");
   }
   else{
      schema.create(data, function(err,resu){
         if(resu.email == data.email)
         {
            schema.find({}, function (err,re) {
               //console.log("data---",re)
               let a = { result: re, status : "Updated"}
               res.send(a)
            });
            //res.send(data);
            //console.log(data);
         }
         else {
            console.error(err);
         }
      });
   }
});
//console.log(data);
//res.json(data);
});
*/

var server = app.listen(8089, function() {
  var port = server.address().port;

  console.log("Example app listening at ", port);
});
