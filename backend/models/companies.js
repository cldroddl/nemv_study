const mongoose = require('mongoose')

/*
 * mongodb 는 Document 의 형식에 제한이 없지만
 * 이렇게 Schema 로 형식을 지정하되 모두 저장될 필요가 없는 항목들은
 * default 로 값을 정해 주면 값의 null 체크 로직등을
 * 불필요하게 작성할 필요가 없다.
 */
const companySchema = new mongoose.Schema({
  name: {type: String, index: true},  // 이름
  update_at: {type: Date, default: Date.now}, // 변경 날짜: timestamp
  pos: {  // 위치 lat, lng로 해야 구글에서 바로 쓰기 좋다
    lat: {type: Number, default: 37.1},
    lng: {type: Number, default: 127.1}
  },
  type: {type: Number, default: 0}, // 추후 용도
  remark: {type: String, default: '신규'}, // 설명
  group_ids: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],  // 포함될 그룹들
})

module.exports = mongoose.model('Company', companySchema)