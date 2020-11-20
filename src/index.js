import Vue from 'vue';

import VueAgile from 'vue-agile';

import store from './js/store';
import country from '../src/js/components/country.vue';
import headerBlock from '../src/js/components/header/header-block.vue';
import topnavSwitch from '../src/js/components/topnav/topnav-switch.vue';
import sliderMain from '../src/js/components/main-page/slider-main.vue';
import sliderPromo from '../src/js/components/main-page/slider-promo.vue';

Vue.use(VueAgile)

import showCatalogue from '../src/js/components/catalogue/show-catalogue.vue';
import catalogue from '../src/js/components/catalogue/catalogue.vue';
// import catalogueSubcategories from '../src/js/components/catalogue/catalogue-subcategories.vue';

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
        showCatalogue,
        catalogue,
        // catalogueSubcategories
    },
    mounted() {
    }
});