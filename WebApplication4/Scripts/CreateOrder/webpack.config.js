const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
console.log(process.env.NODE_ENV);
let env = "";
if (process.env.NODE_ENV == "development  ") {
    env = "./.development.env";
} else {
    env = "./.production.env";
}
module.exports = {
    // entry: "./src/index.js",
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index-bundle.js",
    },
    // externals: {
    //   antd: "antd",
    //   react: "React",
    //   "react-dom": "ReactDOM",
    // },
    module: {
        rules: [{
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
};