import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import cssnano from 'cssnano';
import fiber from 'fibers';
import fs from 'fs';
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import htmlmin from 'gulp-htmlmin';
import htmlprettify from 'gulp-html-prettify';
import { jsToHTML } from './shared/plugins.cjs';
import imagemin from 'gulp-imagemin';
import imageResize from 'gulp-image-resize';
import named from 'vinyl-named-with-path';
import path from 'path';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sassCompiler from 'sass';
import webpack from 'webpack';
import {
    html as htmlConfig,
    js as jsConfig
} from './webpack.config.js';
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
        '!images/icon.png',
        '!images/icon.svg'
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
    const options = Object.assign({ mode }, jsConfig);

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

// Transpile the offline page JS
export function offlineJs() {
    return jsTask({
        src: 'offline/offline.js',
        dest: 'offline'
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
const js = gulp.parallel(siteJs, offlineJs, projectJs);

// Define the HTML source file globs
const HTML_FILES = [
    '{offline,projects}/**/index.js',
    'index.js'
];

// Transpile JS to HTML
export async function html() {
    const { build_dir } = await import('./config.js');

    return gulp.src(HTML_FILES)
        .pipe(named())
        .pipe(webpackStream(htmlConfig, webpack))
        .pipe(jsToHTML())
        .pipe(inProduction ? htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }) : htmlprettify())
        .pipe(gulp.dest(build_dir));
}

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

// Turn the offline SASS into CSS
export function offlineSass() {
    return sassTask({
        src: 'offline/offline.scss',
        dest: 'offline'
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
export const sass = gulp.parallel(siteSass, offlineSass, projectSass);

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

// Generat the favicon
export async function favicons() {
    const { icons } = await import('./config.js');
    const { favicon, dest } = icons;

    return gulp.src(favicon.src)
        .pipe(gulp.dest(dest));
}

// Generate the web app icons
export async function icons(done) {
    const verbose = inDevelopment;
    const { icons } = await import('./config.js');
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
            .pipe(gulp.dest(dest));
    });

    return done();
}

// Generate the site manifest
export async function manifest(done) {
    const { build_dir, manifest } = await import('./config.js');

    const dir = path.join(process.cwd(), build_dir);

    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    fs.writeFileSync(
        path.join(dir, 'manifest.webmanifest'),
        JSON.stringify(manifest)
    );

    return done();
}

// Watch for source file changes
export function watch() {
    // Images
    gulp.watch([
        'images/**/*',
        '!images/icon.png',
        '!images/icon.svg'
    ], img);
    // JS
    gulp.watch([
        'service-worker.js',
        'site.js',
        '{components,shared}/**/*.js'
    ], siteJs);
    gulp.watch('offline/index.js', offlineJs);
    gulp.watch('{projects,shared}/**/*.js', projectJs);
    // HTML
    gulp.watch([
        'components/**/html.js',
        'config.js',
        'shared/html.js',
        ...HTML_FILES
    ], html);
    // SCSS
    gulp.watch([
        'site.scss',
        '{components,shared}/**/*.scss'
    ], siteSass);
    gulp.watch('offline/index.scss', offlineSass);
    gulp.watch('{projects,shared}/**/*.scss', projectSass);
    // Favicons
    gulp.watch([
        'config.js',
        'images/icon.svg'
    ], favicons);
    // Icons
    gulp.watch([
        'config.js',
        'images/icon.png'
    ], icons);
    // Manifest
    gulp.watch('config.js', manifest);
}

// Build all assets
export const build = gulp.series(gulp.parallel(img, js, html, sass), favicons, icons, manifest);

// Build all assets, serve the "build" directory, and watch for changes
export const develop = gulp.series(build, gulp.parallel(serve, watch));