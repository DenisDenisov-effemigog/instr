import Vue from 'vue';
import VueAgile from 'vue-agile';
import VueSlickCarousel from 'vue-slick-carousel';
import store from './js/store';
import router from './js/router';
import HelpersMixin from './js/mixins/helper';
import Vuelidate from 'vuelidate';
import VueTheMask from 'vue-the-mask';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
Vue.use(VueAgile);
Vue.mixin(HelpersMixin);
Vue.use(Vuelidate);
Vue.use(VueTheMask);

function loadLocaleMessages () {
    let messages = [];
    messages['ru'] = require('./locales/ru.json');
    return messages;
}

const i18n = new VueI18n({
    locale: 'ru',
    messages: loadLocaleMessages(),
    pluralizationRules: {
        /**
         * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
         * @param choicesLength {number} an overall amount of available choices
         * @returns a final choice index to select plural word by
         */
        'ru': function(choice, choicesLength) {
            // this === VueI18n instance, so the locale property also exists here

            if (choice === 0) {
                return 0;
            }

            const teen = choice > 10 && choice < 20;
            const endsWithOne = choice % 10 === 1;

            if (choicesLength < 4) {
                return (!teen && endsWithOne) ? 1 : 2;
            }
            if (!teen && endsWithOne) {
                return 1;
            }
            if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
                return 2;
            }

            return (choicesLength < 4) ? 2 : 3;
        }
    }
});

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
    i18n,
    mounted() {
        store.dispatch('basketUpdateProducts');
    }
});