const build = require('./gulp/tasks/build'),
    gulp    = require('gulp'),
    js      = require('./gulp/tasks/js'),
    pug     = require('./gulp/tasks/pug'),
    sass    = require('./gulp/tasks/sass'),
    watch   = require('./gulp/tasks/watch');

// Build -----------------------------------------
gulp.task('build',                     build.all);
gulp.task('build:exp',                 build.exp);
gulp.task('build:min',                 build.min);
// Default ---------------------------------------
gulp.task('default',                       watch);
// JS --------------------------------------------
gulp.task('js',                           js.all);
gulp.task('js:exp',                       js.exp);
gulp.task('js:min',                       js.min);
// PUG -------------------------------------------
gulp.task('pug',                         pug.all);
gulp.task('pug:global',               pug.global);
gulp.task('pug:projects',           pug.projects);
// SASS ------------------------------------------
gulp.task('sass',                   sass.all.all);
gulp.task('sass:exp',               sass.all.exp);
gulp.task('sass:min',               sass.all.min);
gulp.task('sass:global',         sass.global.all);
gulp.task('sass:global:exp',     sass.global.exp);
gulp.task('sass:global:min',     sass.global.min);
gulp.task('sass:projects',     sass.projects.all);
gulp.task('sass:projects:exp', sass.projects.exp);
gulp.task('sass:projects:min', sass.projects.min);
// Watch -----------------------------------------
gulp.watch('watch',                        watch);