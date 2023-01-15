import { shallowMount } from "@vue/test-utils"
import NavBar from "@/modules/daybook/components/NavBar.vue"
import createAppStore from '../../../mock-data/mock-store'
import { authAutenticatedState } from "../../../mock-data/auth-mock-data"
import {
    VueRouterMock,
    createRouterMock,
    injectRouterMock,
  } from 'vue-router-mock'
  import { config } from '@vue/test-utils'
  
  // create one router per test file
  const router = createRouterMock()
  beforeEach(() => {
    injectRouterMock(router)
  })
  
  // Add properties to the wrapper
  config.plugins.VueWrapper.install(VueRouterMock)
  
describe('Pruebas en el navbar component',()=>{

    const store = createAppStore(authAutenticatedState)

    beforeEach(()=>{
        jest.clearAllMocks()
    })
    
    it('Debe renderizar el componente correctamente',()=>{
        const wrapper = shallowMount(NavBar,{
            global:{
                plugins:[store]
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('Click en logout, debe cerrar sesión y redireccionar',async()=>{
        const wrapper = shallowMount(NavBar,{
            global:{
                plugins:[store]
            }
        })

        await wrapper.find('button').trigger('click')
        expect(wrapper.router.push).toHaveBeenCalledWith({name:'login'})
        expect(store.state.auth).toEqual({
            status:'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null})
    })
})