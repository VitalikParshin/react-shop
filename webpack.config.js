const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

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
        loader: "babel-loader!awesome-typescript-loader",
      },
      { test: /\.less$/, loader: ExtractTextPlugin.extract("css?sourceMap!postcss-loader!less?sourceMap") },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("css?sourceMap!postcss-loader") },
      { test: /\.(jpg|png|svg)$/, loader: "url?limit=8192" }, 
      // {
      //   test: /\.(svg)$/i,
      //   loader: 'svg-sprite',
      //   include: [
      //     require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
      //     // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
      //   ],  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
      // },      
      // // { test: /\.css$/, loader: 'style!css' }, // 把css处理成内联style，动态插入到页面
      // { test: /\.less$/i, loader: ExtractTextPlugin.extract('style', 'css!postcss!less') },
      // { test: /\.css$/i, loader: ExtractTextPlugin.extract('style', 'css!postcss') }

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
      "process.env.DEBUG": process.env.NODE_ENV == "development",
    }),    
    new webpack.optimize.CommonsChunkPlugin("common", "common.js"),
    // new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new ExtractTextPlugin("bundle.css", { disable: false, allChunks: true }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
