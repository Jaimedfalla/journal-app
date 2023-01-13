import state from './state'
import * as actions from './actions'
import * as mutations from './mutations'

const authModule = {
    namespaced:true,
    state,
    mutations,
    actions
}

export default authModule