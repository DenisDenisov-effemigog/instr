import * as types from '../../mutation-types';
import * as Api from '../../../api';

let api = Api.getInstance();

const state = {
    products: [],
    loaded: false
};

const mutations = {
    [types.BASKET_APPLY_PRODUCTS](state, data) {
        state.products = data;
        state.loaded = true;
    },
};

const actions = {
    basketSendQuantity: ({commit, dispatch, state}, params) => {
        debugger;
        let productId = params.productId;
        let quantity = params.quantity;

        return new Promise((resolve, reject) => {
            debugger;
            api.setBasketQuantity(productId, quantity).then(
                (data) => {
                    debugger;
                    dispatch('basketApplyResponseProducts', data);
                    resolve();
                },
                () => reject()
            );
        });
    },
}

const getters = {
    
}

export default {
    state,
    mutations,
    actions,
    getters
};