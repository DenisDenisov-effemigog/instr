import * as types from '../../mutation-types'

const state = {
    view_mode: 'gridview',
    favorites: [],
    compares: [],
};

const mutations = {
    [types.LISTING_APPLY_VIEW_MODE](state, newMode) {
        state.view_mode = newMode;
    },
    [types.LISTING_APPLY_FAVORITE](state, newMode) {
        state.favorites = newMode;
    },
    [types.LISTING_APPLY_COMPARE](state, newMode) {
        state.compares = newMode;
    }
};

const actions = {
    listingSetViewMode({commit}, newMode) {
        commit(types.LISTING_APPLY_VIEW_MODE, newMode);
    },

    favoritesProducts: ({commit, dispatch}, id) => {
        //debugger;
        let favorites = [];
        id.getFavorite((favorite) => {
            favorites.push({
                product_id: favorite.product_id,
                is_favorite: favorite.is_favorite,
            });
        });

        commit(types.LISTING_APPLY_FAVORITE, favorites);
    },

    comparingProducts: ({commit, dispatch}, id) => {
        //debugger;
        let compares = [];
        id.getCompare((compare) => {
            compares.push({
                product_id: compare.product_id,
                is_compare: compare.is_compare,
            });
        });

        commit(types.LISTING_APPLY_COMPARE, compares);
    },
}

export default {
    state,
    mutations,
    actions,
};