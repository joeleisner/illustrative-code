const babel = require('gulp-babel'),
    config  = require('./config'),
    gulp    = require('gulp'),
    postcss = require('gulp-postcss'),
    pug     = require('gulp-pug'),
    rename  = require('./rename'),
    sass    = require('gulp-sass'),
    uglify  = require('gulp-uglify');

function buildPug(config) {
    const { dest, options, src } = config.pug;
    return gulp.src(src)
        .pipe(pug(options))
        .pipe(gulp.dest(dest));
}

function buildSass(config) {
    const { dest, processors, src } = config.sass;
    return gulp.src(src)
        .pipe(sass())
        .pipe(postcss(processors.exp))
        .pipe(gulp.dest(dest))
        .pipe(postcss(processors.min))
        .pipe(rename())
        .pipe(gulp.dest(dest));
}

module.exports = {
    all() {
        const { global, projects } = this;
        return gulp.series(gulp.parallel(global.all(), projects.all()));
    },
    global:   {
        all() {
            const { js, pug, sass } = this;
            return gulp.series(gulp.parallel(js, pug, sass));
        },
        js() {
            const { dest, src } = config.global.js;
            return gulp.src(src)
                .pipe(babel())
                .pipe(uglify())
                .pipe(rename())
                .pipe(gulp.dest(dest));
        },
        pug()  { return buildPug(config.global); },
        sass() { return buildSass(config.global); }
    },
    projects: {
        all() {
            const { pug, sass } = this;
            return gulp.series(gulp.parallel(pug, sass));
        },
        pug()  { return buildPug(config.projects); },
        sass() { return buildSass(config.projects); }
    },
    watch() {
        const { watch } = config,
            tasks       = this;
        return () => {
            gulp.watch(watch.global.js,         tasks.global.js);
            gulp.watch(watch.global.pug,       tasks.global.pug);
            gulp.watch(watch.global.sass,     tasks.global.sass);
            gulp.watch(watch.projects.pug,   tasks.projects.pug);
            gulp.watch(watch.projects.sass, tasks.projects.sass);
        };
    }
};