import * as types from '../../mutation-types'

const state = {
    view_mode: 'gridview'
};

const mutations = {
    [types.LISTING_APPLY_VIEW_MODE](state, newMode) {
        state.view_mode = newMode;
    }
};

const actions = {
    listingSetViewMode({commit}, newMode) {
        commit(types.LISTING_APPLY_VIEW_MODE, newMode);
    }
}

export default {
    state,
    mutations,
    actions,
};