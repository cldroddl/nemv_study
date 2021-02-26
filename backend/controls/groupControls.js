// group controls
const Company = require('../models/companies')
const Group = require('../models/groups')

exports.list = (req, res) => {
  // res.send({success: false, msg: 'list is not yet'})
  let { draw, search, skip, limit, order, sort, company_id } = req.query;

  if(draw === undefined) return res.send({ success: false, msg: 'param err draw' });
  if(search === undefined) return res.send({ success: false, msg: 'param err search' });
  if(skip === undefined) return res.send({ success: false, msg: 'param err skip' });
  if(limit === undefined) return res.send({ success: false, msg: 'param err limit' });
  if(order === undefined) return res.send({ success: false, msg: 'param err order' });
  if(sort === undefined) return res.send({ success: false, msg: 'param err sort' });

  skip = parseInt(skip);
  limit = parseInt(limit);
  sort = parseInt(sort);
  let d = {
    draw: draw,
    cnt: 0,
    ds: [],
  };

  let f = {};
  if (company_id) f.company_id = company_id;

  Group.count(f)
    .where('name').regex(search)
    .then((c) => {
      d.cnt = c;
      const s = {}
      s[order] = sort;
      return Group.find(f)
        .where('name').regex(search)
        .populate('company_id')
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
}

exports.add = (req, res) => {
  // res.send({success: false, msg: 'add is not yet'})
  const { name, company_id } = req.body;
  if (!company_id) return res.send({success: false, msg : 'company_id not exists'});
  if (!name) return res.send({success: false, msg : 'name not exists'});
  const gr = new Group({ name: name, company_id: company_id });
  gr.save()
    .then((r) => {
      const f = { _id: r.company_id };
      // $addToSet 으로 추가된 아이디를 넣는다.
      // $addToSet 은 중복된 것은 넣지 않기 때문에 $push 보다 유용하다.
      const s = { $addToSet: { group_ids: r._id }};
      return Company.updateOne(f, s);
    })
    .then((r) => {
      if(!r.nModified) return res.send({ success: false, msg : 'already group' });
      res.send({ success: true });
    })
    .catch((err) => {
      res.send({success: false, msg : err.message});
    });
}

exports.mod = (req, res) => {
  // res.send({success: false, msg: 'mod is not yet'})
  const set = req.body;
  if (!Object.keys(set).length) return res.send({ success: false, msg: 'body not set' });
  if (!set._id) return res.send({ success: false, msg: 'id not exitst' });
  const f = { _id: set._id };
  const s = { $set: set };
  Group.findOneAndUpdate(f, s)
    .then((r) => {
      res.send({ success: true });
    })
    .catch((err) => {
      if (err) console.error(err);
      res.send({ success: false, msg: err.message });
    });
}

exports.del = (req, res) => {
  // res.send({success: false, msg: 'del is not yet'})
  const _id = req.query._id;
  if (!_id) return res.send({ success: false, msg : 'param id not exists' });
  Group.findOne({_id:_id})
    .then((r) => {
      if (!r) throw new Error('group not exists');
      const f = { _id: r.company_id };
      // $pull로 아이디를 제거한다.
      const s = { $pull: { group_ids: r._id }};
      return Company.updateOne(f, s);
    })
    .then(() => { // { n: 1, nModified: 1, ok: 1 }
      return Group.remove({ _id: _id });
    })
    .then(() => { // { n: 1, ok: 1 }
      res.send({ success: true });
    })
    .catch((err) => {
      res.send({success: false, msg : err.message});
    });
}