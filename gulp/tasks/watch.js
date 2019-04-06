const gulp = require('gulp'),
    js     = require('./js'),
    pug    = require('./pug'),
    sass   = require('./sass');

function watch() {
    gulp.watch('src/js/**/*.js',                    js.all);
    gulp.watch('src/pug/**/*.pug',              pug.global);
    gulp.watch('src/sass/**/*.sass',       sass.global.all);
    gulp.watch('src/projects/**/*.pug',       pug.projects);
    gulp.watch('src/projects/**/*.sass', sass.projects.all);
}

module.exports = watch;