const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use:  {
                    loader:  'babel-loader',
                    options: { babelrc: true }
                }
            }
        ]
    },
    optimization: {
        minimizer: [ new TerserPlugin() ]
    }
};