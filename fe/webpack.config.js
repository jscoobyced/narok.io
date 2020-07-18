const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var webpack = require('webpack');

const dist = path.join(__dirname, 'dist');

module.exports = (env, argv) => {
    const config = {
        entry: {
            'vendor': ['react', 'react-dom', 'react-router-dom'],
            'main': './src/index.tsx'
        },
        output: {
            pathinfo: false,
            path: dist,
            publicPath: '/',
            filename: '[name].[chunkhash].js'
        },
        optimization: {
            removeAvailableModules: false,
            removeEmptyChunks: false,
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'initial',
                        name: 'vendor',
                        test: 'vendor',
                        enforce: true
                    },
                }
            }
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        output: 'fonts/'
                    }
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg|ico)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    },
                },
            }
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'mode': JSON.stringify(argv.mode)
                }
            }), new CopyWebpackPlugin({
                patterns: [{
                    from: path.resolve(__dirname, './public')
                }]
            }),
            new MiniCssExtractPlugin({
                filename: 'style.[contenthash].css',
            }),
            new HtmlWebpackPlugin({
                inject: true,
            }),
            new webpack.ProvidePlugin({
                'regeneratorRuntime': 'regenerator-runtime/runtime'
            }),
        ]
    };

    if (argv.mode === 'development' || argv.mode === 'none') {
        config.devtool = 'source-map';
        config.devServer = {
            contentBase: dist,
            compress: true,
            historyApiFallback: true,
            port: 8080,
            disableHostCheck: true,
            host: "dev.narok.io"
        };
    }

    if (argv.mode === 'production') {
        // placeholder for future enhancements
    }

    return config;
}