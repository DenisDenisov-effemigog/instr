import Vue from 'vue';
import Vuex from 'vuex';

import basket from './modules/basket';
import layout from './modules/layout';
import personal from './modules/personal';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        basket,
        layout,
        personal
    },
});


export default store;