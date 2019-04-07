const gulp = require('gulp'),
    js     = require('./js'),
    pug    = require('./pug'),
    sass   = require('./sass');

function build(context, style) {
    const index = style || 'all',
        tasks   = [ pug[context], sass[context][index] ];

    if ([ 'all', 'global' ].includes(context)) tasks.unshift(js[index]);

    return gulp.series(gulp.parallel(...tasks));
}

module.exports = {
    all: {
        all: build('all'),
        exp: build('all', 'exp'),
        min: build('all', 'min')
    },
    global: {
        all: build('global'),
        exp: build('global', 'exp'),
        min: build('global', 'min')
    },
    projects: {
        all: build('projects'),
        exp: build('projects', 'exp'),
        min: build('projects', 'min')
    },
    ref: build
};