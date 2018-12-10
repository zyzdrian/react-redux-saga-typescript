import autoprefixer from 'autoprefixer';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import postCssFlexBugsFixes from 'postcss-flexbugs-fixes';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

module.exports = {
    entry: ['@babel/polyfill', './src/index.tsx'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../build'),
        publicPath: '/'
    },
    devtool: 'cheap-module-source-map',
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
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
                                        plugins: [
                                            {
                                                cleanupIDs: false
                                            },
                                            {
                                                collapseGroups: false
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(tsx|ts)$/,
                        exclude: /node_modules/,
                        use: ['babel-loader']
                    },
                    // {
                    //     enforce: 'pre',
                    //     test: /\.js$/,
                    //     loader: 'source-map-loader'
                    // },
                    {
                        test: /\.s?[ac]ss$/,
                        use: [
                            {
                                loader: 'style-loader'
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                    importLoaders: 1,
                                    modules: true,
                                    convertToAbsoluteUrls: true,
                                    localIdentName: '[name]__[local]___[hash:base64:5]'
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: () => [
                                        postCssFlexBugsFixes,
                                        autoprefixer({
                                            browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                                            flexbox: 'no-2009'
                                        })
                                    ]
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
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
            template: './src/index.html'
        }),
        new FaviconsWebpackPlugin({
            logo: './webpack/favicon.svg'
        }),
        new Dotenv({
            systemvars: true
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            openAnalyzer: false
        })
    ],
    devServer: {
        open: true,
        port: 8080,
        historyApiFallback: true
    }
};
