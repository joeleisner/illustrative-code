import marked from 'marked';
import TerserPlugin from 'terser-webpack-plugin';

const renderer = new marked.Renderer();

export const html = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(html|svg)$/,
                loader: 'raw-loader'
            },
            {
                test: /\.md$/,
                use: [
                    'raw-loader',
                    {
                        loader: 'markdown-loader',
                        options: {
                            headerIds: false,
                            renderer
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [ new TerserPlugin() ]
    },
    output: {
        library: {
            type: 'commonjs2'
        }
    },
    stats: 'minimal'
};

export const js = {
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