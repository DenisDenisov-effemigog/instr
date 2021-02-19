export default {
    links: {
        compare: '/compare/',
        favorites: '/favorites/',
        cart: '/cart/',
        personal: '/my/',
        personal_dashboard: '/my/dashboard',
        personal_profile: '/my/profile',
        personal_discounts: '/my/discounts',
        personal_orders: '/my/orders',
        personal_order: '/my/orders/%ORDER_ID%',
        personal_finances: '/my/finances',
        personal_address: '/my/address',
        personal_appeals: '/my/appeals',
        personal_feeds: '/my/feeds',
        checkout: '/checkout/',
        success: '/checkout/%success%',
        error : '/checkout/%error%',

        catalog : '/catalog/',
        conditions : '/conditions/',
        delivery : '/delivery/',
        search : '/search/',
        about : '/about/',
        branches : '/branches/',
        points : '/points/',
        cooperation : '/cooperation/',
        brands : '/brands/',
        shares : '/shares/',
        
        auth: '/auth/',
        auth_restore: '/auth/restore/',
        auth_thanks: '/auth/thanks/',
        order_success: '/order/?id='
    },
    debounce_timeout: 300,
    loading_timeout: 300,

    phoneTokens: {
        'F': {pattern: /9/},
        '#': {pattern: /\d/}
    },
    // phoneMask: '+7 (F##) ###-##-##', Идёт из базы

    passwordPattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,

}
