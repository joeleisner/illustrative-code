const gulp = require('gulp'),
    tasks  = require('./gulp/tasks');

gulp.task('build',         tasks.all());
gulp.task('default',       tasks.watch());
gulp.task('global',        tasks.global.all());
gulp.task('js',            tasks.global.js);
gulp.task('projects-pug',  tasks.projects.pug);
gulp.task('projects-sass', tasks.projects.sass);
gulp.task('projects',      tasks.projects.all());
gulp.task('pug',           tasks.global.pug);
gulp.task('sass',          tasks.global.sass);
gulp.task('watch',         tasks.watch());