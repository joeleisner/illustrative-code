import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import cssnano from 'cssnano';
import fiber from 'fibers';
import gulp from 'gulp';
import gulpPug from 'gulp-pug';
import gulpSass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import imageResize from 'gulp-image-resize';
import named from 'vinyl-named-with-path';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sassCompiler from 'sass';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import webpackStream from 'webpack-stream';

const transpiler = gulpSass(sassCompiler);

const { NODE_ENV } = process.env;
const MODE = NODE_ENV || 'development';
const inDevelopment = MODE === 'development';
const inProduction = MODE === 'production';

// Optimize images
export function optimizeImages() {
    const verbose = inDevelopment;

    return gulp.src('images/**/*')
        .pipe(imagemin({ verbose }))
        .pipe(gulp.dest('build/images'))
        .pipe(browserSync.stream());
}

// Resize images
export function resizeImages() {
    return gulp.src('images/**/*.jpg')
        .pipe(imageResize({
            width: 60,
            height: 60
        }))
        .pipe(rename({ suffix: '.tiny' }))
        .pipe(gulp.dest('build/images'))
        .pipe(browserSync.stream());
}

// Optimize and resize images
export const img = gulp.parallel(optimizeImages, resizeImages);

// Define a generic JS task
function jsTask({ src, dest }) {
    const mode = MODE;
    const options = Object.assign({ mode }, webpackConfig);

    return gulp.src(src)
        .pipe(named())
        .pipe(webpackStream(options, webpack))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream());
}

// Transpile site JS
export function siteJs() {
    return jsTask({
        src: 'site.js',
        dest: 'build'
    });
}

// Transpile project JS
export function projectJs() {
    return jsTask({
        src: 'projects/**/project.js',
        dest: 'build/projects'
    });
}

// Transpile JS
const js = gulp.parallel(siteJs, projectJs);

// Define a generic PUG to HTML task
function pugTask({ src, dest }) {
    const pretty = inDevelopment;

    return gulp.src(src)
        .pipe(gulpPug({ pretty }))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream());
}

// Transpile the homepage
export function homePug() {
    return pugTask({
        src: 'index.pug',
        dest: 'build'
    });
}

// Transpile the project pages
export function projectPug() {
    return pugTask({
        src: 'projects/**/index.pug',
        dest: 'build/projects'
    });
}

// Turn PUG into HTML
export const pug = gulp.parallel(homePug, projectPug);

// Define a generic SASS to CSS task
function sassTask({ src, dest, minify = true }) {
    let plugins = [autoprefixer];

    if (inProduction && minify !== false) plugins.push(cssnano);

    return gulp.src(src)
        .pipe(transpiler({ fiber }))
        .pipe(postcss(plugins))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream());
}

// Turn site SASS into CSS
export function siteSass() {
    return sassTask({
        src: 'site.scss',
        dest: 'build'
    });
}

// Turn project SASS into CSS
export function projectSass() {
    return sassTask({
        src: 'projects/**/project.scss',
        dest: 'build/projects',
        minify: false
    });
}

// Turn SASS into CSS
export const sass = gulp.parallel(siteSass, projectSass);

// Serve the "build" directory on localhost
export function serve() {
    browserSync.init({
        notify: false,
        open: false,
        server: {
            baseDir: 'build',
            routes: {
                '/illustrative-code': 'build'
            }
        },
        startPath: '/illustrative-code'
    });
}

// Watch for source file changes
export function watch() {
    gulp.watch('images/**/*', img);
    gulp.watch([
        'site.js',
        '{components,shared}/**/*.js'
    ], siteJs);
    gulp.watch('{projects,shared}/**/*.js', projectJs);
    gulp.watch([
        'index.pug',
        '{components,projects,shared}/**/*.{md,pug}'
    ], pug);
    gulp.watch([
        'site.scss',
        '{components,shared}/**/*.scss'
    ], siteSass);
    gulp.watch('{projects,shared}/**/*.scss', projectSass);
}

// Build all assets
export const build = gulp.parallel(img, js, pug, sass);

// Build all assets, serve the "build" directory, and watch for changes
export const develop = gulp.series(build, gulp.parallel(serve, watch));