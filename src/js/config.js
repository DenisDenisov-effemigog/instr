export default {
    links: {
        auth: '/auth/',
        auth_restore: '/auth/restore/',
        auth_thanks: '/auth/thanks/',
        cart: '/cart/',
        checkout: '/checkout/',
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
