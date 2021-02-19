export default {
    methods: {
        cloneOverJson(obj) {
            return JSON.parse(JSON.stringify(obj));
        },
        spriteSvg(name) {
            return this.templatePath + 'images/sprite.svg#' + name;
        },
        toggleHtmlOverflow: function (style){
            let html = document.querySelector('html')
            let body = document.querySelector('body')
            let listing = document.querySelector('.listing__actions')
            html.style.overflowY = style
            body.style.overflowY = style
            if (!!listing) {
                if (style === 'hidden') {
                    listing.style.zIndex = 0
                } else {
                    listing.style.zIndex = 12
                }
            }
            // не уверена насчет .listing__actions, что думаете? не придумала, как скрыть его
        },
        /* getDays: function (date) {
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const firstDate = new Date(date);
            const secondDate = new Date();
            return Math.round((firstDate - secondDate) / oneDay);
        } */ // пока не используется
    },
    computed: {
        templatePath() {
            
            if (window.template_path === undefined) {
                window.template_path = '';
                let app = document.getElementById('app');
                let path = '';

                if (app && app.hasAttribute('data-path')) {
                    path = app.getAttribute('data-path');
                }

                if (path) {
                    window.template_path = path.replace(/\/+$/, '') + '/';
                } else {
                    window.template_path = '/local/php_interface/lib/instrumtorg/ds-mi/public/';
                }
            }

            return window.template_path;
        },
    },
}