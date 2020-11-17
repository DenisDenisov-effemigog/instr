const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    gulpif = require('gulp-if'),
    envify = require('envify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    terser = require('gulp-terser'),
    vueify = require('vueify'),
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
    },
    bundles: {
        app: {
            css: 'css.min.css',
            js: 'js.min.js',
        },
    },
    src: {
        app: {
            css: [
                './src/main.sass'
            ],
            js: [
                './src/index.js'
            ],
            fonts: [
                './src/vendor/fonts/*.*'
            ],
            images: [
                './src/images/**/*.*'
            ],
        },
    },
};


gulp.task('fix:vuefy', function () {
    return gulp.src([
        "./node_modules/vueify/lib/compiler.js",
        "./node_modules/vueify/lib/compilers/babel.js"
    ], {base: "./"})
        .pipe(replace("'babel-core'", "'@babel/core'"))
        .pipe(gulp.dest('./'));
});

gulp.task('fix', gulp.parallel(
    'fix:vuefy'
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

gulp.task('app:build', gulp.parallel(
    'app:fonts:build',
    'app:css:build',
    'app:js:build',
    'app:images:minify'
));

gulp.task('default', gulp.series(
    'app:build',
));