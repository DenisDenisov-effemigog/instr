import Vue from 'vue';
import Vuex from 'vuex';

import basket from './modules/basket';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        basket
    },
});

export default store;