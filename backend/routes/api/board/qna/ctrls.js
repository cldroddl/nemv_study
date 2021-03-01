// model 재활용
const mongoose = require('mongoose')
const Board = require('../../../../models/boards')
const Comment = require('../../../../models/comments')

// schema 를 이런 식으로 재활용
const boardSchema = Board.schema.obj
const commentSchema = Comment.schema.obj

// 참조될 필드만 재정의 해 주고 나머지는 재사용 해서 다양한 collection 을 만들어 낼 수 있다.
// comment 관련 api 는 관리 차원에서 각 talks.ctrls, qna.ctrls 에 병합해 버렸다.
boardSchema.commentIds = [{ type: mongoose.Schema.Types.ObjectId, ref: 'QnAComment' }]
commentSchema.boardId = { type: mongoose.Schema.Types.ObjectId, ref: 'QnA', index: true, required: true }

const QnA = mongoose.model('QnA', boardSchema)
const QnAComment = mongoose.model('QnAComment', commentSchema)

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

  QnA.count()
    .where('title').regex(search)
    .then((c) => {
      d.cnt = c;
      const s = {}
      s[order] = sort;
      return QnA.find()
        .where('title').regex(search)
        .select('updateAt id title countOfView commentIds')
        .sort(s)
        .skip(skip)
        .limit(limit);
    })
    .then((ds) => {
      d.ds = ds;
      res.send({success: true, d: d});
    })
    .catch((err) => {
      res.send({success: false, msg : err.message});
    });
};

exports.read = (req, res) => {
  const f = { _id: req.params._id };
  const s = { $inc: { countOfView: 1 } };
  const o = { new: true };
  QnA.findOneAndUpdate(f, s, o)
    // .where('_id').equals(_id)
    // .select('contents')
    .populate('commentIds')
    .then((d) => {
      res.send({success: true, d: d});
    })
    .catch((err) => {
      res.send({success: false, msg : err.message});
    });
};

exports.add = (req, res) => {
  const { id, title, contents } = req.body;

  if (!id) res.send({success: false, msg : 'id not exists'});
  if (!contents) res.send({success: false, msg : 'contents not exists'});

  const bd = new QnA({
    id: id,
    title: title,
    contents: contents,
    ip: req.ip,
  });
  bd.save()
    .then(() => {
      res.send({success: true});
    })
    .catch((err) => {
      res.send({success: false, msg : err.message});
    });
};

exports.mod = (req, res) => {
  const set = req.body;

  if (!Object.keys(set).length) return res.send({ success: false, msg: 'body not set' });
  if (!set._id) return res.send({ success: false, msg: 'id not exists' });
  set.updateAt = new Date();
  set.ip = req.ip;

  const f = { _id: set._id };
  const s = { $set: set };

  QnA.findOneAndUpdate(f, s)
    .then(() => {
      res.send({ success: true });
    })
    .catch((err) => {
      res.send({ success: false, msg: err.message });
    });
};

exports.del = (req, res) => {
  const { _id } = req.query;

  if (!_id) return res.send({ success: false, msg: 'id not exists' });
  let cp;
  QnA.findOne({ _id: _id })
    .then((r) => {
      cp = r;
      return QnAComment.remove({ _id: { $in: r.commentIds } });
    })
    .then(() => {
      return QnA.remove({ _id: _id });
    })
    .then(() => { // { n: 1, ok: 1 }
      res.send({ success: true });
    })
    .catch((err) => {
      res.send({ success: false, msg: err.message });
    });
};

exports.addCmt = (req, res) => {
  const { boardId, id,  contents } = req.body;

  if (!id) res.send({ success: false, msg : 'id not exists' });
  if (!contents) res.send({ success: false, msg : 'contents not exists' });

  const cmt = new QnAComment({
    boardId: boardId,
    id: id,
    contents: contents,
    ip: req.ip,
  });
  let cr;
  cmt.save()
    .then((r) => {
      cr = r;
      const f = { _id: r.boardId };
      const s = { $addToSet: { commentIds: r._id } };
      return QnA.updateOne(f, s);
    })
    .then((r) => {
      if (!r.nModified) return res.send({ success: false, msg : 'already QnA' });
      res.send({ success: true, d: cr });
    })
    .catch((err) => {
      res.send({ success: false, msg : err.message });
    });
};

exports.modCmt = (req, res) => {
  const set = req.body;

  if (!Object.keys(set).length) return res.send({ success: false, msg: 'body not set' });
  if (!set._id) return res.send({ success: false, msg: 'id not exists' });
  set.updateAt = new Date();
  set.ip = req.ip;

  const f = { _id: set._id };
  const s = { $set: set };
  const o = { new: true };

  QnAComment.findOneAndUpdate(f, s, o)
    .then((d) => {
      res.send({ success: true, d: d });
    })
    .catch((err) => {
      res.send({ success: false, msg: err.message });
    });
};

exports.delCmt = (req, res) => {
  const _id = req.query._id;
  if (!_id) return res.send({ success: false, msg : 'param id not exists' });
  QnAComment.findOne({_id:_id})
    .then((r) => {
      if (!r) throw new Error('group not exists');
      const f = { _id: r.boardId };
      const s = { $pull: { commentIds: r._id } };
      return QnA.updateOne(f, s);
    })
    .then(() => { // { n: 1, nModified: 1, ok: 1 }
      return QnAComment.remove({ _id: _id });
    })
    .then(() => { // { n: 1, ok: 1 }
      res.send({ success: true });
    })
    .catch((err) => {
      res.send({ success: false, msg : err.message });
    });
}