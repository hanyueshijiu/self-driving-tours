const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRouter.js');  // 假设路由文件名为userRoutes.js
app.use(cors()).use(bodyParser.json()).use('/api', userRoutes);;

const config = require('./config.js');

app.listen(config.port, () => {
  console.log('Server running on port 3000');
});