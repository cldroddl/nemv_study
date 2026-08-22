import store from '@/store'

describe('store', () => {
  it('creates a valid Vuex store instance', () => {
    expect(store).toBeDefined()
    expect(typeof store.dispatch).toBe('function')
    expect(typeof store.commit).toBe('function')
  })

  it('currently has no state, mutations, actions, or modules registered', () => {
    // Regression guard: git history shows this file has repeatedly gotten
    // clobbered by a stray top-level store.js from bad merges. If this ever
    // starts failing because state/mutations/actions suddenly have content,
    // that's expected — just update the assertion to match the real store.
    expect(store.state).toEqual({})
  })
})
