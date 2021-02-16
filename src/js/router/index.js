import Vue from 'vue';
import Router from 'vue-router';

import store from '../store';
import * as types from '../store/mutation-types';

Vue.use(Router);

const router = new Router({
    // TODO переименовать title
    mode: 'history',
    routes: [
        {
            path: '/account/dashboard',
            component: require('../components/profile/page-dashboard.vue'),
            meta: {
                title: 'Личный кабинет - Сводка',
                h1: 'link.dashboard'
            }
        },
        {
            path: '/account',
            component: require('../components/profile/page-personal.vue'),
            meta: {
                title: 'Личный кабинет - Личные данные',
                h1: 'profile.title.my_own'
            }
        },
        {
            path: '/account/orders',
            component: require('../components/profile/page-orders.vue'),
            meta: {
                title: 'Личный кабинет - Список заказов',
                h1: 'link.orders_list'
            }
        },
        {
            path: '/account/orders/:id',
            component: require('../components/profile/page-orders/page-order.vue'),
            meta: {
                title: 'Личный кабинет - Заказ',
                h1: null,
            }
        },
        {
            path: '/account/finance',
            component: require('../components/profile/page-finance.vue'),
            meta: {
                title: 'Личный кабинет - Финансы',
                h1: 'link.finance'
            }
        },
        {
            path: '/account/adresses',
            component: require('../components/profile/page-delivery.vue'),
            meta: {
                title: 'Личный кабинет - Адреса доставки',
                h1: 'link.my_addresses'
            }
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (!(Object.keys(to.meta).length === 0 && to.meta.constructor === Object)) {
        store.commit(types.LAYOUT_APPLY_TITLE, to.meta.title ? to.meta.title : '');
        store.commit(types.LAYOUT_APPLY_H1, to.meta.h1 ? to.meta.h1 : '');
        //store.commit(types.LAYOUT_APPLY_H1_BACK, to.meta.h1_back ? to.meta.h1_back : null);
        //store.commit(types.LAYOUT_APPLY_BREADCRUMBS, to.meta.breadcrumbs ? to.meta.breadcrumbs : []);
        //document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start'})
    }

    next();
});

export default router;