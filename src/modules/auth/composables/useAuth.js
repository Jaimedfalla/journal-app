import { computed } from 'vue'
import { useStore } from 'vuex'

const useAuth = () => {
    const store = useStore()

    return {
        authStatus:computed(()=> store.getters['auth/currentState']),
        username:computed(()=> store.getters['auth/username']),
        
        checkAuthStatus:async()=> await store.dispatch('auth/checkAuthentication'),
        logout: ()=> {
            store.commit('auth/logOut')
            store.commit('journal/clearEntries')
        }
    }
}

export default useAuth