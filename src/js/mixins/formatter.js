export default {
    methods: {
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
        localDate: function (value, local) { // local - String difining local: 'ru', 'en-GB' etc.
            value = value + ', 0';
            console.log(value, local, new Date(Date.UTC(value)));
            const date = new Date(Date.UTC(value))
            return date.toLocaleDateString(local)
        }  // перевод формата даты (value) ГГГГ.ММ.ДД в ДД.ММ.ГГГГ с передачей аргумента local текущей локации/места
    }
}