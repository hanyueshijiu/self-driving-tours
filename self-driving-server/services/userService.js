const db = require('../config/dbConfig');

// 获取个人信息sql
async function getUserInfo(userData) {
  const { phone } = userData;
  const userInfo = await db.query('SELECT * FROM UserInfo WHERE phone = ?',phone);
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
      const updateSql = 'UPDATE UserInfo SET name = ?, nickname = ?, email = ? WHERE phone = ?;';
      const [updateResult] = await db.query(updateSql, [name, nickname, email, phone]);
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
    console.log(user,'user');
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
      'SELECT * FROM scenery WHERE city = ?',
      [city]
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

module.exports = {
  getUserInfo,
  modifyUserInfo,
  login,
  register,
  getSceneryByCity,
  getSceneryBySid
};