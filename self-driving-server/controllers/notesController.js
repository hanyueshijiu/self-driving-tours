// 处理请求，调用服务层代码
const upload = require('../middleware/uploadMiddleware');
const NoteService = require('../services/noteService');

// 上传笔记
exports.uploadNote = (req, res) => {
  upload.array('images')(req, res, async(err) => {
    if(err) return res.status(500).json({ message: '攻略上传失败！', error: err.message});

    const {title, content} = req.body;
    const imagePaths = req.files.map(file => file.path);

    try {
      const noteId = await NoteService.addNote(title, content, imagePaths);
      res.status(200).json({ message: '攻略上传成功', noteId: noteId });
    } catch (error) {
      res.status(500).json({ message: '数据库操作失败！', error: error.message});
    }
  })
}

// 根据id查找笔记
exports.getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await NoteService.getNoteById(id);
    if(note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: '攻略未找到！' });
    }
  } catch (error) {
    res.status(500).json({ message: '攻略未找到！', error: error.message });
  }
}

// 获取所有笔记
exports.getAllNotes = async(req, res) => {
  try {
    const notes = await NoteService.getAllNotes();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: '未找到攻略', error: error.message });
  }
}