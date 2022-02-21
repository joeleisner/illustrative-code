import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import fs from 'fs';
import { marked } from 'marked';
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
            },
            {
                test: /\.scss$/,
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer(),
                                    cssnano()
                                ]
                            }
                        }
                    },
                    'sass-loader'
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

import webpack from 'webpack';
const { version } = JSON.parse(fs.readFileSync('./package.json'));

export const js = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader:  'babel-loader',
                        options: { babelrc: true }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [ new TerserPlugin() ]
    },
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(version)
        })
    ]
};