import Vue from 'vue';
import Vuex from 'vuex';

import basket from './modules/basket';
import personal from './modules/personal';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        basket,
        personal
    },
});


export default store;