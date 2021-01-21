import * as types from '../../mutation-types';
import * as Api from '../../../api';

let api = Api.getInstance();

const state = {
    products: [],
    loaded: false,
    view_mode: 'horiz_cards'
};

const mutations = {
    [types.BASKET_APPLY_PRODUCTS](state, data) {
        state.products = data;
        state.loaded = true;
    },
    [types.CART_APPLY_VIEW_MODE](state, newMode) {
        state.view_mode = newMode;
    }
};

const actions = {
    cartSetViewMode({commit}, newMode) {
        commit(types.CART_APPLY_VIEW_MODE, newMode);
    },
    
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
                discount: product.discount,
                allPrice: product.allPrice,
                totalPrice: product.totalPrice,
                available: product.available,
                stock: product.stock,
                basket_quantity: product.basket_quantity,
                tooltips: product.tooltips,

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

    // TODO не работает удаление товара из корзины

    basketSetQuantity: ({commit, dispatch, state}, params) => {

        let productFound = false;
        let existingProducts = JSON.parse(JSON.stringify(state.products));

        let productId = params.productId;
        let quantity = params.quantity;

        existingProducts.every((product, index) => {
            if (product.id == productId) {
                productFound = true;

                existingProducts[index].basket_quantity = quantity;
                existingProducts[index].basket_confirmed = false;
                return false;
            }
            return true;
        });

        if (!productFound) {
            existingProducts.push({
                id: productId,
                basket_quantity: quantity,
                basket_confirmed: false
            });
        }
        commit(types.BASKET_APPLY_PRODUCTS, existingProducts);
    },

    // TODO не работает очистка корзины

    basketClear: ({commit, state}) => {
        api.clearBasket().then(() => {
            commit(types.BASKET_APPLY_PRODUCTS, []);
        });
    }
}

const getters = {
    basketProductsSummary: (state) => {
        //debugger;
        let quantity = 0;
        let price = 0;
        state.products.every((product) => {
            if (product.basket_confirmed && product.available) {
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