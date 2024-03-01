const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";

const CopywebpackPlugin = require("copy-webpack-plugin");
const Visualizer = require("webpack-visualizer-plugin2");
const Dotenv = require('dotenv-webpack');
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    sourcePrefix: "",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
        use: ["url-loader"],
      },
      {
        test: /\.js$/,
        use: { loader: require.resolve("@open-wc/webpack-import-meta-loader") },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      favicon: "./public/favicon.ico",
      filename: "index.html",
    }),
    // fix "process is not defined" error:
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new CopywebpackPlugin({
      patterns: [
        { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" },
        { from: path.join(cesiumSource, "Assets"), to: "Assets" },
        { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
      ],
    }),
    new webpack.DefinePlugin({
      // Define relative base path in cesium for loading assets
      CESIUM_BASE_URL: JSON.stringify(""),
    }),
    new Visualizer({
      filename: path.join("..", "WebpackStatistics.html"),
    }),
    new Dotenv(),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "build"),
    }, client: {
      overlay: false,
    },
    port: 5000,
    allowedHosts: "all",
  },
  module: {
    // exclude node_modules
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheCompression: false,
          cacheDirectory: true,
        },
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // pass all js files through Babel
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      // CesiumJS module name
      cesium: path.resolve(__dirname, cesiumSource),
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  amd: {
    // Enable webpack-friendly use of require in Cesium
    toUrlUndefined: true,
  },
  resolve: {
    fallback: { https: false, zlib: false, http: false, url: false },
    mainFiles: ["index", "Cesium"],
  },
  cache: {
    type: "filesystem",
  },
};
