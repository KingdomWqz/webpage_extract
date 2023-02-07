var express = require("express");
var fs = require("fs");

var ali = require("./ali");
var client = require("./dist/table");

var app = express();
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

app.get("/screenshot/save", function (req, res) {
  //接收前台POST过来的base64
  var imgData = req.body.img;

  //过滤data:URL
  //   var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  //   var dataBuffer = new Buffer(base64Data, "base64");
  //   fs.writeFile("image.png", dataBuffer, function (err) {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //         // ali.saveToTempOSS("image.png");
  //         res.send("保存成功！");
  //     }
  //   });

  console.log(client);
  client.tableOcr();
  res.send("screenshot /save");
});

app.listen(3000);
