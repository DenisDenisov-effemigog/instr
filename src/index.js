import Vue from 'vue';
import VueAgile from 'vue-agile';
import VueSlickCarousel from 'vue-slick-carousel';
import store from './js/store';
import router from './js/router';
import HelpersMixin from './js/mixins/helper';
import Vuelidate from 'vuelidate';

Vue.use(VueAgile)
Vue.mixin(HelpersMixin)
Vue.use(Vuelidate)

Vue.prototype.$eventBus = new Vue();

const requireComponent = require('./js/components.js');
for(let idx in requireComponent.default.components) {
    Vue.component(requireComponent.default.components[idx].name, requireComponent.default.components[idx]);
}

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
    router,
    mounted() {
        store.dispatch('basketUpdateProducts');
    }
});