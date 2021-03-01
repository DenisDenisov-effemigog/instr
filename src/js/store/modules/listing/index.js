import * as types from '../../mutation-types'
import * as Api from '../../../api';

let api = Api.getInstance();

const state = {
    view_mode: 'gridview',
    favorites: [],
    comparisons: []
};

const mutations = {
    [types.LISTING_APPLY_VIEW_MODE](state, newMode) {
        state.view_mode = newMode;
    },
    [types.LISTING_APPLY_FAVORITES](state, data) {
        state.favorites = data;
    },
    [types.LISTING_APPLY_COMPARE](state, data) {
        state.comparisons = data;
    },
};

const actions = {
    listingSetViewMode({commit}, newMode) {
        commit(types.LISTING_APPLY_VIEW_MODE, newMode);
    },
    favoritesApplyResponseProducts: ({commit, dispatch}, data) => {
        commit(types.LISTING_APPLY_FAVORITES, data);
    },

    favoritesUpdateProducts: ({dispatch}) => {
        //debugger;
        return new Promise((resolve, reject) => {
            api.getFavorites().then(
                (data) => {
                    //debugger;
                    dispatch('favoritesApplyResponseProducts', data);
                    resolve();
                },
                () => reject()
            );
        });
    },

    favoritesChange: ({commit, dispatch, state}, params) => {
        //debugger;
        let productId = params.productId;

        return new Promise((resolve, reject) => {
            //debugger;
            api.addFavorite(productId).then(
                (data) => {
                    //debugger;
                    dispatch('favoritesUpdateProducts', data);
                    resolve();
                },
                () => reject()
            );
        });
    },

    favoritesClearAll: ({commit, state}) => {
        api.clearFavorites().then(() => {
            commit(types.LISTING_APPLY_FAVORITES, []);
        });
    },

    comparisonsApplyResponseProducts: ({commit}) => {
        api.getCompare().then((data) => {
            commit(types.LISTING_APPLY_COMPARE, data)
        });
    },
}

export default {
    state,
    mutations,
    actions,
};