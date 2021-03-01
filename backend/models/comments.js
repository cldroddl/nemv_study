const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
  updateAt: { type: Date, default: Date.now },
  id: { type: String, default: '' },
  ip: { type: Date, default: '' },
  contents: { type: String, default: '' },
  countOfLike: { type: Number, default: 0 }
})

module.exports = mongoose.model('Comment', commentSchema)