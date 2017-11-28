const config =  require('./gulp/config');
const connect = require('gulp-connect');
const gulp =    require('gulp');
const postcss = require('gulp-postcss');
const pug =     require('gulp-pug');
const rename =  require('./gulp/rename');
const sass =    require('gulp-sass');

gulp.task('projects-pug', () => {
    gulp.src(config.projects.pug.src)
        .pipe(pug(config.projects.pug.options))
        .pipe(gulp.dest(config.projects.pug.dest))
        .pipe(connect.reload());
});

gulp.task('projects-sass', () => {
    gulp.src(config.projects.sass.src)
        .pipe(sass())
        .pipe(postcss(config.projects.sass.processors.exp))
        .pipe(gulp.dest(config.projects.sass.dest))
        .pipe(postcss(config.projects.sass.processors.min))
        .pipe(rename())
        .pipe(gulp.dest(config.projects.sass.dest))
        .pipe(connect.reload());
});

gulp.task('projects', ['projects-pug', 'projects-sass']);

gulp.task('build', ['projects']);

gulp.task('connect', () => {
    connect.server(config.connect);
});

gulp.task('watch', () => {
    gulp.watch(config.projects.pug.watch,  ['pug']);
    gulp.watch(config.projects.sass.watch, ['sass']);
});

gulp.task('default', ['connect', 'watch']);
