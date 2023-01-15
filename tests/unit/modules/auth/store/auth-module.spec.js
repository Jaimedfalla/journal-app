import createAppStore from '../../../mock-data/mock-store'
import {userAuthenticated,authAutenticatedState} from '../../../mock-data/auth-mock-data'
import authApi from '@/api/authApi';

describe('Pruebas en el store de auth module',()=>{
    
    let store;

    beforeEach(()=>{
        jest.clearAllMocks()
        store = createAppStore()
        localStorage.clear()
    })

    it('Estado inicial',()=>{        
        const {status,user,idToken,refreshToken} = store.state.auth
        expect(status).toBe('autenticating')
        expect(user).toBeNull()
        expect(idToken).toBeNull()
        expect(refreshToken).toBeNull()
    })

    it('Mutation: loginUser',()=>{
        const payload=
        {
            user:userAuthenticated,
            idToken: "63c2d062c7357a8c1db636b8",
            refreshToken: "63c2d0627be35e1af826f9a9"
        }
        store.commit('auth/loginUser',payload)
        const {status,user,idToken,refreshToken} = store.state.auth
        expect(status).toBe('authenticated')
        expect(user).toEqual({
            name: "Vicky Arnold",
            email: "vickyarnold@myopium.com"
        })
        expect(idToken).toBe('63c2d062c7357a8c1db636b8')
        expect(refreshToken).toBe('63c2d0627be35e1af826f9a9')
    })

    it('Mutation: logOut',()=>{
        const store = createAppStore(authAutenticatedState)
        localStorage.setItem('idToken','aaaaa')
        localStorage.setItem('refreshToken','bbbbb')

        store.commit('auth/logOut')
        const {status,user,idToken,refreshToken} = store.state.auth
        expect(status).toBe('not-authenticated')
        expect(user).toBeNull()
        expect(idToken).toBeNull()
        expect(refreshToken).toBeNull()
        expect(localStorage.getItem('idToken')).toBeFalsy()
        expect(localStorage.getItem('refreshToken')).toBeFalsy()
    })

    it('Getters: currentState y username',()=>{
        const store = createAppStore(authAutenticatedState)
        expect(store.getters['auth/currentState']).toBe('authenticated')
        expect(store.getters['auth/username']).toBe('Vicky Arnold')
    })

    it('Actions: create user - user created',async ()=>{
        const newUser = {
            ...userAuthenticated,
            password:'123456'
        }
        const spyPost = jest.spyOn(authApi, 'post').mockReturnValue({
            data:{
                idToken:'c0duYRVb0k8SM7BsKvpRwPvHAN48L3i4',
                refreshToken:'kU~=9.U>Op#"{_,i*UlJgic[D%{QIC'
            }
        })
        const {ok} = await store.dispatch('auth/createUser',newUser)
        const {status,user} = store.state.auth
        expect(spyPost).toHaveBeenCalledTimes(2)
        expect(localStorage.getItem('idToken')).toBe('c0duYRVb0k8SM7BsKvpRwPvHAN48L3i4')
        expect(localStorage.getItem('refreshToken')).toBe('kU~=9.U>Op#"{_,i*UlJgic[D%{QIC')
        expect(user).toEqual(userAuthenticated)
        expect(status).toBe('authenticated')
        expect(ok).toBeTruthy()
    })

    it('Actions: create user - Error user already exists',async ()=>{
        const newUser = {
            ...userAuthenticated,
            password:'123456'
        }
        const spyPost = jest.spyOn(authApi, 'post')
        .mockImplementation(() => Promise.reject({
            response:{
                data:{
                  error: {
                   code: 400,
                   message: "EMAIL_EXISTS",
                   errors: [
                      {
                      message: "EMAIL_EXISTS",
                      domain: "global",
                      reason: "invalid"
                      }
                   ]
                  }
                }
            }
          }))
        const {ok,message} = await store.dispatch('auth/createUser',newUser)
        const {status,user,idToken,refreshToken} = store.state.auth
        expect(status).toBe('autenticating')
        expect(user).toBeNull()
        expect(idToken).toBeNull()
        expect(refreshToken).toBeNull()
        expect(spyPost).toHaveBeenCalledTimes(1)
        expect(ok).toBeFalsy()
        expect(message).toBe('EMAIL_EXISTS')
    })

    it('Action: checkAuthentication no existe token',async ()=>{
        const {ok, message }= await store.dispatch('auth/checkAuthentication')
        const {status,user,idToken,refreshToken} = store.state.auth
        expect(ok).toBeFalsy()
        expect(status).toBe('not-authenticated')
        expect(user).toBeNull()
        expect(idToken).toBeNull()
        expect(refreshToken).toBeNull()
        expect(message).toBe('No hay token')
    })

    it('Action: checkAuthentication success',async()=>{
        localStorage.setItem('idToken','adkadfladjfla')
        localStorage.setItem('refreshToken','adkjahaaaaaa')
        const spyPost = jest.spyOn(authApi,'post').mockResolvedValue(
            {
                data:{
                    users:[
                        {
                            displayName:'Vicky Arnold',
                            email:'vickyarnold@myopium.com'
                        }
                    ]
                }
            }
        )
        const resp = await store.dispatch('auth/checkAuthentication')
        const {status,user,idToken,refreshToken} = store.state.auth
        expect(spyPost).toHaveBeenCalledTimes(1)
        expect(resp).toEqual({ok:true})
        expect(status).toBe('authenticated')
        expect(user).toEqual({
            name:'Vicky Arnold',
            email:'vickyarnold@myopium.com'
        })
        expect(idToken).toBe('adkadfladjfla')
        expect(refreshToken).toBe('adkjahaaaaaa')
    })

    it('Action: checkAuthentication fails',async()=>{
        localStorage.setItem('idToken','adkadfladjfla')
        localStorage.setItem('refreshToken','adkjahaaaaaa')
        const spyPost = jest.spyOn(authApi,'post')
            .mockImplementation(() => Promise.reject({
                response:{
                    data:{
                        error: {
                            code: 400,
                            message: "INVALID_ID_TOKEN",
                            errors: [
                                {
                                message: "INVALID_ID_TOKEN",
                                domain: "global",
                                reason: "invalid"
                                }
                            ]
                        }
                    }
                }
            }))

        const resp = await store.dispatch('auth/checkAuthentication')
        const {status,user,idToken,refreshToken} = store.state.auth
        expect(spyPost).toHaveBeenCalledTimes(1)
        expect(resp).toEqual({ok:false,message:'INVALID_ID_TOKEN'})
        expect(status).toBe('not-authenticated')
        expect(user).toBeNull()
        expect(idToken).toBeNull()
        expect(refreshToken).toBeNull()
    })
})