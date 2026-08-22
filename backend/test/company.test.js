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

const listQuery = '?draw=1&keyword=&offset=0&limit=10&order=name&sort=1'

describe('POST /api/companies (add)', () => {
  it('회사를 생성한다', async () => {
    const res = await request(app).post('/api/companies').send({ name: 'acme' })
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
  })

  it('name 없이 요청하면 실패 응답을 보낸다', async () => {
    const res = await request(app).post('/api/companies').send({})
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ success: false, msg: 'name is not exists' })
  })
})

describe('GET /api/companies (list)', () => {
  it('빈 목록을 반환한다', async () => {
    const res = await request(app).get(`/api/companies${listQuery}`)
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.result.cnt).toBe(0)
    expect(res.body.result.dataSet).toEqual([])
  })

  it('생성한 회사를 목록에서 조회한다', async () => {
    await request(app).post('/api/companies').send({ name: 'acme' })
    const res = await request(app).get(`/api/companies${listQuery}`)
    expect(res.body.result.cnt).toBe(1)
    expect(res.body.result.dataSet[0].name).toBe('acme')
  })
})

describe('PUT /api/companies (mod) - mass assignment 방어', () => {
  async function createCompany(name) {
    await request(app).post('/api/companies').send({ name })
    const res = await request(app).get(`/api/companies${listQuery}`)
    return res.body.result.dataSet.find((c) => c.name === name)
  }

  it('허용된 필드(name, remark, pos)는 정상적으로 수정된다', async () => {
    const company = await createCompany('before')
    const res = await request(app).put('/api/companies').send({
      _id: company._id,
      name: 'after',
      remark: '변경됨',
      pos: { lat: 1, lng: 2 }
    })
    expect(res.body.success).toBe(true)

    const list = await request(app).get(`/api/companies${listQuery}`)
    const updated = list.body.result.dataSet.find((c) => c._id === company._id)
    expect(updated.name).toBe('after')
    expect(updated.remark).toBe('변경됨')
    expect(updated.pos).toEqual({ lat: 1, lng: 2 })
  })

  it('group_ids 는 mod 요청으로 주입할 수 없다', async () => {
    const company = await createCompany('acme')
    expect(company.group_ids).toEqual([])

    const res = await request(app).put('/api/companies').send({
      _id: company._id,
      group_ids: ['000000000000000000000000']
    })
    expect(res.body.success).toBe(true)

    const list = await request(app).get(`/api/companies${listQuery}`)
    const updated = list.body.result.dataSet.find((c) => c._id === company._id)
    expect(updated.group_ids).toEqual([])
  })

  it('_id 없이 요청하면 실패한다', async () => {
    const res = await request(app).put('/api/companies').send({ name: 'no-id' })
    expect(res.body).toEqual({ success: false, msg: 'id not set' })
  })
})

describe('DELETE /api/companies (del)', () => {
  it('회사를 삭제하면 목록에서 사라진다', async () => {
    await request(app).post('/api/companies').send({ name: 'to-delete' })
    const list = await request(app).get(`/api/companies${listQuery}`)
    const company = list.body.result.dataSet[0]

    const res = await request(app).delete(`/api/companies?id=${company._id}`)
    expect(res.body.success).toBe(true)

    const after = await request(app).get(`/api/companies${listQuery}`)
    expect(after.body.result.cnt).toBe(0)
  })
})
