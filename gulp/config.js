const autoprefixer = require('autoprefixer'),
    cssnano        = require('cssnano'),
    processors     = {
        exp: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
        min: [ cssnano() ]
    };

module.exports = {
    global: {
        js: {
            dest: 'dist/illustrative-code/assets/js',
            src:  'src/js/*.js'
        },
        pug: {
            dest: 'dist/illustrative-code',
            options: {
                pretty: true
            },
            src:  'src/pug/*.pug'
        },
        sass: {
            dest: 'dist/illustrative-code/assets/css',
            processors,
            src:  'src/sass/*.sass'
        }
    },
    projects: {
        pug: {
            dest: 'dist/illustrative-code',
            options: {
                pretty: true
            },
            src:  'src/projects/**/index.pug'
        },
        sass: {
            dest: 'dist/illustrative-code',
            processors,
            src:  'src/projects/**/styles.sass'
        }
    },
    watch: {
        global: {
            js:   'src/js/**/*.js',
            pug:  'src/pug/**/*.pug',
            sass: 'src/sass/**/*.sass'
        },
        projects: {
            pug:  'src/projects/**/*.pug',
            sass: 'src/projects/**/*.sass'
        }
    }
};