export default {
    debounce_timeout: 300,
    loading_timeout: 300,

    phoneTokens: {
        'F': {pattern: /9/},
        '#': {pattern: /\d/}
    },
    phoneMask: '+7 (F##) ###-##-##',

    passwordPattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/

}

