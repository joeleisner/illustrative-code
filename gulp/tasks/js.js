const babel = require('gulp-babel'),
    gulp    = require('gulp'),
    named   = require('vinyl-named'),
    rename  = require('../modules/shared/rename'),
    uglify  = require('../modules/js/uglify'),
    webpack = require('webpack-stream');

function js(style) {
    if (!style) return gulp.series(js('exp'), js('min'));

    const modes = {
            exp: 'development',
            min: 'production'
        },
        mode    = modes[style];

    function method() {
        return gulp.src('src/js/*.js')
            .pipe(named())
            .pipe(webpack({ mode }))
            .pipe(babel())
            .pipe(uglify(style))
            .pipe(rename(style))
            .pipe(gulp.dest('dist/illustrative-code/assets/js'));
    }

    method.displayName = 'js:' + style;

    return method;
}

module.exports = {
    all: js(),
    exp: js('exp'),
    min: js('min'),
    ref: js
};