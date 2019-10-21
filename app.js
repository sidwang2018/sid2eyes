const express = require('express')
  , fs = require('fs');
const imgFolder = '/bigeyeftp/';
const app = express();
var favicon = require('serve-favicon');
app.use(favicon('./favicon.ico'))

function Getfname(camid) {
  return new Promise((resolve, reject) => {
    var fulname;
    var idx;
    fs.readdir(imgFolder + camid + '/', (err, files) => {

      if ((typeof files != "undefined") && (files.length > 0)) { 
        idx = Math.max(files.length - 2,0);
        console.log(idx);
        fulname = imgFolder + camid + '/' + files[idx]; }
      else { fulname =  './nopic.jpg'; }
      console.log("I am " + fulname);
      resolve({ camid: camid, fname: fulname });
    });
  });
}
function Showimg(fname, res) {
  fs.readFile(fname, function (err, imgdata) {
    if (err) {
      //throw err; // Fail if the file can't be read.
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end('歡迎光臨，請使用APP或linebot登入！！！！！'); // Send the file data to the browser.
    }
    else {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(imgdata); // Send the file data to the browser.
    }

  });
}
app.get('/:camid', (req, res) => {
  var camid = req.params.camid;
  const p = new Getfname(camid);
  p.then(data => Showimg(data.fname, res));
  /*   res.write('Hello World');
    res.end(); */
});
app.get('/', (req, res) => {
     res.write('Hello World please enter cameraid');
    res.end(); });
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(process.env.PORT);
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]
module.exports = app;
