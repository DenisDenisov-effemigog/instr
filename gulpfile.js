const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    cheerio = require('gulp-cheerio'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    gulpif = require('gulp-if'),
    envify = require('envify'),
    fs = require('fs'),
    imagemin = require('gulp-imagemin'),
    path = require('path'),
    php_strings = require('locutus/php/strings'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    svgo = require('gulp-svgo'),
    svgstore = require('gulp-svgstore'),
    terser = require('gulp-terser'),
    twig = require('gulp-twig'),
    vueify = require('vueify'),
    watch = require('gulp-watch'),
    vinyl_buffer = require('vinyl-buffer')
;

const isProduction = (process.env.NODE_ENV === 'production');


let config = {
    build: {
        root: "./public/",
        css: "./public/css/",
        js: "./public/js/",
        images: "./public/images/",
        fonts: './public/fonts/',
        templatePath: "./",

        demo_images: "./public/demo_images/",
    },
    bundles: {
        app: {
            css: 'css.min.css',
            js: 'js.min.js',
            sprite: 'sprite.svg',
        },
        demo: {
            css_menu: 'demo_menu.min.css',
            css_mixins: 'demo_mixins.min.css',
        },
    },
    src: {
        app: {
            css: [
                './src/main.sass'
            ],
            js: [
                './node_modules/@babel/polyfill/dist/polyfill.js',
                './src/index.js'
            ],
            fonts: [
                './src/vendor/fonts/*.*'
            ],
            images: [
                './src/images/**/*.*'
            ],
            sprite: [
                './src/sprite/**/*.svg'
            ],
        },
        demo: {
            css_menu: [
                './node_modules/minireset.css/minireset.sass',
                './src/demo/styles/menu.sass'
            ],
            css_mixins: [
                './src/demo/styles/mixins.sass'
            ],
            images: [
                './src/demo/images/**/*.*'
            ],
            templates_menu_dir: './src/demo/templates/pages/',
            templates: [
                './src/demo/templates/pages/*.*'
            ],
        },
    },
};


gulp.task('fix:vue-agile', function () {
    const foFind = `// Center mode margin
\t\t\t\tif (this.settings.centerMode) {
\t\t\t\t\tmarginX -= (Math.floor(this.settings.slidesToShow / 2) - +(this.settings.slidesToShow % 2 === 0)) * this.widthSlide
\t\t\t\t}`;
    const toReplace = `
                // Center mode margin
                if (this.settings.centerMode) {
                    if(this.settings.slidesToShow >= 2) {
                        marginX -= (Math.floor(this.settings.slidesToShow / 2) - +(this.settings.slidesToShow % 2 === 0)) * this.widthSlide
                    } else {
                        marginX -= 0.5 * (this.settings.slidesToShow - 1) * this.widthSlide
                    }
                }
    `;

    return gulp.src([
        './node_modules/vue-agile/src/Agile.vue'
    ], {base: './'})
        .pipe(replace(foFind, toReplace))
        .pipe(gulp.dest('./'));
});

gulp.task('fix:vuefy', function () {
    return gulp.src([
        "./node_modules/vueify/lib/compiler.js",
        "./node_modules/vueify/lib/compilers/babel.js"
    ], {base: "./"})
        .pipe(replace("'babel-core'", "'@babel/core'"))
        .pipe(gulp.dest('./'));
});

gulp.task('fix', gulp.parallel(
    'fix:vuefy',
    'fix:vue-agile'
));


function buildSass(source, bundle, destination) {
    return gulp.src(source)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(concat(bundle))
        .pipe(autoprefixer())
        .pipe(gulpif(isProduction, csso()))
        .pipe(gulp.dest(destination));
}

gulp.task('app:fonts:build', function () {
    return gulp.src(config.src.app.fonts)
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.build.fonts));
});

gulp.task('app:css:build', function () {
    return buildSass(config.src.app.css, config.bundles.app.css, config.build.css);
});

gulp.task('app:js:build', function () {
    return browserify({
        entries: config.src.app.js,
        debug: !isProduction
    })
        .transform(envify, {"global": true, "NODE_ENV": process.env.NODE_ENV})
        .transform(vueify)
        .transform(babelify, {
            global: true,
            compact: false,
            presets: [
                ["@babel/preset-env"]
            ]
        })
        .bundle()
        .pipe(source(config.bundles.app.js))
        .pipe(vinyl_buffer())
        .pipe(gulpif(isProduction, terser({
            output: {
                comments: false,
                beautify: false
            }
        })))
        .pipe(gulp.dest(config.build.js));
});

