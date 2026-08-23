import router from '@/router'

describe('router', () => {
  const findRoute = path => router.options.routes.find(r => r.path === path)

  it('uses history mode', () => {
    expect(router.mode).toBe('history')
  })

  it('registers the home route at /', () => {
    const route = findRoute('/')
    expect(route).toBeDefined()
    expect(route.name).toBe('Home')
  })

  it('registers named routes with the expected paths', () => {
    const named = {
      About: '/about',
      Flex: '/flex',
      LessMenu: '/lessMenu',
      Flex2: '/flex2',
      FlexGallery: '/flex2/gallery',
      nemv: '/nemv',
      e404: '*'
    }

    Object.entries(named).forEach(([name, path]) => {
      const route = router.options.routes.find(r => r.name === name)
      expect(route).toBeDefined()
      expect(route.path).toBe(path)
    })
  })

  it('registers unnamed nested-looking routes for nemv sub-pages', () => {
    const paths = ['/nemv/exam', '/nemv/board', '/nemv/board/talk', '/nemv/board/qna']
    paths.forEach(path => {
      expect(findRoute(path)).toBeDefined()
    })
  })

  it('falls back to the e404 component on unmatched paths', () => {
    const route = findRoute('*')
    expect(route.name).toBe('e404')
  })
})
