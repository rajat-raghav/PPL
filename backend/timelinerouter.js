let router = require("express").Router();
let timelineSchema = require("./timelineSchema");
let categorySchema = require("./categorySchema");
let commentSchema = require("./commentSchema");
let schema = require("./schema");

//let bodyParser = require("body-parser");
//let urlencodedParser = bodyParser.urlencoded({ extended: false });
let multer = require("multer");

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./Uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

let upload = multer({ storage: storage });

router.post("/timeline", upload.single("selectedFiles"), function(req, res) {
  //console.log("File body", req.file);
  schema.find({ _id: req.body.userid }).then(user => {
    const data = {
      selectedFiles: req.file.originalname,
      userId: req.body.userid,
      category: req.body.category,
      username: user[0].username,
      title: req.body.title
    };
    timelineSchema.create(data, function(err, result) {
      if (result) {
        //console.log("post uploaded", result);
        res.send(result);
      } else {
        console.log("error in post upload", err);
      }
    });
  });
});

router.post("/category", function(req, res) {
  //console.log("File body", req.file);
  const data = {
    category: req.body.category_name.toUpperCase()
  };
  categorySchema.find({ category: data.category }, function(err, result) {
    if (result.length > 0) {
      categorySchema.find({}, function(err, re) {
        if (re) {
          let addStatusInResult = {
            result: re,
            status: "Already Exists"
          };
          res.send(addStatusInResult);
        }
      });
    } else {
      categorySchema.create(data, function(err, resu) {
        if (resu) {
          categorySchema.find({}, function(err, re) {
            let addStatusInResult = {
              result: re,
              status: "Category Inserted"
            };
            res.send(addStatusInResult);
          });
        } else {
          let addStatusInResult = {
            result: resu,
            status: "Error"
          };
          res.send(addStatusInResult);
        }
      });
    }
  });
});

// router.post("/allPost", function(req, res) {
//   //console.log("all post", req.body);
//   if (req.body.category === "") {
//     timelineSchema
//       .find({})
//       .sort({ _id: -1 })
//       .skip(req.body.skipcount)
//       .limit(req.body.postsperpage)
//       .then(resul => {
//         if (resul) {
//           //console.log("all post result", resul);
//           let addStatusInResult = {
//             result: resul,
//             status: "Profile Inserted"
//           };
//           res.send(addStatusInResult);
//         }
//       });
//   } else {
//     timelineSchema
//       .find({ category: req.body.category })
//       .sort({ _id: -1 })
//       .skip(req.body.skipcount)
//       .limit(req.body.postsperpage)
//       .then(resul => {
//         if (resul) {
//           //console.log("all post result", resul);
//           let addStatusInResult = {
//             result: resul,
//             status: "Profile Inserted"
//           };
//           res.send(addStatusInResult);
//         }
//       });
//   }
//});

router.post("/allPost", function(req, res) {
  //console.log("all post---", req.body);
  let {
    category = "",
    skipcount = 0,
    postsperpage = 0,
    postsUserID = ""
  } = req.body;
  const tempCheck =
    postsUserID === ""
      ? category === ""
        ? {}
        : { category: category }
      : category === ""
      ? { userId: postsUserID }
      : { userId: postsUserID, category: category };
  timelineSchema
    .find(tempCheck)
    .sort({ _id: -1 })
    .skip(skipcount)
    .limit(postsperpage)
    .then(result => {
      if (result.length > 0) {
        //console.log("all post result", resul);
        // let addStatusInResult = {
        //   result: resul,
        //   status: "Profile Inserted"
        // };
        res.send(result);
      } else {
        res.send(result);
      }
    });
});

/*
router.post("/mostcomment",function(req,res){
  timelineSchema.aggregate([{$project: { count: { $size:"$commentsarr" }}},{$sort:{count:-1}}],
    function(err,result) {
      timelineSchema.find({_id:result[0]},function(err, resu){
        //console.log("most comment",resu)
        if(resu)
    {
      let addStatusInResult = {
        result: resu,
        status: "Most Commented"
      };
      res.send(addStatusInResult);
    }

      })
    })
  })
*/

router.post("/postcount", function(req, res) {
  //const category = req.body.category;
  //console.log("post count-", req.body.category);
  //if (req.body.category === "") {
  const tempCheck =
    req.body.postsUserID === ""
      ? req.body.category === ""
        ? {}
        : { category: req.body.category }
      : req.body.category === ""
      ? { userId: req.body.postsUserID }
      : { userId: req.body.postsUserID, category: req.body.category };
  timelineSchema.countDocuments(tempCheck).then(result => {
    let addStatusInResult = {
      result: result,
      status: "Total Posts"
    };
    res.send(addStatusInResult);
  });
  // } else {
  //   timelineSchema
  //     .countDocuments({ category: req.body.category })
  //     .then(result => {
  //       let addStatusInResult = {
  //         result: result,
  //         status: "Total Posts"
  //       };
  //       res.send(addStatusInResult);
  //     });
  // }
});

