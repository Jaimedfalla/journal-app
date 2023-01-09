import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import * as state from './state';

const myCustomModule = {
    namespaced:true,
    actions,
    getters,
    mutations,
    state
}

export default myCustomModule;