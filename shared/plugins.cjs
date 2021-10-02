const PluginError = require('plugin-error');
const through = require('through2');
const vinylContents = require('vinyl-contents');
const Path = require('path');

// Log an error
function logError(error, fileName) {
    return new PluginError('jsToHTML', error, { fileName });
}

// Require from a string as if it were a module
function requireFromString(string, filename = '') {
    const Module = module.constructor;
    let customModule = new Module();
    customModule._compile(string, filename);
    return customModule.exports;
}

// Format a file's contents
function formatContents(contents) {
    // Convert the contents buffer to a string
    const string = contents.toString();

    // Grab the default output from the contents treated as a module
    const { default: output } = requireFromString(string);

    // Finally, return the output as a buffer
    return Buffer.from(output);
}

// Format a file's path
function formatPath(path) {
    // Grab the path's directory name...
    const dirName = Path.dirname(path);
    // ... and file name (without its extension)
    let fileName = Path.basename(path, '.js');

    // If the file's name isn't "index", add "/index" to it
    if (fileName !== 'index') fileName += '/index';

    // Add an ".html" extension to the file name
    fileName += '.html';

    // Finally, return the newly formed path
    return Path.join(dirName, fileName);
}

// Converts a Common JS module into an HTML file
function jsToHTML() {
    return through.obj(function compile(file, enc, cb) {
        vinylContents(file, async function contents(error, content) {
            if (error) return cb(logError(error, file.path));

            if (!content) return cb(null, file);

            try {
                file.contents = formatContents(content);

                file.path = formatPath(file.path);

                return cb(null, file);
            } catch(error) {
                return cb(logError(error, file.path));
            }
        });
    });
}

exports.jsToHTML = jsToHTML;
