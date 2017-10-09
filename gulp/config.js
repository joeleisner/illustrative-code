let autoprefixer = require('autoprefixer'),
    cssnano =      require('cssnano');

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
        src:   ['src/pug/**/*.pug', '!src/pug/shared/**/*.pug'],
        watch: 'src/pug/**/*.pug'
    },
    sass: {
        dest:  'dist',
        processors: [
            autoprefixer({ browsers: ['last 2 versions'] }),
            cssnano()
        ],
        src:   ['src/sass/**/*.sass', '!src/sass/shared/**/*.sass'],
        watch: 'src/sass/**/*.sass'
    }
};
