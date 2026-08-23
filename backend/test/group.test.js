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

const groupListQuery = '?draw=1&search=&skip=0&limit=10&order=name&sort=1'
const companyListQuery = '?draw=1&keyword=&offset=0&limit=10&order=name&sort=1'

async function createCompany(name) {
  await request(app).post('/api/companies').send({ name })
  const res = await request(app).get(`/api/companies${companyListQuery}`)
  return res.body.result.dataSet.find((c) => c.name === name)
}

async function createGroup(name, companyId) {
  await request(app).post('/api/groups').send({ name, company_id: companyId })
  const res = await request(app).get(`/api/groups${groupListQuery}`)
  return res.body.d.ds.find((g) => g.name === name)
}

describe('POST /api/groups (add)', () => {
  it('회사에 속한 그룹을 생성한다', async () => {
    const company = await createCompany('acme')
    const res = await request(app).post('/api/groups').send({ name: 'dev-team', company_id: company._id })
    expect(res.body.success).toBe(true)
  })
})

describe('PUT /api/groups (mod) - mass assignment 방어', () => {
  it('허용된 필드(name)는 정상적으로 수정된다', async () => {
    const company = await createCompany('acme')
    const group = await createGroup('before', company._id)

    const res = await request(app).put('/api/groups').send({ _id: group._id, name: 'after' })
    expect(res.body.success).toBe(true)

    const list = await request(app).get(`/api/groups${groupListQuery}`)
    const updated = list.body.d.ds.find((g) => g._id === group._id)
    expect(updated.name).toBe('after')
  })

  it('company_id 는 mod 요청으로 주입할 수 없다', async () => {
    const companyA = await createCompany('company-a')
    const companyB = await createCompany('company-b')
    const group = await createGroup('team', companyA._id)

    const res = await request(app).put('/api/groups').send({ _id: group._id, company_id: companyB._id })
    expect(res.body.success).toBe(true)

    const list = await request(app).get(`/api/groups${groupListQuery}`)
    const updated = list.body.d.ds.find((g) => g._id === group._id)
    // company_id 는 list 에서 populate 되므로 회사 객체로 내려온다.
    expect(updated.company_id._id).toBe(companyA._id)
  })
})
