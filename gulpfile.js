import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import cssnano from 'cssnano';
import fiber from 'fibers';
import gulp from 'gulp';
import gulpPug from 'gulp-pug';
import gulpSass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import imageResize from 'gulp-image-resize';
import named from 'vinyl-named';
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
        .pipe(gulp.dest('dist/illustrative-code/assets/images'))
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
        .pipe(gulp.dest('dist/illustrative-code/assets/images'))
        .pipe(browserSync.stream());
}

// Optimize and resize images
export const img = gulp.parallel(optimizeImages, resizeImages);

// Transpile JS
export function js() {
    const mode = MODE;
    const options = Object.assign({ mode }, webpackConfig);

    return gulp.src('js/*.js')
        .pipe(named())
        .pipe(webpackStream(options, webpack))
        .pipe(gulp.dest('dist/illustrative-code/assets/js'))
        .pipe(browserSync.stream());
}

// Define a generic PUG to HTML task
function pugTask({ src }) {
    const pretty = inDevelopment;

    return gulp.src(src)
        .pipe(gulpPug({ pretty }))
        .pipe(gulp.dest('dist/illustrative-code'))
        .pipe(browserSync.stream());
}

// Turn PUG pages into HTML
export function pug() {
    return pugTask({
        src: 'pages/**/index.pug'
    });
}

// Define a generic SASS to CSS task
function sassTask({ src, dest }) {
    let plugins = [autoprefixer];

    if (inProduction) plugins.push(cssnano);

    return gulp.src(src)
        .pipe(transpiler({ fiber }))
        .pipe(postcss(plugins))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream());
}

// Turn global SASS into CSS
export function globalSass() {
    return sassTask({
        src: 'scss/global.scss',
        dest: 'dist/illustrative-code/assets/css'
    });
}

// Turn project SASS into CSS
export function projectSass() {
    return sassTask({
        src: 'pages/**/styles.{sass,scss}',
        dest: 'dist/illustrative-code'
    });
}

// Turn SASS into CSS
export const sass = gulp.parallel(globalSass, projectSass);

// Serve the "dist" directory on localhost
export function serve() {
    browserSync.init({
        notify: false,
        open: false,
        server: {
            baseDir: './dist'
        }
    });
}

// Watch for source file changes
export function watch() {
    gulp.watch([
        'images/**/*'
    ], img);
    gulp.watch([
        'js/**/*.js'
    ], js);
    gulp.watch([
        '{pages,pug}/**/*.{md,pug}'
    ], pug);
    gulp.watch([
        '{pages,scss,shared}/**/*.{sass,scss}'
    ], sass);
}

// Build all assets
export const build = gulp.parallel(img, js, pug, sass);

// Build all assets, serve the "dist" directory, and watch for changes
export const develop = gulp.series(build, gulp.parallel(serve, watch));