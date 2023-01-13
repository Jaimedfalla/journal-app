import { useStore } from 'vuex'
import {ref} from 'vue'

const useRegister = () => {
    const store =useStore()
    const userForm = ref({
        user:'',
        email:'',
        password:''
    })
    
    const createUser = async()=>{
        const response = await store.dispatch('auth/createUser',userForm.value)
        return response
    }

    return {
        userForm,
        createUser,
    }
}

export default useRegister