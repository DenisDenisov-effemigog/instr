import Vue from 'vue';

import VueAgile from 'vue-agile';
import VueSlickCarousel from 'vue-slick-carousel';

import store from './js/store';
import HelpersMixin from './js/mixins/helper';


import country from '../src/js/components/country.vue';
import modal from '../src/js/components/modal.vue';
import headerBlock from '../src/js/components/header/header-block.vue';
import stickyHeader from '../src/js/components/header/sticky-header.vue';
import topnavSwitch from '../src/js/components/topnav/topnav-switch.vue';
import sliderMain from '../src/js/components/main-page/slider-main.vue';
import sliderPromo from '../src/js/components/main-page/slider-promo.vue';
import sliderCards from '../src/js/components/main-page/slider-cards.vue';
import card from '../src/js/components/card/card.vue';
import sliderPhotoCard from './js/components/card/slider-photo-card.vue';
import addToCart from './js/components/card/add-to-cart.vue';
import homeMenu from './js/components/header/mobile/home-menu.vue';
import productCardSlider from './js/components/poduct-card/product-card-slider.vue';

Vue.use(VueAgile)
Vue.mixin(HelpersMixin)

import catalogue from '../src/js/components/catalogue/catalogue.vue';
import mobileMenu from '../src/js/components/mobile-menu.vue';
import stickyMenu from '../src/js/components/sticky-menu.vue';
import stickyMobileButton from '../src/js/components/sticky-mobile-button.vue';

Vue.prototype.$eventBus = new Vue();

Vue.directive('scroll', {
    inserted: function (el, binding) {
      let f = function (evt) {
        if (binding.value(evt, el)) {
          window.removeEventListener('scroll', f)
        }
      };
      window.addEventListener('scroll', f)
    }
});

const app = new Vue({
    el: '#app',
    store,
    components: {
        country,
        topnavSwitch,
        headerBlock,
        stickyHeader,
        sliderMain,
        sliderPromo,
        sliderCards,
        card,
        sliderPhotoCard,
        catalogue,
        addToCart,
        mobileMenu,
        homeMenu,
        stickyMenu,
        modal,
        stickyMobileButton,
        productCardSlider,
        VueSlickCarousel,
    },
    mounted() {
    }
});