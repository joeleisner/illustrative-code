const babel =   require('gulp-babel');
const config =  require('./gulp/config');
const connect = require('gulp-connect');
const gulp =    require('gulp');
const postcss = require('gulp-postcss');
const pug =     require('gulp-pug');
const rename =  require('./gulp/rename');
const sass =    require('gulp-sass');
const uglify =  require('gulp-uglify');

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

gulp.task('js', () => {
    gulp.src(config.js.src)
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename())
        .pipe(gulp.dest(config.js.dest))
        .pipe(connect.reload());
});

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

gulp.task('global', ['js', 'pug', 'sass']);

gulp.task('build', ['projects', 'global']);

gulp.task('connect', () => {
    connect.server(config.connect);
});

gulp.task('watch', () => {
    gulp.watch(config.projects.pug.watch,  ['projects-pug']);
    gulp.watch(config.projects.sass.watch, ['projects-sass']);
    gulp.watch(config.js.watch,            ['js']);
    gulp.watch(config.pug.watch,           ['pug', 'projects-pug']);
    gulp.watch(config.sass.watch,          ['sass']);
});

gulp.task('default', ['connect', 'watch']);
