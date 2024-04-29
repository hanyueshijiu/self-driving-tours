// multer配置和文件上传逻辑
const multer = require('multer');

// 设置文件存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 使用原始文件名和当前时间戳创建唯一文件名
    cb(null,`${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;