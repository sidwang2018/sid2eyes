const express = require('express')
  , fs = require('fs');
const imgFolder = './ftpdata/';
const app = express();
var favicon = require('serve-favicon');
app.use(favicon('./ftpdata/favicon.ico'))

function Getfname(camid) {
  return new Promise((resolve, reject) => {
    var fulname;
    fs.readdir(imgFolder + camid + '/', (err, files) => {
      if ((typeof files != "undefined") && (files.length > 0)) { fulname = imgFolder + camid + '/' + files[files.length - 1]; }
      else { fulname = imgFolder + '/nopic.jpg'; }
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
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]


const FtpSvr = require('ftp-srv');
const hostname = '0.0.0.0';
const port = 21;
var sdir = 'mypath';


const ftpServer = new FtpSvr({url:'ftp://' + hostname + ':' + port,
   anonymous: false, greeting: ["您好", "歡迎"], pasv_min:3000,pasv_max:4000,pasv_url:"0.0.0.0" });
/* ftpServer.pasv_url = "0.0.0.0";
ftpServer.pasv_min = 3000;
ftpServer.pasv_url = 4000;
 */
console.log(ftpServer.pasv_min);

ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
  console.log('username: ' + username);
  console.log("pasv_min:"+ftpServer.pasv_min);
  //  console.log('resolve: ' + resolve);
  // console.log('reject: ' + reject);
  if (password == "4kZu2018") {
    sdir = './ftpdata/' + username + '/';
    console.log(sdir);
    resolve({ root: sdir });
  }
  else
    reject('pass not Pass');

  console.log(sdir);
});

ftpServer.on('client-error', (connection, context, error) => {
  //  console.log('connection: ');

});

ftpServer.listen()
  .then(() => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

module.exports = app;
