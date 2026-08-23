import { shallowMount } from '@vue/test-utils'
import e404 from '@/views/e404.vue'

describe('e404.vue', () => {
  it('renders the not-found message', () => {
    const wrapper = shallowMount(e404)
    expect(wrapper.text()).toContain('그런 페이지 없어요')
  })
})
