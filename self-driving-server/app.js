const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRouter.js');   // 用户相关路由
const noteRoutes = require('./routes/notesRouter.js'); // 笔记相关路由
const cors = require('cors');

const app = express();

app.use(cors());  // 允许跨域
app.use(bodyParser.json()); // 解析parse
app.use('/api', userRoutes);
app.use('/note', noteRoutes);

module.exports = app;