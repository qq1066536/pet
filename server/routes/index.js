var express = require('express');
var router = express.Router();
var multiparty = require("multiparty")
var path = require("path")
//上传文件
router.post('/upload', function (req, res) {
  let form = new multiparty.Form({
    uploadDir: "./public/upload"
  });
  form.parse(req, function (err, fields, files) {
    // console.log("files",files);

    let key = Object.keys(files)[0];
    if (err) {
      res.send(err);
    } else {
      res.send(path.basename(files[key][0].path));
    }
  })
});

module.exports = router;
