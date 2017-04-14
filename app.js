var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//引入 multer
var multer = require('multer');                     //上传文件的包

//设置磁盘存储信息
var distStorage = multer.diskStorage({
  destination: setDirectoryInfo,    //函数，设置目录相关信息
  filename: setFileInfo             //函数，设置文件相关信息
});

//生成上传中间件，以后使用
var upload = multer({ storage: distStorage });


//设定文件存储的位置，程序员需要提前建立好这个文件夹
var DIRECTORY_PATH = '../public/upload_files';

//设置目录相关信息
function setDirectoryInfo(req, file, cb) {
  //回调函数的固定写法
  cb(null, DIRECTORY_PATH);   //错误优先
}

//设置文件相关信息
function setFileInfo(req, file, cb) {
  var fileName = file.fieldname;  // 浏览器上传时候的 input 标签的 name 值
  fileName += '_' + Date.now();   // 保证文件名不会重复，否则就会覆盖

  var originalName = file.originalname;             //用户上传文件的原名
  var extensionName = path.extname(originalName);   //获得扩展名

  fileName += extensionName;      //拼接扩展名
  cb(null, fileName);             //回调函数的固定写法
}




/*

//引入 multer
var multer = require('multer');                     //上传文件的包
var upload = multer({ dest: './public/files' });    //设置目标目录    对象
*/

//处理上传
app.post('/upload', upload.single('avatar'), function (req, res, next) {
  console.log(req.file);
  console.log(req.body);
  res.send('上传成功');
});

//处理 iframe + form 上传方式
app.post('/iframe_file', upload.single('avatar'), function (req, res, next) {
  /*
   req.file :  'avatar' 文件相关信息，例如，原文件、目标文件名、目标存储路径
   req.body :  存储 form 表单中的各个域
   */
  console.log(' iframe_file upload success');
  res.send('<script> console.log("success"); </script>');
});




var array1 = [{ name: 'avatar', maxCount: 1 }, { name: 'photos', maxCount: 3 }];
app.post('/multi_upload', upload.fields(array1), function (req, res, next) {
  /*
   req.files['avatar'][0] : 得到一个对象，包含文件的相关信息
   req.files['photos'] : 得到一个数组，包含文件的相关信息
   req.body :  存储 form 表单中的各个域
   */
  res.send('上传成功');
});





app.post('/url文件路径', upload.single('avatar'), function (req, res, next) {
  /*
   req.file :  'avatar' 文件相关信息，例如，原文件、目标文件名、目标存储路径、大小
   req.body :  存储 form 表单中的各个域
   */
});



//最简单的多文件上传
var array2 = [{ name: 'fileName1', maxCount: 2 }, { name: 'fileName2', maxCount: 1 }];
app.post('/multi_upload_simple', upload.fields(array2), function (req, res, next) {
  /*
   req.files :  'photos' 文件相关信息, 数组类型，例如，原文件、目标文件名、目标存储路径、大小
   req.body :  存储 form 表单中的各个域
   */
  console.log(req.files);
  console.log(req.body);
  res.send('上传成功');
});


//ajax 多文件上传
var array3 = [{ name: 'fileName1', maxCount: 3 }, { name: 'fileName2', maxCount: 3 }, { name: 'fileName3', maxCount: 3 }];
app.post('/multi_upload_ajax', upload.fields(array3), function (req, res, next) {
  /*
   req.files :  'photos' 文件相关信息, 数组类型，例如，原文件、目标文件名、目标存储路径、大小
   req.body :  存储 form 表单中的各个域
   */
  console.log(req.files);
  console.log(req.body);
  res.send('上传成功');
});


//下载文件
app.get('/download', function (req, res, next) {
  // var filePath = path.join(__dirname, 'stars.jpg');
  // res.download(filePath, 'stars.jpg');


  var filePath = path.join(__dirname, 'big_file.wmv');
  res.download(filePath, 'big_file.wmv');

});


//下载图片
app.get('/download_img', function (req, res, next) {
  // var filePath = path.join(__dirname, 'stars.jpg');
  // res.download(filePath, 'stars.jpg');

  var fileName = 'mountain.jpg';

  var filePath = path.join(__dirname, 'public', 'imgs', fileName);
  res.download(filePath, 'big_file.wmv');

});

module.exports = app;











