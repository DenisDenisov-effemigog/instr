import Vue from 'vue';

import store from './js/store';
import country from '../src/js/components/country.vue';
import topnavSwitch from '../src/js/components/topnav/topnav-switch.vue';

import showCatalogue from '../src/js/components/catalogue/show-catalogue.vue';
import catalogue from '../src/js/components/catalogue/catalogue.vue';

Vue.prototype.$eventBus = new Vue();

const app = new Vue({
    el: '#app',
    store,
    components: {
        country,
        topnavSwitch,
        showCatalogue,
        catalogue
    },
    mounted() {
    }
});