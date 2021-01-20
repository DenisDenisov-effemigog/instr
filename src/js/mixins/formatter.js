export default {
    methods: {
        number: function (value) {
            let str = value
                .replace(' ', '');

            return parseInt(str);
        },

        currency: function (value) {
            let str = value
                .toFixed(0);

            let parts = str.split('.');
            parts[0] = parts[0]
                .split('')
                .reverse()
                .join('')
                .match(/.{1,3}/g)
                .reverse()
                .map(value => value.split('').reverse().join(''))
                .join(' ');
            return parts.join('.');
        },
        
    }
}