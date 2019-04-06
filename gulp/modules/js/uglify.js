const empty = require('gulp-empty'),
    uglify  = require('gulp-uglify');

module.exports = style => style === 'min' ? uglify() : empty();