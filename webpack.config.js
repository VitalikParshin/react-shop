require("dotenv").config();

const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

module.exports = {
  devtool: "source-map",

  entry: [
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "react-hot-loader/patch",
    "./src/main.tsx",
  ],

  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/dist"),
    publicPath: "/dist/"
  },

  resolve: {
    // modulesDirectories: ["node_modules", path.join(__dirname, "../node_modules")],
    modulesDirectories: ["node_modules"],
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"]
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader!ts-loader",
      },

      // antd-mobile styles
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("css?sourceMap!postcss-loader!less?sourceMap"),
        exclude: /src/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css?sourceMap!postcss-loader"),
        exclude: /src/,
      },

      // project styles with CSS Modules
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader'),
        include: [path.resolve(__dirname, "./src")],
      },

      { test: /\.(jpg|png)$/, loader: "url?limit=8192" },
      {
        test: /\.(svg)$/,
        loader: 'svg-sprite',
        include: [
          require.resolve('antd-mobile').replace(/warn\.js$/, ''),
        ],
      },

    ],
    preLoaders: [
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  postcss: [
    autoprefixer({
      browsers: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 8", "iOS >= 8", "Android >= 4"],
    }),
    pxtorem({ rootValue: 100, propWhiteList: [] })
  ],

  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },

  plugins: [
    // new SpriteLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.DEBUG": process.env.NODE_ENV == "development",
      "process.env.DEBUG_GRAPHQL": process.env.DEBUG_GRAPHQL,
    }),
    new webpack.optimize.CommonsChunkPlugin("common", "common.js"),
    // new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new ExtractTextPlugin("bundle.css", { disable: false, allChunks: true }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
