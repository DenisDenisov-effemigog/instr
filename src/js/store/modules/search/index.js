import * as types from '../../mutation-types'
import * as Api from '../../../api';

let api = Api.getInstance();

const state = {
    history: [],
};

const mutations = {
    [types.SEARCH_GET_HISTORY] (state, data) {
        state.history = data;
    }
};

const actions = {
    searchGetHistory({commit}) {
        api.searchGetHistory().then((history) => {
            commit(types.SEARCH_GET_HISTORY, history);
        });
    },

    searchClearHistory: ({commit}) => {
        api.searchClearHistory().then(() => {
            commit(types.SEARCH_GET_HISTORY, []);
        });
    },
};

export default {
    state,
    mutations,
    actions
};