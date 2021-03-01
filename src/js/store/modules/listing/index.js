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
        //debugger;
        // let products = [];
        // data.forEach((product) => {
        //     products.push({
        //         id: product.id,
        //         name: product.name,
        //         url: product.url,
        //         sku: product.sku,
        //         images: product.images,
        //         price: product.price,
        //         discount: product.discount,
        //         allPrice: product.allPrice,
        //         totalPrice: product.totalPrice,
        //         available: product.available,
        //         stock: product.stock,
        //         basket_quantity: product.basket_quantity,
        //         tooltips: product.tooltips,
        //         basket_extra_quantity: product.basket_extra_quantity,
        //
        //         basket_confirmed: true
        //     });
        // });

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

    comparisonsApplyResponseProducts: ({commit, dispatch}, data) => {
        commit(types.LISTING_APPLY_COMPARE, data)
    },

    comparisonsUpdateProducts: ({dispatch}) => {
        return new Promise((resolve, reject) => {
            api.getCompare().then(
                (data) => {
                    dispatch('comparisonsApplyResponseProducts', data);
                    resolve();
                },
                () => reject()
            );
        });
    },

    comparisonsChange: ({commit, dispatch, state}, params) => {
        let productId = params.productId;

        return new Promise((resolve, reject) => {
            api.addCompare(productId).then(
                (data) => {
                    dispatch('comparisonsUpdateProducts', data);
                    resolve();
                },
                () => reject()
            );
        });
    },
}

export default {
    state,
    mutations,
    actions,
};