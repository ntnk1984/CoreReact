const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

let env = "";

if (process.env.NODE_ENV == "development  ") {
  env = "./.development.env";
} else {
  env = "./.production.env";
}



module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "table-order.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv({
      path: env,
      //
    }),
  ],
  devServer: {
    port: 7230,
    historyApiFallback: true,
  },

  
};