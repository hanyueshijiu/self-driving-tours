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

// sid获取景区评论
router.post('/getCommentBySid', async(req, res) => {
  try {
    const result = await dbOperations.getCommentBySid(req.body);
    res.status(200).send(result);
  } catch (err) {
    console.error('Database error:', err);
    res.status(401).send('没找到对应评论');
  }
})

// 发布评论
router.post('/publishComment', async(req, res) => {
  try {
    const result = await dbOperations.publishComment(req.body);
    res.status(200).send({ message: '评论成功'});
  } catch (err) {
    console.error('Database error:', err);
    res.status(401).send('服务错误');
  }
})

// 获取店铺信息
router.post('/getStoreInfo', async(req, res) => {
  try {
    const result = await dbOperations.getStoreInfo(req.body);
    res.status(200).send(result);
  } catch (err) {
    console.error('Database error:', err);
    res.status(401).send('服务错误');
  }
})

// 更新店铺信息
router.post('/modifyStoreInfo', async(req, res) => {
  try {
    const result = await dbOperations.modifyStoreInfo(req.body);
    res.status(200).send(result);
  } catch (err) {
    console.error('Database error:', err);
    res.status(401).send('服务错误');
  }
})

// 获取库存信息
router.post('/getSceneryStock', async(req, res) => {
  try {
    const result = await dbOperations.getSceneryStock(req.body);
    res.status(200).send(result);
  } catch (err) {
    console.error('Database error:', err);
    res.status(401).send('服务错误');
  }
})

// 提交景区订单
router.post('/submitSceneryOrder', async(req, res) => {
  try {
    const result = await dbOperations.submitSceneryOrder(req.body);
    res.status(200).send({ message: '购买成功', result});
  } catch (err) {
    console.error('Database error:', err);
    res.status(401).send('服务错误');
  }
})

// 获取用户订单
router.post('/getUserOrder', async(req, res) => {
  try {
    const result = await dbOperations.getUserOrder(req.body);
    res.status(200).send({ message: '获取订单信息成功！', result});
  } catch (err) {
    console.error('Database error:', err);
    res.status(401).send('服务错误');
  }
})

// 取消景区订单
router.post('/cancelSceneryOrder', async(req, res) => {
  try {
    const result = await dbOperations.cancelSceneryOrder(req.body);
    res.status(200).send({ message: '订单取消成功！', result});
  } catch (err) {
    console.error('Database error:', err);
    res.status(401).send('服务错误');
  }
})

module.exports = router;