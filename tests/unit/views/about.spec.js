import AboutView from '@/views/AboutView.vue'
import { shallowMount } from '@vue/test-utils';

describe('About view component',()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper = shallowMount(AboutView)
    })

    it("Should match with snaptshon",()=>{
        expect(wrapper.html()).toMatchSnapshot()
    })
})