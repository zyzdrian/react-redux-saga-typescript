import autoprefixer from 'autoprefixer';
import postCssFlexBugsFixes from 'postcss-flexbugs-fixes';
import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import Dotenv from 'dotenv-webpack';

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../build/webpack'),
        publicPath: '/'
    },
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    drop_console: true
                }
            })
        ]
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: 'url-loader',
                        options: {
                            limit: 80000,
                            name: 'static/images/[name]___[hash:base64:5].[ext]'
                        }
                    },
                    {
                        test: /\.svg$/,
                        issuer: /\.js?$/,
                        use: [
                            {
                                loader: 'babel-loader'
                            },
                            {
                                loader: 'react-svg-loader',
                                options: {
                                    jsx: true,
                                    svgo: {
                                        plugins: [{
                                            cleanupIDs: false
                                        }, {
                                            collapseGroups: false
                                        }]
                                    }
                                }
                            }
                        ]
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: ['babel-loader', 'eslint-loader']
                    },
                    {
                        test: /\.s?[ac]ss$/,
                        use: [
                            {
                                loader: 'style-loader',
                                options: {
                                    hmr: false
                                }
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: false,
                                    minimize: true,
                                    importLoaders: 1,
                                    modules: true,
                                    convertToAbsoluteUrls: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: () => [
                                        postCssFlexBugsFixes,
                                        autoprefixer({
                                            browsers: [
                                                '>1%',
                                                'last 4 versions',
                                                'Firefox ESR',
                                                'not ie < 9'
                                            ],
                                            flexbox: 'no-2009'
                                        })
                                    ]
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: false
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(png|jpg|svg|ico)$/,
                        loader: 'file-loader',
                        options: {
                            name: 'static/images/[name]___[hash:base64:5].[ext]'
                        }
                    },
                    {
                        test: /\.(eot|ttf|woff|woff2)$/,
                        loader: 'file-loader',
                        options: {
                            name: 'static/fonts/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new CompressionPlugin({
            test: /\.js/
        }),
        new FaviconsWebpackPlugin({
            logo: './src/static/images/favicon.svg'
        }),
        new Dotenv({
            systemvars: true
        })
    ]
};
