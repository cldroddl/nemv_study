const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
  name: {type: String, index: true},
  update_at: {type: Date, default: Date.now()},
  company_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true}, // 지정된 회사가 꼭 필요
  remark: {type: String, default: ''}, // 설명. '' 를 기본값으로 했지만 null도 가능하다. 근데 체크 로직이 들어가야겠지??
})

module.exports = mongoose.model('Group', groupSchema);