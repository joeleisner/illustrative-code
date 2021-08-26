import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import cssnano from 'cssnano';
import fiber from 'fibers';
import fs from 'fs';
import gulp from 'gulp';
import gulpPug from 'gulp-pug';
import gulpSass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import imageResize from 'gulp-image-resize';
import named from 'vinyl-named-with-path';
import path from 'path';
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
export async function optimizeImages() {
    const { build_dir } = await import('./config.js');

    const verbose = inDevelopment;

    return gulp.src([
        'images/**/*',
        '!images/icon.png'
    ])
        .pipe(imagemin({ verbose }))
        .pipe(gulp.dest(build_dir + '/images'))
        .pipe(browserSync.stream());
}

// Resize images
export async function resizeImages() {
    const { build_dir } = await import('./config.js');

    const verbose = inDevelopment;

    return gulp.src('images/**/*.jpg')
        .pipe(imageResize({
            width: 60,
            height: 60
        }))
        .pipe(imagemin({ verbose }))
        .pipe(rename({ suffix: '.tiny' }))
        .pipe(gulp.dest(build_dir + '/images'))
        .pipe(browserSync.stream());
}

// Optimize and resize images
export const img = gulp.parallel(optimizeImages, resizeImages);

// Define a generic JS task
async function jsTask({ src, dest }) {
    const { build_dir } = await import('./config.js');

    const mode = MODE;
    const options = Object.assign({ mode }, webpackConfig);

    return gulp.src(src)
        .pipe(named())
        .pipe(webpackStream(options, webpack))
        .pipe(gulp.dest(dest ? build_dir + '/' + dest : build_dir))
        .pipe(browserSync.stream());
}

// Transpile site JS
export function siteJs() {
    return jsTask({
        src: [
            'service-worker.js',
            'site.js'
        ]
    });
}

// Transpile project JS
export function projectJs() {
    return jsTask({
        src: 'projects/**/project.js',
        dest: 'projects'
    });
}

// Transpile JS
const js = gulp.parallel(siteJs, projectJs);

// Define a generic PUG to HTML task
async function pugTask({ src, dest }) {
    const pretty = inDevelopment;

    const config = await import('./config.js');

    const data = { config };

    return gulp.src(src)
        .pipe(gulpPug({ data, pretty }))
        .pipe(gulp.dest(dest ? config.build_dir + '/' + dest : config.build_dir))
        .pipe(browserSync.stream());
}

// Transpile the homepage
export function homePug() {
    return pugTask({
        src: 'index.pug'
    });
}

// Transpile the project pages
export function projectPug() {
    return pugTask({
        src: 'projects/**/index.pug',
        dest: 'projects'
    });
}

// Turn PUG into HTML
export const pug = gulp.parallel(homePug, projectPug);

// Define a generic SASS to CSS task
async function sassTask({ src, dest }) {
    const { build_dir } = await import('./config.js');

    let plugins = [autoprefixer];

    if (inProduction) plugins.push(cssnano);

    return gulp.src(src)
        .pipe(transpiler({ fiber }))
        .pipe(postcss(plugins))
        .pipe(gulp.dest(dest ? build_dir + '/' + dest : build_dir))
        .pipe(browserSync.stream());
}

// Turn site SASS into CSS
export function siteSass() {
    return sassTask({
        src: 'site.scss'
    });
}

// Turn project SASS into CSS
export function projectSass() {
    return sassTask({
        src: 'projects/**/project.scss',
        dest: 'projects'
    });
}

// Turn SASS into CSS
export const sass = gulp.parallel(siteSass, projectSass);

// Serve the "build" directory on localhost
export async function serve() {
    const { build_dir, root } = await import('./config.js');

    let routes = {};

    routes[root] = build_dir;

    browserSync.init({
        notify: false,
        open: false,
        server: {
            baseDir: build_dir,
            routes
        },
        startPath: root
    });
}

// Generate the site icons
export async function icons(done) {
    const verbose = inDevelopment;
    const { build_dir, icons } = await import('./config.js');
    const {
        src,
        variants,
        dest
    } = icons;

    variants.forEach(({ name, size }) => {
        gulp.src(src)
            .pipe(imageResize({
                width: size,
                height: size
            }))
            .pipe(imagemin({ verbose }))
            .pipe(rename(name))
            .pipe(gulp.dest(size === 32 ? build_dir : dest));
    });

    return done();
}

// Generate the site manifest
export async function manifest(done) {
    const { manifest } = await import('./config.js');

    fs.writeFileSync(
        path.join(process.cwd(), 'build/manifest.webmanifest'),
        JSON.stringify(manifest)
    );

    return done();
}

// Watch for source file changes
export function watch() {
    gulp.watch([
        'images/**/*',
        '!images/icon.png'
    ], img);
    gulp.watch([
        'service-worker.js',
        'site.js',
        '{components,shared}/**/*.js'
    ], siteJs);
    gulp.watch('{projects,shared}/**/*.js', projectJs);
    gulp.watch([
        'config.js',
        'index.pug',
        '{components,projects,shared}/**/*.{md,pug}'
    ], pug);
    gulp.watch([
        'site.scss',
        '{components,shared}/**/*.scss'
    ], siteSass);
    gulp.watch('{projects,shared}/**/*.scss', projectSass);
    gulp.watch([
        'config.js',
        'images/icon.png'
    ], icons);
    gulp.watch('config.js', manifest);
}

// Build all assets
export const build = gulp.series(gulp.parallel(img, js, pug, sass), icons, manifest);

// Build all assets, serve the "build" directory, and watch for changes
export const develop = gulp.series(build, gulp.parallel(serve, watch));