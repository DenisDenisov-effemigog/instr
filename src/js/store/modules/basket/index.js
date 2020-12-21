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
    
    basketApplyResponseProducts: ({commit, dispatch}, data) => {
        //debugger;
        let products = [];
        data.forEach((product) => {
            products.push({
                id: product.id,
                name: product.name,
                url: product.url,
                sku: product.sku,
                images: product.images,
                price: product.price,
                available: product.available,
                stock: product.stock,
                basket_quantity: product.basket_quantity,

                basket_confirmed: true
            });
        });

        commit(types.BASKET_APPLY_PRODUCTS, products);
    },

    basketUpdateProducts: ({dispatch}) => {
        //debugger;
        return new Promise((resolve, reject) => {
            api.getBasket().then(
                (data) => {
                    //debugger;
                    dispatch('basketApplyResponseProducts', data);
                    resolve();
                },
                () => reject()
            );
        });
    },
    
    basketSendQuantity: ({commit, dispatch, state}, params) => {
        //debugger;
        let productId = params.productId;
        let quantity = params.quantity;

        return new Promise((resolve, reject) => {
            //debugger;
            api.setBasketQuantity(productId, quantity).then(
                (data) => {
                    //debugger;
                    dispatch('basketApplyResponseProducts', data);
                    resolve();
                },
                () => reject()
            );
        });
    },
}

const getters = {
    basketProductsSummary: (state) => {
        //debugger;
        let quantity = 0;
        let price = 0;
        state.products.every((product) => {
            if (product.basket_confirmed) {
                quantity += product.basket_quantity;
                price += product.price * product.basket_quantity;
            }
            return true;
        });
        return {
            quantity: quantity,
            price: price
        };
    },
    basketProductQuantity: (state) => (productId) => {
        let quantity = 0;
        //console.log('state.products', state.products);
        state.products.every((product) => {
            if (product.id == productId) {
                quantity = product.basket_quantity;
                return false;
            }
            return true;
        });
        return quantity;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
};