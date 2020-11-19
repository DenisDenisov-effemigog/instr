import Vue from 'vue';

import VueAgile from 'vue-agile';

import store from './js/store';
import country from '../src/js/components/country.vue';
import topnavSwitch from '../src/js/components/topnav/topnav-switch.vue';
import sliderMain from '../src/js/components/main-page/slider-main.vue';

Vue.use(VueAgile)

Vue.prototype.$eventBus = new Vue();

const app = new Vue({
    el: '#app',
    store,
    components: {
        country,
        topnavSwitch,
        sliderMain,
    },
    mounted() {
    }
});