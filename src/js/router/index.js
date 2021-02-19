import Vue from 'vue';
import Router from 'vue-router';

import store from '../store';
import * as types from '../store/mutation-types';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/my/dashboard',
            component: require('../components/profile/page-dashboard.vue'),
            meta: {
                title: 'profile.title.my' + ' - ' + 'link.dashboard',
                h1: 'link.dashboard'
            }
        },
        {
            path: '/my/profile',
            component: require('../components/profile/page-personal.vue'),
            meta: {
                title: 'profile.title.my' + ' - ' + 'profile.title.my_own',
                h1: 'profile.title.my_own'
            }
        },
        {
            path: '/my/discounts',
            component: require('../components/profile/page-discounts.vue'),
            meta: {
                title: 'profile.title.my' + ' - ' + 'profile.title.discounts',
                h1: 'profile.title.discounts'
            }
        },
        {
            path: '/my/orders',
            component: require('../components/profile/page-orders.vue'),
            meta: {
                title: 'profile.title.my' + ' - ' + 'link.orders_list',
                h1: 'link.orders_list'
            }
        },
        {
            path: '/my/orders/:id',
            component: require('../components/profile/page-orders/page-order.vue'),
            meta: {
                title: 'profile.title.my' + ' - ' + 'text.order',
                h1: null,
            }
        },
        {
            path: '/my/finances',
            component: require('../components/profile/page-finance.vue'),
            meta: {
                title: 'profile.title.my' + ' - ' + 'link.finance',
                h1: 'link.finance'
            }
        },
        {
            path: '/my/address',
            component: require('../components/profile/page-delivery.vue'),
            meta: {
                title: 'profile.title.my' + ' - ' + 'link.my_addresses',
                h1: 'link.my_addresses'
            }
        },
        {
            path: '/my/feeds',
            component: require('../components/profile/page-feeds.vue'),
            meta: {
                title: 'profile.title.my' + ' - ' + 'profile.title.feeds',
                h1: 'profile.title.feeds'
            }
        },
        {
            path: '/my/appeals',
            component: require('../components/profile/page-appeals.vue'),
            meta: {
                title: 'profile.title.my' + ' - ' +'profile.title.appeals',
                h1: 'profile.title.appeals'
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