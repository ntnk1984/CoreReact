const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");




module.exports = (e,argv) => {
  let env = "";
  
  if (argv.mode == "production") {
      env = "./.production.env";
  } else {
      env = "./.development.env";
  }

  console.log(env);

  return({
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "createorder.js",
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
        path: env, // default is .env
      }),
    ],

  })
  
};
