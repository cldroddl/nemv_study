const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
  updateAt: { type: Date, default: Date.now },
  id: { type: String, default: '' },  // 작성자
  title: { type: String, default: '제목없음', index: true },
  contents: { type: String, default: '' },
  countOfView: { type: Number, default: 0 },
  countOfLike: { type: Number, default: 0 },
  commentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]  // 댓글. ref 에 Comment 는 문자열로 require 안해줘도 되네
})

module.exports = mongoose.model('Board', boardSchema)