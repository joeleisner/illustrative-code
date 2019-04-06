const gulp    = require('gulp'),
    minify    = require('../modules/sass/minify'),
    prefix    = require('../modules/sass/prefix'),
    postcss   = require('gulp-postcss'),
    rename    = require('../modules/shared/rename'),
    transpile = require('gulp-sass');

function sass(context, style) {
    if (!context) return gulp.series(gulp.parallel(sass('global', style), sass('projects', style)));

    if (!style) return gulp.series(gulp.parallel(sass(context, 'exp'), sass(context, 'min')));

    const types = {
            global: {
                dest: 'dist/illustrative-code/assets/css',
                src:  'src/sass/*.sass'
            },
            projects: {
                dest: 'dist/illustrative-code',
                src:  'src/projects/**/styles.sass'
            }
        },
        type = types[context];

    const processors = {
            exp: [ prefix() ],
            min: [ prefix(), minify() ]
        },
        processor    = processors[style];

    function method() {
        return gulp.src(type.src)
            .pipe(transpile())
            .pipe(postcss(processor))
            .pipe(rename(style))
            .pipe(gulp.dest(type.dest));
    }

    method.displayName = `sass:${ context }:${ style }`;

    return method;
}

module.exports = {
    all: {
        all: sass(null),
        exp: sass(null, 'exp'),
        min: sass(null, 'min')
    },
    global: {
        all: sass('global'),
        exp: sass('global', 'exp'),
        min: sass('global', 'min')
    },
    projects: {
        all: sass('projects'),
        exp: sass('projects', 'exp'),
        min: sass('projects', 'min')
    },
    ref: sass
};