const config =  require('./gulp/config');
const connect = require('gulp-connect');
const gulp =    require('gulp');
const postcss = require('gulp-postcss');
const pug =     require('gulp-pug');
const rename =  require('./gulp/rename');
const sass =    require('gulp-sass');

gulp.task('pug', () => {
    gulp.src(config.pug.src)
        .pipe(pug(config.pug.options))
        .pipe(gulp.dest(config.pug.dest))
        .pipe(connect.reload());
});

gulp.task('sass', () => {
    gulp.src(config.sass.src)
        .pipe(sass())
        .pipe(postcss(config.sass.processors.exp))
        .pipe(gulp.dest(config.sass.dest))
        .pipe(postcss(config.sass.processors.min))
        .pipe(rename(config.sass.rename))
        .pipe(gulp.dest(config.sass.dest))
        .pipe(connect.reload());
});

gulp.task('build', ['pug', 'sass']);

gulp.task('connect', () => {
    connect.server(config.connect);
});

gulp.task('watch', () => {
    gulp.watch(config.pug.watch,  ['pug']);
    gulp.watch(config.sass.watch, ['sass']);
});

gulp.task('default', ['connect', 'watch']);
