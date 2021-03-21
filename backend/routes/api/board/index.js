const router = require('express').Router();

const talk = require('./talk');
const qna = require('./qna');
router.use('/talk', talk);
router.use('/qna', qna);

const ctrl = require('./ctrls')
// 게시물들 리스트
router.get('/', ctrl.list)
// 특정 게시물 가져오기
router.get('/:_id', ctrl.read);
// 게시물 등록
router.post('/', ctrl.add);
// 게시물 수정
router.put('/', ctrl.mod);
// 게시물 삭제
router.delete('/', ctrl.del)

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `unknown uri ${req.path}` })
})

module.exports = router