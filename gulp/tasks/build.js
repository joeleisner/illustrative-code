const gulp = require('gulp'),
    js     = require('./js'),
    pug    = require('./pug'),
    sass   = require('./sass');

function build(style) {
    const index = style || 'all';
    return gulp.series(gulp.parallel(js[index], pug.global, pug.projects, sass.global[index], sass.projects[index]));
}

module.exports = {
    all: build(),
    exp: build('exp'),
    min: build('min'),
    ref: build
};