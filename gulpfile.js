let config =  require('./gulp/config'),
    connect = require('gulp-connect'),
    gulp =    require('gulp'),
    postcss = require('gulp-postcss'),
    pug =     require('gulp-pug'),
    rename =  require('./gulp/rename'),
    sass =    require('gulp-sass');

gulp.task('pug', () => {
    gulp.src(config.pug.src)
        .pipe(pug(config.pug.options))
        .pipe(gulp.dest(config.pug.dest))
        .pipe(connect.reload());
});

gulp.task('sass', () => {
    gulp.src(config.sass.src)
        .pipe(sass())
        .pipe(postcss(config.sass.processors))
        .pipe(rename())
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
