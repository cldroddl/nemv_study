import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('mounts without crashing and renders the router-view outlet', () => {
    const wrapper = shallowMount(App, {
      stubs: ['router-view']
    })
    expect(wrapper.find('router-view-stub').exists()).toBe(true)
  })
})
