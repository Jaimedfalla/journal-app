import HomeView from '@/views/HomeView.vue'
import { shallowMount } from '@vue/test-utils';

describe('Home view component',()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper = shallowMount(HomeView)
    })

    it('Should mathc with snapshot',()=>{
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('Debe redireccionar a no-entry al hacer click en algún botón',async()=>{
        const mockRouter = {
            push: jest.fn()
        }

        wrapper = shallowMount(HomeView,{
            global:{
                mocks:{
                    $router:mockRouter
                }
            }
        })

        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({name:'no-entry'})
    })
})