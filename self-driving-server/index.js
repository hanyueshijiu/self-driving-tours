require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port,() => {
  console.log(`项目启动在http:localhost:${port}`);
})