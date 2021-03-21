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
  group_ids: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],  // 포함될 그룹들, 이런식으로 배열형식을 정의하면 기본으로 빈 배열로 값이 들어간다.
})

// 파일명이 companies 로 복수형인 것은
// mongoole 는 자동으로 컬렉션을 만들때 복수로 만드는데 단순히 뒤에 s 가 붙는 경우가 아닌
// 사전적인 의미가 있는 단어는 mongoose 가 굳이 컬렉션 이름을 사전적 복수명으로 변경한다.
// 그러므로 groups, tables, rows 등은 s 만 붙지만,
// person -> people, company -> companies 가 되니 mongoose 로만 읽고 쓸때는 상관 없으나
// native-mongo driver 로 처리할 때 기겁할 수 있으니 주의...
// model 명을 Company 로 했지만 Collection 명은 companies 가 된다.
module.exports = mongoose.model('Company', companySchema)