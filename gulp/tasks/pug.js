const gulp    = require('gulp'),
    transpile = require('gulp-pug');

function pug(context) {
    if (!context) return gulp.series(gulp.parallel(pug('global'), pug('projects')));

    const pretty = true;

    const sources = {
            global:   'src/pug/*.pug',
            projects: 'src/projects/**/index.pug'
        },
        source = sources[context];

    function method() {
        return gulp.src(source)
            .pipe(transpile({ pretty }))
            .pipe(gulp.dest('dist/illustrative-code'));
    }

    method.displayName = `pug:${ context }`;

    return method;
}

module.exports = {
    all:      pug(),
    global:   pug('global'),
    projects: pug('projects'),
    ref:      pug
};