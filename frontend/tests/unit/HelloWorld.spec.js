import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('accepts a msg prop without error', () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg: 'Welcome to Your Vue.js App' }
    })
    expect(wrapper.props('msg')).toBe('Welcome to Your Vue.js App')
  })

  it('renders the static heading and nav card links', () => {
    const wrapper = shallowMount(HelloWorld)
    expect(wrapper.find('h1').text()).toBe('Bootstrap starter template')

    const hrefs = wrapper.findAll('a.btn').wrappers.map(a => a.attributes('href'))
    expect(hrefs).toEqual(
      expect.arrayContaining(['/about', '/flex', '/lessmenu', '/flex2', '/nemv'])
    )
  })
})
