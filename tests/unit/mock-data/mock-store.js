import { createStore } from "vuex";
import auth from '@/modules/auth/store'
import journalStore from '@/modules/daybook/store/journal'
import { journalState } from "./test-journal-state";

const authStateInitial = {
    status:'autenticating',
    user: null,
    idToken: null,
    refreshToken: null
}

const createAppStore = (authInitState=authStateInitial,journalInitState = journalState) => createStore({
    modules:{
        auth:{
            ...auth,
            state: {...authInitState}
        },
        journal:{
            ...journalStore,
            state:{
                ...journalInitState
            }
        }
    }
})

export default createAppStore