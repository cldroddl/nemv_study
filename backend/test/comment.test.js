const request = require('supertest')
const { startTestApp, stopTestApp, clearCollections } = require('./helpers/testApp')

let app

beforeAll(async () => {
  app = await startTestApp()
})

afterEach(async () => {
  await clearCollections()
})

afterAll(async () => {
  await stopTestApp()
})

const boardListQuery = '?draw=1&search=&skip=0&limit=10&order=title&sort=1'

async function createBoard(title) {
  await request(app).post('/api/board').send({ id: 'writer', title, contents: 'c' })
  const list = await request(app).get(`/api/board${boardListQuery}`)
  return list.body.d.ds.find((b) => b.title === title)
}

// comment/ctrls.js#list 는 아직 구현되지 않았으므로(항상 success:false 스텁),
// 생성한 댓글의 _id 를 얻기 위해 board read(populate commentIds)를 사용한다.
async function getCommentsOfBoard(boardId) {
  const res = await request(app).get(`/api/board/${boardId}`)
  return res.body.d.commentIds
}

describe('POST /api/comment (add)', () => {
  it('게시물에 댓글을 추가한다', async () => {
    const board = await createBoard('board-for-comment')
    const res = await request(app).post('/api/comment').send({ boardId: board._id, id: 'writer', contents: 'first' })
    expect(res.body.success).toBe(true)

    const comments = await getCommentsOfBoard(board._id)
    expect(comments).toHaveLength(1)
    expect(comments[0].contents).toBe('first')
  })
})

describe('PUT /api/comment (mod) - mass assignment 방어', () => {
  it('허용된 필드(id, contents)는 정상적으로 수정된다', async () => {
    const board = await createBoard('board-a')
    await request(app).post('/api/comment').send({ boardId: board._id, id: 'writer', contents: 'before' })
    const [comment] = await getCommentsOfBoard(board._id)

    const res = await request(app).put('/api/comment').send({ _id: comment._id, id: 'editor', contents: 'after' })
    expect(res.body.success).toBe(true)

    const [updated] = await getCommentsOfBoard(board._id)
    expect(updated.contents).toBe('after')
    expect(updated.id).toBe('editor')
  })

  it('boardId 는 mod 요청으로 주입할 수 없다', async () => {
    const Comment = require('../models/comments')
    const boardA = await createBoard('board-a')
    const boardB = await createBoard('board-b')
    await request(app).post('/api/comment').send({ boardId: boardA._id, id: 'writer', contents: 'stay-here' })
    const [comment] = await getCommentsOfBoard(boardA._id)

    const res = await request(app).put('/api/comment').send({ _id: comment._id, boardId: boardB._id })
    expect(res.body.success).toBe(true)

    // 댓글 문서 자체의 boardId 필드가 바뀌지 않았어야 한다.
    const stored = await Comment.findById(comment._id)
    expect(String(stored.boardId)).toBe(boardA._id)

    // board.commentIds 관계도 여전히 board-a 에만 연결되어 있어야 한다.
    const commentsOfA = await getCommentsOfBoard(boardA._id)
    const commentsOfB = await getCommentsOfBoard(boardB._id)
    expect(commentsOfA).toHaveLength(1)
    expect(commentsOfB).toHaveLength(0)
  })
})

describe('DELETE /api/comment (del)', () => {
  it('댓글을 삭제하면 board.commentIds 에서도 제거된다', async () => {
    const board = await createBoard('board-del')
    await request(app).post('/api/comment').send({ boardId: board._id, id: 'writer', contents: 'to-delete' })
    const [comment] = await getCommentsOfBoard(board._id)

    const res = await request(app).delete(`/api/comment?_id=${comment._id}`)
    expect(res.body.success).toBe(true)

    const comments = await getCommentsOfBoard(board._id)
    expect(comments).toHaveLength(0)
  })
})
