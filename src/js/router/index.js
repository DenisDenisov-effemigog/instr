import Vue from 'vue';
import Router from 'vue-router';

import store from '../store';
import * as types from '../store/mutation-types';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/account',
            component: require('../components/profile/page-personal.vue'),
            meta: {
                title: 'Your account',
                h1: 'Your account',
                breadcrumbs: [
                    {
                        'title': 'Home',
                        'url': '/'
                    },
                    {
                        'title': 'Your account',
                        'url': '/account/'
                    }
                ]
            }
        },
        {
            path: '/account/orders',//
            component: require('../components/profile/page-orders.vue'),
            meta: {
                title: 'Orders',
                h1: 'Orders',
                'breadcrumbs': [
                    {
                        'title': 'Home',
                        'url': '/'
                    },
                    {
                        'title': 'Your account',
                        'url': '/account/'
                    },
                    {
                        'title': 'Orders',
                        'url': '/account/orders/'
                    }
                ]
            }
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (!(Object.keys(to.meta).length === 0 && to.meta.constructor === Object)) {
        //store.commit(types.LAYOUT_APPLY_TITLE, to.meta.title ? to.meta.title : '');
        //store.commit(types.LAYOUT_APPLY_H1, to.meta.h1 ? to.meta.h1 : '');
        //store.commit(types.LAYOUT_APPLY_H1_BACK, to.meta.h1_back ? to.meta.h1_back : null);
        //store.commit(types.LAYOUT_APPLY_BREADCRUMBS, to.meta.breadcrumbs ? to.meta.breadcrumbs : []);
        //document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start'})
    }

    next();
});

export default router;