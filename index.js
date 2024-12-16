const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const WebpackRTLPlugin = require('@automattic/webpack-rtl-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDev ? 'development' : 'production',
    stats: 'minimal',
    entry: {
        index: path.join(process.cwd(), 'src', 'index.js'),
    },
    output: {
        filename: '[name].js',
        path: path.join(process.cwd(), 'dist'),
        publicPath: '',
    },
    externals: {
        jquery: 'jQuery',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@wordpress/babel-preset-default'],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')(),
                                    require('postcss-flexbugs-fixes'),
                                ],
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            api: 'modern',
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|avif|woff2?|ttf|eot|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[contenthash][ext]',
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: 'chunk-[id].css',
        }),
        new DependencyExtractionWebpackPlugin(),
        new WebpackManifestPlugin(),
        new WebpackRTLPlugin(),
    ],
};
