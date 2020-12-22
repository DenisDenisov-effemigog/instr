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
            html.style.overflowY = style
            body.style.overflowY = style
        },
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