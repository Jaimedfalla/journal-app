import {ref} from 'vue'
import { useStore } from 'vuex'

const useLogin = () => {
    const store = useStore()
    const userForm = ref({
        email:'',
        password:''
    })

    return {
        userForm,

        login:async()=>{
            const response = await store.dispatch('auth/loginUser',userForm.value)
            return response
        }
    }
}

export default useLogin