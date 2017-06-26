'use strict';

require("dotenv").config();

const path = require('path'),
    webpack = require('webpack'),
    HtmlwebpackPlugin = require('html-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    pxtorem = require('postcss-pxtorem');

const SRC_PATH = path.join(__dirname, '../src'),
    STATIC_PATH = path.join(__dirname, '../static'),
    DIST_PATH = path.join(__dirname, '../static/dist/app'),
    RESOURCE_PATH = path.join(__dirname, '../src/resource');

const __DEV__ = process.env.NODE_ENV !== 'production';

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const bundleConfig = __DEV__ ?
    require(STATIC_PATH + "/cache/bundle-config.json")
    : require(STATIC_PATH + "/dist/lib/bundle-config.json");

console.log('DOTENV', process.env);

module.exports = {
  	context: SRC_PATH,
	entry: {
        app: ['src/main.tsx']
    },
    output: {
        path: DIST_PATH,
        publicPath: '',
        filename: '[name]-[hash].js',
    	chunkFilename: '[name]-[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            configFileName: __DEV__ ? "tsconfig.json" : "tsconfig.prod.json",
                        }
                    }
                ]
            },

            {
                test: /\.less|.css$/,
                use: [],
                exclude: /src/,
            },

            // project styles with CSS Modules
            {
              test: /\.css$/,
              include: [path.resolve(__dirname, "../src")],
              use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[local]___[hash:base64:5]",
                        }
                    }
              })
            },


            // project styles with CSS Modules
            // {
            //   test: /\.css$/,
            //   use: ExtractTextPlugin.extract({
            //       fallback: 'style-loader',
            //       loader: [
            //           "css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]",
            //           "postcss-loader",
            //       ],
            //
            //
            //   }),
            //   // loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader'),
            //   include: [path.resolve(__dirname, "./src")],
            // },


            {
                test: /\.(jpg|jpeg|png|gif)(\?[a-z0-9=&.]+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [
                    require.resolve('antd-mobile').replace(/warn\.js$/, ''),
                ],
            }
        ]
    },
    resolve: {
        modules: [
            SRC_PATH,
            'node_modules'
        ],
        alias: {
            'resource': RESOURCE_PATH,
            'src': SRC_PATH
        },
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    plugins: [
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
          "process.env.DEBUG": process.env.NODE_ENV == "development",
          "process.env.DEBUG_GRAPHQL": process.env.DEBUG_GRAPHQL,
        }),
        new HtmlwebpackPlugin({
            filename: 'index.html',
            chunks: ['app'],
            template: SRC_PATH + '/template/' + (__DEV__ ? 'app.dev.html' : 'app.prod.html'),
            assets: {
                "style"  : "[name]-[hash].css",
            },
            bundleName: bundleConfig.bundle.js,
            minify: __DEV__ ? false : {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeComments: true
            }
        }),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: __DEV__ ? require('../static/cache/bundle-manifest.json') : require('../static/dist/lib/bundle-manifest.json')
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: SRC_PATH,
                output: {
                    path: DIST_PATH,
                    publicPath: '',
                    filename: '[name]-[hash].js',
                    chunkFilename: '[name]-[chunkhash].js'
                },
                postcss: [
                    autoprefixer({browsers: ['> 1%', 'last 4 versions']}),
                    pxtorem({
                        rootValue: 100,
                        propWhiteList: [],
                    }),
                ]
            }
        })
    ]
};
