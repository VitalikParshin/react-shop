const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  devtool: "source-map",

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    "./src/main.tsx",
  ],

  output: {
    filename: "bundle.js",
    path: path.join(__dirname, '/dist'),
    publicPath: '/dist/'
  },

  resolve: {
    // modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    modulesDirectories: ['node_modules'],
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  module: {
    loaders: [
      { 
        test: /\.tsx?$/, 
        loader: "babel-loader!awesome-typescript-loader",
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap!postcss-loader') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('css?sourceMap!postcss-loader!less?sourceMap') },
      { test: /\.(jpg|png|svg)$/, loader: "url?limit=8192" }, 
    ],
    preLoaders: [
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    pxtorem({ rootValue: 100, propWhiteList: [] })
  ],

  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new ExtractTextPlugin('bundle.css', { disable: false, allChunks: true }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

};
