const db = require('../config/dbConfig');

// 获取个人信息sql
async function getUserInfo(userData) {
  const { phone } = userData;
  const userInfo = await db.query('SELECT * FROM userinfo WHERE phone = ?;', [phone]);
  return userInfo;
}

// 修改个人信息sql
async function modifyUserInfo(userData) {
  const { phone, name, nickname, email, sex, birthday, introduction } = userData;
  // 首先检查电话号码是否存在
  const checkSql = 'SELECT phone FROM UserInfo WHERE phone = ?;';
  try {
    const [users] = await db.query(checkSql, [phone]);
    if (users.length > 0) {
      // 电话号码存在，执行更新操作
      const updateSql = 'UPDATE UserInfo SET name = ?, nickname = ?, email = ?, sex = ?, birthday = ?, introduction = ? WHERE phone = ?;';
      const [updateResult] = await db.query(updateSql, [name, nickname, email, sex, birthday, introduction, phone]);
      if (updateResult.affectedRows > 0) {
        return { success: true, message: 'User info updated successfully.' };
      } else {
        return { success: false, message: 'No changes made to the user info.' };
      }
    } else {
      // 电话号码不存在
      return { success: false, message: 'No user found with the given phone number.' };
    }
  } catch (error) {
    console.error('Error in modifying user info:', error);
    return { success: false, message: 'An error occurred while modifying user info.' };
  }
}

// 登录sql
async function login(userData) {
  const { phone, password } = userData;

  // SQL 查询语句，检查电话号码和密码是否匹配
  const sql = 'SELECT phone, password FROM UserInfo WHERE phone = ? AND password = ?;';

  try {
    const [user] = await db.query(sql, [phone, password]);
    if (user.length > 0) {
      // 如果查询结果存在，表示登录成功
      return { success: true, message: 'Login successful.' };
    } else {
      // 如果查询结果为空，表示登录失败
      return { success: false, message: 'Invalid phone number or password.' };
    }
  } catch (error) {
    // 错误处理：数据库查询出错
    console.error('Error during login:', error);
    return { success: false, message: 'An error occurred during login.' };
  }
}

