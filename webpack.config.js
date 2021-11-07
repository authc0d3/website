const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/js/main.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  devServer: {
    static: "./build",
    port: 3000,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Output Management",
      template: "./src/index.html",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"],
          },
        },
      },
      {
        test: /\.(scss|css)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        type: "javascript/auto",
        test: /\.json$/i,
        loader: "file-loader",
        options: { name: "[name].[ext]" },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          minimize: {
            removeComments: false,
            collapseWhitespace: false,
          },
        },
      },
    ],
  },
};
