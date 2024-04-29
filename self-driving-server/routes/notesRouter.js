// 定义路由，映射到控制器的函数
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notesController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

router.post('/uploadNote', noteController.uploadNote);
router.get('/getAll', noteController.getAllNotes);
router.get('/getById/:id', noteController.getNoteById);

module.exports = router;