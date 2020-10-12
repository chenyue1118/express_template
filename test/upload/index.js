const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, './upload/'));    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.fieldname + '-' + Date.now());
    }
});

// dest: path.join(__dirname, './upload/'),
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, './public')));

app.use('/upload', upload.single('logo'), (req, res) => {
  const file = req.file;

  console.log('文件类型：%s', file.mimetype);
  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s', file.size);
  console.log('文件保存路径：%s', file.path);

  res.send({code: 0})
})

app.use('/show', (req, res) => {
  try {
    fs.createReadStream(path.join(__dirname, './upload/5d8c876ea6667f749522171b95944d46')).pipe(res);
  } catch (e) {
    console.log(e);
    res.send({error: e})
  }
})

app.listen(6012, () => {
  console.log('Serve at 6012');
})
