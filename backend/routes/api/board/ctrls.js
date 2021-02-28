const Board = require('../../../models/boards')
const Comment = require('../../../models/comments')

exports.list = (req, res) => {
  let { draw, search, skip, limit, order, sort } = req.query;

  if(draw === undefined) return res.send({ success: false, msg: 'param err draw' });
  if(search === undefined) return res.send({ success: false, msg: 'param err search' });
  if(skip === undefined) return res.send({ success: false, msg: 'param err skip' });
  if(limit === undefined) return res.send({ success: false, msg: 'param err limit' });
  if(order === undefined) return res.send({ success: false, msg: 'param err order' });
  if(sort === undefined) return res.send({ success: false, msg: 'param err sort' });

  skip = parseInt(skip);
  limit = parseInt(limit);
  sort = parseInt(sort);

  const d = {
    draw: draw,
    cnt: 0,
    ds: [],
  };

  Board.count()
    .where('title').regex(search)
    .then(c => {
      d.cnt = c
      const s = {}
      s[order] = sort
      return Board.find()
        .where('title').regex(search)
        // 필요한 필드만 불러오기
        .select('updateAt id title countOfView commentIds')
        .sort(s)
        .skip(skip)
        .limit(limit)
    })
    .then(ds => {
      d.ds = ds;
      res.send({success: true, d: d})
    })
    .catch(err => {
      res.send({success: false, msg: err.message})
    })
}

exports.read = (req, res) => {
  const f = { _id: req.params._id }
  const s = { $inc: { countOfView: 1 } }  // 읽으므로 카운트를 증가($inc) 시킨다.
  const o = { new: true }
  Board.findOneAndUpdate(f, s, o)
    // .where('_id').equals(_id)
    // .select('contents')
    .populate('commentIds') // populate 이므로 전체 내용이 나온다.
    .then(d => {
      res.send({ success: true, d: d })
    })
    .catch(err => {
      res.send({ success: false, msg: err.message })
    })
}

exports.add = (req, res) => {
  const { id, title, contents } = req.body
  console.log(req.body)

  if (!id) res.send({ success: false, msg: 'id not exists' })
  if (!contents) res.send({ success: false, msg: 'contents not exists'})

  const bd = new Board({
    id: id,
    title: title,
    contents: contents
  })
  bd.save()
    .then(() => {
      res.send({ success: true })
    })
    .catch(err => {
      res.send({ success: false, msg: err.message })
    })
}

exports.mod = (req, res) => {
  const set = req.body
  if (!Object.keys(set).length) return res.send({ success: false, msg: 'body not set' })
  if (!set._id) return res.send({ success: false, msg: 'id not exists'})
  set.updateAt = new Date()

  const f = { _id: set._id }
  const s = { $set: set }

  Board.findOneAndUpdate(f, s)
    .then(() => {
      res.send({ success: true })
    })
    .catch(err => {
      res.send({ success: false, msg: err.message })
    })
}

exports.del = (req, res) => {
  const { _id } = req.query

  if (!_id) return res.send({ success: false, msg: 'id not exists'})
  // 현재 보드를 찾아서 속해 있는 댓글을 다 지우고 자신(보드)도 삭제한다.
  let cp;
  Board.findOne({ _id: _id })
    .then(r => {
      cp = r
      return Comment.remove({ _id: { $in: r.commentIds }})
    })
    .then(() => {
      return Board.remove({ _id: _id })
    })
    .then(() => { // { n: 1, ok: 1
      res.send({ success: true })
    })
    .catch(err => {
      res.send({ success: false, msg: err.message })
    })
}