const express = require('express');
const router = express.Router();
const dbOperations = require('../services/userService');

// 登录
router.post('/login', async (req, res) => {
  try {
    await dbOperations.login(req.body);
    const info = await dbOperations.getUserInfo(req.body);
    if(info.length > 0) {
      res.status(200).send({
        data: {
          message: '登录成功！',
          userInfo: info
        }
      });
    } else {
      res.status(401).send('手机号或密码错误');
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(401).send('手机号或密码错误');
  }
});

// 注册
router.post('/register', async (req, res) => {
  try {
    const result = await dbOperations.register(req.body);
    res.status(200).send(`注册成功！`);
  } catch (err) {
    console.error('Database error:', err);
    res.status(401).send('手机号已注册');
  }
});

// 获取用户信息
router.post('/getUserInfo',async (req,res) => {
  try {
    const result = await dbOperations.getUserInfo(req.body);
    res.status(200).send(result);
  } catch (err) {
    console.error('Database error:', err);
    res.status(401).send('未知错误');
  }
});

// 修改用户信息 
router.post('/modifyInfo',async (req,res) => {
  try {
    const result = await dbOperations.modifyUserInfo(req.body);
    res.status(200).send(`个人信息修改成功 `);
  } catch (err) {
    console.error('Database error:', err);
    res.status(401).send('未知错误');
  }
});

// 城市名获取景区
router.post('/getSceneryByCity', async (req, res) => {
  try {
    const result = await dbOperations.getSceneryByCity(req.body);
    res.status(200).send(result);
  } catch (err) {
    console.error('Database error:', err);
    res.status(401).send('没找到对应景区');
  }
})

// sid获取景区
router.post('/getSceneryBySid', async (req, res) => {
  try {
    const result = await dbOperations.getSceneryBySid(req.body);
    res.status(200).send(result);
  } catch (err) {
    console.error('Database error:', err);
    res.status(401).send('没找到对应景区');
  }
})

module.exports = router;