var express = require('express');
var router = express.Router();

const multiparty = require("multiparty");
const path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//上传文件
router.post('/upload', function (req, res) {
  let form = new multiparty.Form({
    uploadDir: "./public/upload"
  });
  form.parse(req, function (err, fields, files) {
    console.log("files",files);
    let key = Object.keys(files)[0];
    if (err) {
      res.send(err);
    } else {
      res.send(path.basename(files[key][0].path));
    }
  })
});

module.exports = router;
