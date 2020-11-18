import Vue from 'vue';

import store from './js/store';
import country from '../src/js/components/country.vue';
import topnavSwitch from '../src/js/components/topnav/topnav-switch.vue';

Vue.prototype.$eventBus = new Vue();

const app = new Vue({
    el: '#app',
    store,
    components: {
        country,
        topnavSwitch
    },
    mounted() {
    }
});