// 注册sql
async function register(userData) {
  const {
    phone,
    name,
    nickname = '',
    sex = '男',
    birthday = null,
    email,
    introduction = '',
    password
  } = userData;

  // 首先检查手机号是否已注册
  const checkSql = 'SELECT phone FROM UserInfo WHERE phone = ?;';
  try {
    const [existingUser] = await db.query(checkSql, [phone]);
    if (existingUser.length > 0) {
      return { error: 'Phone number already registered.' };
    }
  } catch (checkError) {
    console.error('Error checking phone number:', checkError);
    throw checkError;
  }

  // 如果手机号未注册，执行插入操作
  const sql = `
    INSERT INTO UserInfo (
      phone, name, nickname, sex, birthday, email, introduction, password
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    const [result] = await db.query(sql, [phone, name, nickname, sex, birthday, email, introduction, password]);
    return result;
  } catch (insertError) {
    console.error('Error adding user:', insertError);
    throw insertError;
  }
}

// 城市名获取景区
async function getSceneryByCity(userData) {
  const { city } = userData;

  try {
    // 执行查询并获取结果
    const [rows] = await db.query(
      'SELECT * FROM scenery WHERE city like ?',
      [`%${city}%`]
    );

    // 输出结果
    return rows;
  } catch (error) {
    console.error('Failed to retrieve data:', error);
    throw error; // 重新抛出错误，允许调用者处理异常
  }
}

// sid名获取景区
async function getSceneryBySid(userData) {
  const { sid } = userData;

  try {
    // 执行查询并获取结果
    const [rows] = await db.query(
      'SELECT * FROM scenery WHERE sid = ?',
      [sid]
    );

    // 输出结果
    return rows;
  } catch (error) {
    console.error('Failed to retrieve data:', error);
    throw error; // 重新抛出错误，允许调用者处理异常
  }
}

// sid获取景区评论
async function getCommentBySid(userData) {
  const { sid } = userData;

  try {
    // 执行查询并获取结果
    const [rows] = await db.query(
      'SELECT * FROM scenery_comment WHERE sid = ?',
      [sid]
    );

    // 输出结果
    return rows;
  } catch (error) {
    console.error('Failed to retrieve data:', error);
    throw error; // 重新抛出错误，允许调用者处理异常
  }
}

// 发布评论
async function publishComment(commentData) {
  const { user_id, nick_name, sid, comment_content, publish_time } = commentData;
  const sql = `
    INSERT INTO scenery_comment (
      user_id, nick_name, sid, comment_content, publish_time, is_anonymity
    ) VALUES (?, ?, ?, ?, ?, ?);
  `;
  try {
    const [result] = await db.query(sql, [user_id, nick_name, sid, comment_content, publish_time, false]);
    return result;
  } catch (insertError) {
    console.error('Error adding user:', insertError);
    throw insertError;
  }
}

// 获取商铺信息
async function getStoreInfo(userData) {
  const { user_id } = userData;
  const sql = `SELECT * FROM scenery WHERE user_id = ?`;
  try {
    const [result] = await db.query(sql, [user_id]);
    // console.log(result, 'result');
    return result;
  } catch (error) {
    console.error('Failed to retrieve data:', error);
    throw error; // 重新抛出错误，允许调用者处理异常
  }
}

// 修改商铺信息
async function modifyStoreInfo(storeInfo) {
  const { sid, sceneryName, address, special, star, evaluate, openTime, facility, playTime, telephone } = storeInfo;
  try {
    const updateSql = 'UPDATE scenery SET sceneryName = ?, address = ?, special = ?, star = ?, evaluate = ?, openTime = ? , facility = ? , playTime = ? , telephone = ? WHERE sid = ?;';
    const [updateResult] = await db.query(updateSql, [ sceneryName, address, special, star, evaluate, openTime, facility, playTime, telephone,sid]);
    if (updateResult.affectedRows > 0) {
      return { success: true, message: 'storeInfo updated successfully.' };
    } else {
      return { success: false, message: 'No changes made to the storeInfo.' };
    }
  } catch (error) {
    console.error('Failed to retrieve data:', error);
    throw error; // 重新抛出错误，允许调用者处理异常
  }
}

// 获取景区库存
async function getSceneryStock(data) {
  const { sid } = data;
  const sql = `SELECT * FROM scenery_stock WHERE sid = ?`;
  try {
    const [result] = await db.query(sql, [sid]);
    // console.log(result, 'result');
    return result;
  } catch (error) {
    console.error('Failed to retrieve data:', error);
    throw error; // 重新抛出错误，允许调用者处理异常
  }
}

// 提交景区订单
async function submitSceneryOrder(formData) {
  console.log(formData)
  const { user_id, sid, scenery_policy_id, scenery_name, policy_name, unit_price, price_sum, order_status, phone, create_at, num, traveler_name, traveler_id_number } = formData;

  try {

    // 查询景区政策对应的库存
    const stockSql = `SELECT stock FROM scenery_stock WHERE scenery_policy_id = ?`;
    const [stocks] = await db.query(stockSql, [scenery_policy_id]);
    if (stocks.length === 0) {
      throw new Error('No stock found for policy');
    }

    const currentStock = stocks[0].stock;
    if (currentStock < num) {
      throw new Error('Not enough stock');
    }

    // 更新库存
    const newStock = currentStock - num;
    const updateStockSql = `UPDATE scenery_stock SET stock = ? WHERE scenery_policy_id = ?`;
    await db.query(updateStockSql, [newStock, scenery_policy_id]);

    // 插入订单
    const sql = `
      INSERT INTO scenery_order (
        user_id, sid, scenery_name, policy_name, unit_price, price_sum, order_status, phone, create_at, num, traveler_name, traveler_id_number
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const [result] = await db.query(sql, [user_id, sid, scenery_name, policy_name, unit_price, price_sum, order_status, phone, create_at, num, traveler_name, traveler_id_number]);
    console.log(result, 'result');
    return result;
  } catch (error) {
    console.error('Error submit order:', error);
    throw error;
  }
}

// 获取订单信息
async function getUserOrder(data) {
  const { user_id } = data;
  const sql = `SELECT * FROM scenery_order WHERE user_id = ?`;
  try {
    const [result] = await db.query(sql, [user_id]);
    // console.log(result, 'result');
    return result;
  } catch (error) {
    onsole.error('Failed to retrieve data:', error);
    throw error; // 重新抛出错误，允许调用者处理异常
  }
}

// 取消景区订单
async function cancelSceneryOrder(data) {
  const { orderNo } = data;
  const sql = 'UPDATE scenery_order SET order_status = ? WHERE scenery_order_id = ?;';
  try {
    const [result] = await db.query(sql, ['已取消', orderNo]);
    // console.log(result, 'result');
    return result;
  } catch (error) {
    onsole.error('Failed to retrieve data:', error);
    throw error; // 重新抛出错误，允许调用者处理异常
  }
}


module.exports = {
  getUserInfo,
  modifyUserInfo,
  login,
  register,
  getSceneryByCity,
  getSceneryBySid,
  getCommentBySid,
  publishComment,
  getStoreInfo,
  getSceneryStock,
  submitSceneryOrder,
  getUserOrder,
  cancelSceneryOrder,
  modifyStoreInfo
};