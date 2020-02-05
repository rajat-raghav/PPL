const router = require("express").Router();
var schema = require("./schema.js");
var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

router.post("/process1_post", urlencodedParser, function(req, res) {
  const data = req.body;
  schema.find({ email: data.email }, function(err, result) {
    if (result.length > 0) {
      schema.find({}, function(err, re) {
        if (re) {
          let a = { result: re, status: "Already Exists" };
          res.send(a);
        }
      });
    } else {
      schema.create(data, function(err, resu) {
        if (resu.email == data.email) {
          schema.find({}, function(err, re) {
            //console.log("data---",re)
            let a = { result: re, status: "Updated" };
            res.send(a);
          });
          //res.json(data);
          //console.log(data);
        } else {
          console.error(err);
        }
      });
    }
  });
});

router.post("/process2_post", urlencodedParser, function(req, res) {
  const data = req.body;
  schema.find({ email: data.email }, function(err, result) {
    console.log("Welcome" + result);

    if (result.length > 0) {
      if (result[0].password == data.password) {
        let a = { result: result, status: "Logged in" };

        res.send(a);
      } else {
        console.log("Incorrect Password");
        let a = { result: result, status: "Incorrect password" };

        res.send(a);
      }
    } else {
      console.log("User not found.. Please sign up");
      let a = { result: result, status: "Invalid E-mail" };

      res.send(a);
    }
  });
});

module.exports = router;
