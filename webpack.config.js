import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import fs from 'fs';
import { marked } from 'marked';

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
    output: {
        library: {
            type: 'commonjs2'
        }
    },
    stats: 'minimal'
};

import webpack from 'webpack';
const { version } = JSON.parse(fs.readFileSync('./package.json'));
import { root } from './config.js';

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
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(version),
            ROOT: JSON.stringify(root)
        })
    ]
};