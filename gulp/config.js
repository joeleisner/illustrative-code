const autoprefixer = require('autoprefixer');
const cssnano =      require('cssnano');

module.exports = {
    connect: {
        root:       'dist',
        livereload: true
    },
    // Project-specific PUG/SASS
    projects: {
        pug: {
            dest:  'dist',
            options: {
                pretty: true
            },
            src:   'src/projects/**/index.pug',
            watch: 'src/projects/**/*.pug'
        },
        sass: {
            dest:  'dist',
            processors: {
                exp: [autoprefixer({ browsers: ['last 2 versions'] })],
                min: [cssnano()]
            },
            src:   'src/projects/**/styles.sass',
            watch: 'src/projects/**/*.sass'
        }
    },
    // Global SASS
    sass: {
        dest:  'dist/assets/css',
        processors: [
            autoprefixer({ browsers: ['last 2 versions'] }),
            cssnano()
        ],
        src:   'src/sass/*.sass',
        watch: 'src/sass/**/*.sass'
    }
};
