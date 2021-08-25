import TerserPlugin from 'terser-webpack-plugin';

export default {
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