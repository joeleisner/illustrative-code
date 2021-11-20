import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import cssnano from 'cssnano';
import filter from 'gulp-filter';
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

// Define the images source file blobs
const IMAGE_FILES = 'images/{*.jpg,thumbnail.png}';

// Optimize and resize images
export async function img(done) {
    const { build_dir } = await import('./config.js');

    const verbose = inDevelopment;

    gulp.src(IMAGE_FILES)
        .pipe(imagemin({ verbose }))
        .pipe(gulp.dest(build_dir + '/images'));

    // Create a filter for only *.jpg images
    const jpgs = filter(['*.jpg']);

    gulp.src(IMAGE_FILES)
        .pipe(jpgs)
        .pipe(imagemin({ verbose }))
        .pipe(imageResize({
            width: 60,
            height: 60
        }))
        .pipe(rename({ suffix: '.tiny' }))
        .pipe(gulp.dest(build_dir + '/images'))
        .pipe(browserSync.stream());

    return done();
}

// Define the HTML source file globs
const JS_FILES = [
    '{!build,projects}/**/project.js',
    '{service-worker,site}.js'
];

// Transpile JS
export async function js() {
    const { build_dir } = await import('./config.js');

    const mode = MODE;
    const options = Object.assign({ mode }, jsConfig);

    return gulp.src(JS_FILES)
        .pipe(named())
        .pipe(webpackStream(options, webpack))
        .pipe(gulp.dest(build_dir))
        .pipe(browserSync.stream());
}

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
        .pipe(gulp.dest(build_dir))
        .pipe(browserSync.stream());
}

// Define the SCSS source file globs
const SCSS_FILES = '{offline,projects}/**/*.scss';

// Transpile the SCSS into CSS
export async function scss() {
    const { build_dir } = await import('./config.js');

    let plugins = [autoprefixer];

    if (inProduction) plugins.push(cssnano);

    return gulp.src(SCSS_FILES)
        .pipe(transpiler())
        .pipe(postcss(plugins))
        .pipe(gulp.dest(build_dir))
        .pipe(browserSync.stream());
}

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

// Define the icon source file globs
const ICON_FILES = 'images/icon.*';

// Generate the web app icons
export async function icons(done) {
    const verbose = inDevelopment;
    const { icons } = await import('./config.js');
    const {
        favicon,
        src,
        variants,
        dest
    } = icons;

    gulp.src(favicon.src)
        .pipe(gulp.dest(dest));

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
    gulp.watch(IMAGE_FILES, img);
    // JS
    gulp.watch([
        'components/**/index.js',
        'config.js',
        ...JS_FILES
    ], js);
    // HTML
    gulp.watch([
        'components/**/{_index.scss,html.js,*.svg}',
        '{components,projects}/**/*.md',
        'config.js',
        'shared/html.js',
        'site.scss',
        ...HTML_FILES
    ], html);
    // SCSS
    gulp.watch([
        '{components,shared}/**/*.scss',
        SCSS_FILES
    ], scss);
    // Icons
    gulp.watch([
        'config.js',
        ICON_FILES
    ], icons);
    // Manifest
    gulp.watch('config.js', manifest);
}

// Build all assets
export const build = gulp.series(gulp.parallel(img, js, html, scss), icons, manifest);

// Build all assets, serve the "build" directory, and watch for changes
export const develop = gulp.series(build, gulp.parallel(serve, watch));