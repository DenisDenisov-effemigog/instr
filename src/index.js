import Vue from 'vue';

import VueAgile from 'vue-agile';

import store from './js/store';
import country from '../src/js/components/country.vue';
import headerBlock from '../src/js/components/header/header-block.vue';
import topnavSwitch from '../src/js/components/topnav/topnav-switch.vue';
import sliderMain from '../src/js/components/main-page/slider-main.vue';
import sliderPromo from '../src/js/components/main-page/slider-promo.vue';
import sliderPhotoCard from '../src/js/components/slider-photo-card.vue';

Vue.use(VueAgile)

import catalogue from '../src/js/components/catalogue/catalogue.vue';

Vue.prototype.$eventBus = new Vue();

const app = new Vue({
    el: '#app',
    store,
    components: {
        country,
        topnavSwitch,
        headerBlock,
        sliderMain,
        sliderPromo,
        sliderPhotoCard,
        catalogue,
    },
    mounted() {
    }
});