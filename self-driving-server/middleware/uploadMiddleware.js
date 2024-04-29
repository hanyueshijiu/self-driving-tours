const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '..', 'uploads'); // 确保路径正确

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 设置存储配置
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 文件保存路径
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // 文件命名规则
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

// 文件上传限制
const limits = {
    fileSize: 1024 * 1024 * 5 // 限制文件大小不超过5MB
};

// 文件过滤逻辑
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

const upload = multer({ storage, limits, fileFilter });

module.exports = upload;
