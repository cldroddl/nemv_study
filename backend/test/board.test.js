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

const listQuery = '?draw=1&search=&skip=0&limit=10&order=title&sort=1'

async function createBoard(overrides = {}) {
  const body = { id: 'writer', title: 'hello', contents: 'world', ...overrides }
  await request(app).post('/api/board').send(body)
  const list = await request(app).get(`/api/board${listQuery}`)
  return list.body.d.ds.find((b) => b.title === body.title)
}

describe('POST /api/board (add)', () => {
  it('게시물을 생성한다', async () => {
    const res = await request(app).post('/api/board').send({ id: 'writer', title: 't1', contents: 'c1' })
    expect(res.body.success).toBe(true)
  })
})

describe('GET /api/board/:_id (read)', () => {
  it('조회할 때마다 countOfView 가 증가한다', async () => {
    const board = await createBoard({ title: 'view-test' })
    const res1 = await request(app).get(`/api/board/${board._id}`)
    expect(res1.body.d.countOfView).toBe(1)

    const res2 = await request(app).get(`/api/board/${board._id}`)
    expect(res2.body.d.countOfView).toBe(2)
  })
})

describe('PUT /api/board (mod) - mass assignment 방어', () => {
  it('허용된 필드(id, title, contents)는 정상적으로 수정된다', async () => {
    const board = await createBoard({ title: 'before' })
    const res = await request(app).put('/api/board').send({
      _id: board._id,
      id: 'editor',
      title: 'after',
      contents: 'updated'
    })
    expect(res.body.success).toBe(true)

    const detail = await request(app).get(`/api/board/${board._id}`)
    expect(detail.body.d.title).toBe('after')
    expect(detail.body.d.contents).toBe('updated')
  })

  it('countOfView, commentIds 는 mod 요청으로 주입할 수 없다', async () => {
    const board = await createBoard({ title: 'protect-test' })

    const res = await request(app).put('/api/board').send({
      _id: board._id,
      countOfView: 999999,
      commentIds: ['000000000000000000000000']
    })
    expect(res.body.success).toBe(true)

    const detail = await request(app).get(`/api/board/${board._id}`)
    // read 를 한 번 호출했으므로 countOfView 는 1이어야 한다 (999999 로 덮어써지지 않음).
    expect(detail.body.d.countOfView).toBe(1)
    expect(detail.body.d.commentIds).toEqual([])
  })
})

describe('DELETE /api/board (del)', () => {
  it('게시물을 삭제하면 목록에서 사라진다', async () => {
    const board = await createBoard({ title: 'to-delete' })
    const res = await request(app).delete(`/api/board?_id=${board._id}`)
    expect(res.body.success).toBe(true)

    const list = await request(app).get(`/api/board${listQuery}`)
    expect(list.body.d.ds.find((b) => b._id === board._id)).toBeUndefined()
  })
})
