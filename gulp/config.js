const autoprefixer = require('autoprefixer');
const cssnano =      require('cssnano');

module.exports = {
    connect: {
        root:       'dist',
        livereload: true
    },
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
};
