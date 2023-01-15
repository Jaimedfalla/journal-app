import useAuth from '@/modules/auth/composables/useAuth'
import useLogin from '@/modules/auth/composables/useLogin'
import useRegister from '@/modules/auth/composables/useRegister'
import {userAuthenticated} from '../../../mock-data/auth-mock-data'

const mockStore = {
    dispatch:jest.fn(),
    commit:jest.fn(),
    getters:{//Así se mockean los getters de composition api
        'auth/currentState':'authenticated',
        'auth/username':'ddddd'
    }
}

jest.mock('vuex',()=>({ //Con esto, cuando se hace la importación en el archivo que se quiere probar, vue toma esta personalización
    useStore:()=> mockStore
}))

beforeEach(()=>{
    jest.clearAllMocks()
})

describe('Pruebas en useRegister',()=>{

    it('Create User exitoso',async ()=>{
        const {userForm,createUser}=useRegister()
        userForm.value = {
            ...userAuthenticated,
            password:'123456'
        }
        
        mockStore.dispatch.mockReturnValue({
            ok:true
        })
        const resp = await createUser()
        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser',
            {'email': 'vickyarnold@myopium.com', 'name': 'Vicky Arnold', 'password': '123456'}
        )
        expect(resp).toEqual({ok:true})
    })

    it('Create User fallido',async ()=>{
        const {userForm,createUser}=useRegister()
        userForm.value = {
            ...userAuthenticated,
            password:'123456'
        }
        
        mockStore.dispatch.mockReturnValue({
            ok:false,message:'EMAIL_EXISTS'
        })
        const resp = await createUser()
        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser',userForm.value
        )
        expect(resp).toEqual({ok:false,message:'EMAIL_EXISTS'})
    })
})

describe('Pruebas de useLogin',()=>{
    
    it('Login exitoso',async()=>{
        const {userForm,login} = useLogin()
        userForm.value = {
            email:'vickyarnold@myopium.com',
            password:'123456'
        }

        mockStore.dispatch.mockReturnValue({
            ok:true
        })
        const resp = await login()
        expect(resp).toEqual({ok:true})
        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/loginUser',userForm.value)
    })

    it('Login fallido correo inválido',async()=>{
        const {userForm,login} = useLogin()
        userForm.value = {
            email:'vickyarnold@myopium.com',
            password:'123456'
        }

        mockStore.dispatch.mockReturnValue({
            ok:false,message:'EMAIL_NOT_FOUND'
        })
        let resp = await login()
        expect(resp).toEqual({ok:false,message:'EMAIL_NOT_FOUND'})
        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/loginUser',userForm.value)
    })

    it('Prueba login fallido password inválido',async()=>{
        const {userForm,login} = useLogin()
        userForm.value = {
            email:'vickyarnold@myopium.com',
            password:'123456'
        }

        mockStore.dispatch.mockReturnValue({
            ok:false,message:'INVALID_PASSWORD'
        })
        const resp = await login()
        expect(resp).toEqual({ok:false,message:'INVALID_PASSWORD'})
        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/loginUser',userForm.value)
    })
})

describe('Pruebas de useAuth',()=>{

    it('CheckStatus success',async()=>{
        const {checkAuthStatus}=useAuth()
        mockStore.dispatch.mockReturnValue({ok:true})
        const resp = await checkAuthStatus()
        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/checkAuthentication')
        expect(resp).toEqual({ok:true})
    })

    it('LogOut success',()=>{
        const {logout}=useAuth()
        logout()
        expect(mockStore.commit).toHaveBeenCalledWith('auth/logOut')
        expect(mockStore.commit).toHaveBeenCalledWith('journal/clearEntries')
    })

    it('Computed: authStatus y username',()=>{
        const {authStatus,username} = useAuth()

        expect(authStatus.value).toBe('authenticated')
        expect(username.value).toBe('ddddd')
    })
})