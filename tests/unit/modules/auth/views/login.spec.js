import { shallowMount } from "@vue/test-utils";
import LoginView from "@/modules/auth/views/LoginView.vue";
import {
    VueRouterMock,
    createRouterMock,
    injectRouterMock,
  } from 'vue-router-mock'
  import { config } from '@vue/test-utils'
import createAppStore from "../../../mock-data/mock-store";
import Swal from "sweetalert2";
  
// create one router per test file
const router = createRouterMock()
beforeEach(() => {
    injectRouterMock(router)
})
  
// Add properties to the wrapper
config.plugins.VueWrapper.install(VueRouterMock)

const store = createAppStore()
const mockLogin = jest.fn()
jest.mock('@/modules/auth/composables/useLogin.js',()=>({ //Con esto, cuando se hace la importación en el archivo que se quiere probar, vue toma esta personalización
    __esModule: true, 
    default: () => ({ 
        userForm:{
            email:'',
            password:''
        },
        login:mockLogin
    })
}))
jest.mock('sweetalert2',()=>({
    fire:jest.fn()
}))

describe('Login view component',()=>{

    let wrapper;
    beforeEach(()=>{
        jest.clearAllMocks()
        wrapper = shallowMount(LoginView,{
            global:{
                plugins:[store]
            }
        })
    })

    it('Match con el snapshot',()=>{
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('Credenciales incorrectas, generan mensaje de sweetAlert',async ()=>{
        mockLogin.mockReturnValueOnce({
            ok:false,message:'PASSWORD_INVALID'
        })
        await wrapper.find('form').trigger('submit')
        expect(mockLogin).toHaveBeenCalled()
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'PASSWORD_INVALID','error')
    })

    it('Credenciales correctas, redirecciona al no-entry',async ()=>{
        mockLogin.mockReturnValueOnce({ok:true})
        const [email,password] = wrapper.findAll('input')
        await email.setValue('carlos@gmail.com')
        await password.setValue('123456')
        await wrapper.find('form').trigger('submit')
        expect(mockLogin).toHaveBeenCalled()
        expect(wrapper.router.push).toHaveBeenCalledWith({name:'no-entry'})
        expect(wrapper.vm.userForm).toEqual({email:'carlos@gmail.com',password:'123456'})
    })
})