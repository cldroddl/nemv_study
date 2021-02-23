// company controls
const Company = require('../models/companies')

exports.list = (req, res) => {
  // res.send({success: false, msg: 'list is not yet'})
  Company.find()
    .then(result => res.send({success: true, dataSet: result}))
    .catch(err => res.send({success: false, msg: err.message}))
}

exports.add = (req, res) => {
  // res.send({success: false, msg: 'add is not yet'})
  const { name, remark } = req.body;

  if (!name) return res.send({success: false, msg: '이름없음'})
  if (!remark) return res.send({success: false, msg: '비고없음'})

  const company = new Company({name: name, remark: remark})
  company.save()
    .then(r => res.send({success: true, data: r}))
    .catch(err => res.send({success: false, msg: err.message}))
}

exports.mod = (req, res) => {
  // res.send({success: false, msg: 'mod is not yet'})
}

exports.del = (req, res) => {
  res.send({success: false, msg: 'del is not yet'})
}