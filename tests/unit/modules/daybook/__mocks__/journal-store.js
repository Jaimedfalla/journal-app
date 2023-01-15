import { createStore } from "vuex"
import journal from '@/modules/daybook/store/journal'

export const createVuexStore = (initialState)=> createStore({
    modules:{
        journal:{
            ...journal,
            state:{...initialState}
        }
    }
})