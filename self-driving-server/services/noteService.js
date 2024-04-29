// 包含业务逻辑，与模型层交互
const db = require('../config/dbConfig');

class NoteService {
  // 发布笔记
  static async addNote(title, content, images) {
    // 将笔记的标题和内容保存到数据库
    const insertNoteSql = 'INSERT INTO notes (title, content) VALUES (?, ?)';
    const [noteResult] = await db.execute(insertNoteSql, [title, content]);

    // 获取新添加的笔记的ID
    const noteId = noteResult.insertId;

    // 保存每个图片信息到数据库
    const insertImageSql = 'INSERT INTO images (note_id, filepath) VALUES (?, ?)';
    const imagePromises = images.map(image => db.execute(insertImageSql, [noteId, image]));
    await Promise.all(imagePromises);

    return noteResult.insertId;
  }

  // 获取所有笔记
  static async getAllNotes() {
    const sql = `
      SELECT n.id, n.title, n.content, n.created_at, GROUP_CONCAT(i.filepath) AS images
      FROM notes n
      LEFT JOIN images i ON n.id = i.note_id
      GROUP BY n.id
    `;
    const [result] = await db.execute(sql);
    return result.map(note => ({
      ...note,
      image: note.images ? note.image.split(',') : []
    }));
  }

  // 根据id获取笔记
  static async getNoteById(noteId) {
    const sql = `
      SELECT n.id, n.title, n.content, n.created_at, GROUP_CONCAT(i.filepath) AS images
      FROM notes n
      LEFT JOIN images i ON n.id = i.note_id
      WHERE n.id = ?
      GROUP BY n.id
    `;
    const [results] = await db.execute(sql, noteId);
    if (results.length) {
      const note = results[0];
      return {
        ...note,
        images: note.images ? note.images.split(',') : []
      };
    } else {
      return null;   // 如果没有找到笔记返回null
    }
  }
}

module.exports = NoteService;