router.post("/defaultCat", function(req, res) {
  categorySchema.find({}).then(re => {
    if (re) {
      let addStatusInResult = {
        result: re,
        status: "Already Exists"
      };
      res.send(addStatusInResult);
    } else {
      console.error("Error In Default Category", err);
    }
  });
});

router.post("/singlepost", function(req, res) {
  const id = req.body.id;
  //console.log('id',id)
  timelineSchema.find({ _id: id }, function(err, result) {
    if (result) {
      //console.log('Welcome',result);
      // const a = { result: result};

      res.send(result);
    } else {
      // const a = { result: result};
      res.send(result);
    }
  });
});

router.post("/comment", function(req, res) {
  //console.log("req.body", req.body);
  schema.find({ _id: req.body.userid }).then(user => {
    //console.log("user id---",userid)
    const data = {
      comment: req.body.comment,
      cid: req.body.cid,
      username: user[0].username
    };
    //console.log("-----", data);
    commentSchema.create(data, function(err, result) {
      if (!err) {
        timelineSchema
          .updateOne({ _id: req.body.cid }, { $inc: { commentsCount: 1 } })
          .then(res => {
            //console.log("comments count inc.", res);
          });
        res.send(result);
      }
    });
  });
  //console.log("user id name--", userid);

  /*timelineSchema.updateOne({_id:data.cid},{$push:{commentsarr:data.comment}}, function(err,result) {
              if(result.length>0){
                timelineSchema.find({cid:data.cid},function(err, re) {
                let addStatusInResult = {
                  result: re,
                  status: "Comment"
                };
                res.send(addStatusInResult);
                })
              }
              else {
                let addStatusInResult = {
                  result: result,
                  status: "Error"
                };
                res.send(addStatusInResult);
              }

        });*/
});

router.post("/defaultcomment", function(req, res) {
  const data = req.body;
  //console.log("helllooooo", req.body);
  commentSchema
    .find({ cid: data.id })
    .skip(data.commentsSkipCount)
    .limit(data.commentsLimitCount)
    .sort({ _id: -1 })
    .then(re => {
      //console.log("default comment Result", re);
      if (re) {
        let addStatusInResult = {
          result: re,
          status: "Comment"
        };

        res.send(addStatusInResult);
      } else {
        console.error("Err in default comment", err);
      }
    });
  //console.log("qwerrty",re)
});

router.post("/likepost", function(req, res) {
  const data = req.body;
  //console.log("W", data);

  timelineSchema.find(
    { _id: data.postid, likes: { $in: [data.userid] } },
    function(err, result) {
      //console.log("result", result);

      if (result.length > 0) {
        //console.log("Wpull", data.category);
        timelineSchema.updateOne(
          { _id: data.postid },
          { $pull: { likes: data.userid } },
          function(err, resu) {
            if (!err) {
              //if (data.category === "") {
              timelineSchema
                .find({ _id: data.postid })
                // .sort({ _id: -1 })
                // .limit(data.skipcount)
                .then(resu => {
                  let addStatusInResult = {
                    result: resu,
                    status: "Unlike"
                  };
                  res.send(addStatusInResult);
                });
              //}  else {
              //   timelineSchema
              //     .find({ category: data.category })
              //     .sort({ _id: -1 })
              //     .limit(data.skipcount)
              //     .then(resu => {
              //       let addStatusInResult = {
              //         result: resu,
              //         status: "Unlike"
              //       };
              //       res.send(addStatusInResult);
              //     });
              // }
            } else {
              console.err("pull Error");
            }
          }
        );
      } else {
        //console.log("Wpush", data.category);

        timelineSchema.updateOne(
          { _id: data.postid },
          { $push: { likes: data.userid } },
          function(err, resu) {
            if (!err) {
              //if (data.category === "") {
              timelineSchema
                .find({ _id: data.postid })
                // .sort({ _id: -1 })
                // .limit(data.skipcount)
                .then(resu => {
                  let addStatusInResult = {
                    result: resu,
                    status: "like"
                  };
                  res.send(addStatusInResult);
                });
              //}  else {
              //   timelineSchema
              //     .find({ category: data.category })
              //     .sort({ _id: -1 })
              //     .limit(data.skipcount)
              //     .then(resu => {
              //       let addStatusInResult = {
              //         result: resu,
              //         status: "like"
              //       };
              //       res.send(addStatusInResult);
              //     });
              // }
            } else {
              console.log("push Error");
            }
          }
        );
      }
    }
  );
});

module.exports = router;
