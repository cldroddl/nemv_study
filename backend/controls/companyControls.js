// company controls
const Company = require('../models/companies')
const Group = require('../models/groups')

exports.list = (req, res) => {
  // res.send({success: false, msg: 'list is not yet'})
  // api 연동 테스트
  // Company.find()
  //   .then(result => res.send({success: true, dataSet: result}))
  //   .catch(err => res.send({success: false, msg: err.message}))
  // 페이징 고려
  // draw: 추후 보안+IE에서 같은 요청 오작동 문제 때문에 추가. 1씩 증가하여 요청
  let { draw, keyword, offset, limit, order, sort } = req.query
  console.log('aaa')

  if (draw === undefined) return res.send({success: false, msg: 'param error draw'})
  if (keyword === undefined) return res.send({success: false, msg: 'param error keyword'})
  if (offset === undefined) return res.send({success: false, msg: 'param error offset'})
  if (limit === undefined) return res.send({success: false, msg: 'param error limit'})
  if (order === undefined) return res.send({success: false, msg: 'param error order'})
  if (sort === undefined) return res.send({success: false, msg: 'param error sort'})

  offset = parseInt(offset)
  limit = parseInt(limit)
  sort = parseInt(sort)

  let result = {
    draw: draw,
    cnt: 0,
    dataSet: [],
  }

  Company.count()
    .where('name').regex(keyword)
    .then(c => {
      result.cnt = c
      const s = {}
      s[order] = sort
      return Company.find()
        // where: queryBuilder 기능. find({검색조건})과 같은 기능
        .where('name').regex(keyword)
        // 소속된 그룹 데이터까지 보낸다.
        // rdbms의 join 처럼 계산 하는 것은 아니고 mongoose가 받아 놓은 데이터를 forEach로 매치 한다고 보면 된다.
        // 그러므로 백엔드 물리 성능을 쓰기 때문에 무분별하게 쓰면 안된다.
        .populate('group_ids')
        .sort(s)
        .skip(offset)
        .limit(limit)
    })
    .then(ds => {
      result.dataSet = ds
      res.send({success: true, result: result})
    })
    .catch(err => {
      res.send({success: false, msg: err.message})
    })
}

exports.add = (req, res) => {
  // res.send({success: false, msg: 'add is not yet'})
  /* api 연동 테스트
  const { name, remark } = req.body;

  if (!name) return res.send({success: false, msg: '이름없음'})
  if (!remark) return res.send({success: false, msg: '비고없음'})

  const company = new Company({name: name, remark: remark})
  company.save()
    .then(r => res.send({success: true, data: r}))
    .catch(err => res.send({success: false, msg: err.message}))
   */
  /* 페이징 고려 */
  const { name } = req.body
  if (!name) res.send({success: false, msg: 'name is not exists'})
  const company = new Company({name: name})
  company.save()
    .then(() => {
      res.send({success: true})
    })
    .catch(err => {
      res.send({success: false, msg: err.message})
    })
}

exports.mod = (req, res) => {
  // res.send({success: false, msg: 'mod is not yet'})
  /* 페이징 고려 */
  const set = req.body
  if (!Object.keys(set).length) return res.send({success: false, msg: 'body not set'})
  if (!set._id) return res.send({success: false, msg: 'id not set'})
  set.update_at = new Date()

  const f = { _id: set._id }
  const s = { $set: set }
  // 데이터 업데이트 후 그 데이터 넘겨주는 것은 playGround 참조
  // 3번째 인자 options 으로 { new: true } 넘겨주면 된다.
  Company.findOneAndUpdate(f, s)
    .then(() => {
      res.send({success: true})
    })
    .catch(err => {
      res.send({success: false, msg: err.message})
    })
}

exports.del = (req, res) => {
  // res.send({success: false, msg: 'del is not yet'})
  /* 페이징 고려 */
  const { id } = req.query
  if (!id) return res.send({success: false, msg: 'id not exist'})
  let company
  Company.findOne({_id: id})
    .then(r => {
      company = r;
      // 예제라서 그룹 지우는 듯
      return Group.remove({_id: {$in: r.group_ids}})
    })
    .then(() => {
      return Company.remove({_id: id})
    })
    .then(() => { // {n:1, ok: 1}
      res.send({success: true})
    })
    .catch(err => {
      res.send({success: false, msg: err.message})
    })
}