gulp.task('app:images:minify', function () {
    return gulp.src(config.src.app.images)
        .pipe(imagemin([
            imagemin.mozjpeg({
                progressive: true,
                quality: 90
            }),
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.gifsicle({interlaced: true}),
            imagemin.svgo({
                plugins: [{
                    removeTitle: true,
                    cleanupIDs: true,
                    convertStyleToAttrs: true
                }]
            })
        ]))
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace('/images', '');
        }))
        .pipe(gulp.dest(config.build.images));
});

gulp.task('app:sprite:build', function () {
    return gulp.src(config.src.app.sprite, {base: './src/sprite'})
        .pipe(rename(function (file) {
            let name = file.dirname.split(path.sep).filter(part => part !== '.');
            name.push(file.basename);
            file.basename = name.join('__');
        }))
        .pipe(svgo())
        .pipe(svgstore({
            inlineSvg: false
        }))
        .pipe(cheerio({
            run: function ($) {
                // remove empty symbols
                $('symbol').filter(function (i, el) {
                    return $(this).html().length === 0;
                }).remove();
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(rename(config.bundles.app.sprite))
        .pipe(gulp.dest(config.build.images));
});

gulp.task('app:build', gulp.parallel(
    'app:fonts:build',
    'app:css:build',
    'app:js:build',
    'app:images:minify',
    'app:sprite:build',
));


//--------------------------------------------------------------------------------------------------------------------//
// DEMO
//--------------------------------------------------------------------------------------------------------------------//


gulp.task('demo:css_menu:build', function () {
    return buildSass(config.src.demo.css_menu, config.bundles.demo.css_menu, config.build.css);
});

gulp.task('demo:css_mixins:build', function () {
    return buildSass(config.src.demo.css_mixins, config.bundles.demo.css_mixins, config.build.css);
});

gulp.task('demo:img:minify', function () {
    return gulp.src(config.src.demo.images)
        .pipe(imagemin([
            imagemin.mozjpeg({progressive: true}),
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.gifsicle({interlaced: true}),
            imagemin.svgo({
                plugins: [{
                    removeTitle: true,
                    cleanupIDs: true,
                    convertStyleToAttrs: true
                }]
            })
        ]))
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace('/demo/images', '');
        }))
        .pipe(gulp.dest(config.build.demo_images));
});

gulp.task('demo:templates:build', function () {

    let menu = [
        {
            title: 'Components',
            children: []
        },
        {
            title: 'Elements',
            children: []
        },
        {
            title: 'Blocks',
            children: []
        },
        {
            title: 'Pages',
            children: []
        }

    ];
    let files = fs.readdirSync(config.src.demo.templates_menu_dir);

    files.forEach(function (file) {
        if (file !== 'index.twig') {
            let data = fs.readFileSync(config.src.demo.templates_menu_dir + file, 'utf8');
            let match = data.match(/{% block title %}(.*?){% endblock %}/);

            let menuTitle = 'undefined';
            let submenuTitle = file;

            if (match) {
                let titleData = match[1].split('|');
                if (titleData[0] && titleData[1]) {
                    menuTitle = titleData[0].trim();
                    submenuTitle = titleData[1].trim();
                } else {
                    submenuTitle = match[1].trim();
                }
            }

            let htmlFileName = './' + file.replace('.twig', '.html');

            let menufound = false;
            menu.forEach(function (item, index) {
                if (item.title === menuTitle) {
                    menufound = true;
                    menu[index]['children'].push({
                        url: htmlFileName,
                        title: submenuTitle
                    });
                }
            });
            if (!menufound) {
                menu.push({
                    title: menuTitle,
                    children: [
                        {
                            url: htmlFileName,
                            title: submenuTitle
                        }
                    ]
                })
            }
        }
    });


    return gulp.src(config.src.demo.templates)
        .pipe(twig({
            data: {
                demo_menu: menu,
                templatePath: config.build.templatePath
            },
            filters: [
                {
                    name: 'currency',
                    func: function (value) {
                        return php_strings.number_format(value, 2, '.', ',');
                    }
                }
            ]
        }))
        .pipe(gulp.dest(config.build.root));
});

gulp.task('demo:build', gulp.parallel(
    'demo:css_menu:build',
    'demo:css_mixins:build',
    'demo:img:minify',
    'demo:templates:build'
));

gulp.task('watch', function(){
    watch(
        ['./src/**/*.js', './src/**/*.vue'],
        gulp.series('app:js:build')
    );
});

gulp.task('default', gulp.series(
    'app:build',
    'demo:build'
));