export default {
    methods: {
        spriteSvg(name) {
            return this.templatePath + 'images/sprite.svg#' + name;
        }
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
                    window.template_path = path.replace(/\/+$/, '') + './';
                } else {
                    window.template_path = '/local/php_interface/lib/instrumtorg/ds-denzel/public/';
                }
            }

            return window.template_path;
        },
    },
}