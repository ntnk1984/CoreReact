const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let env = "";
console.log(process.env.NODE_ENV.trim() == "development")
if (process.env.NODE_ENV.trim() == "development") {
    env = "./.development.env";
} else {
    env = "./.production.env";
}

console.log(env)

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "table-order.js",
    },
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
            path: env,
            //
        }),
        // new BundleAnalyzerPlugin()
    ],
    devServer: {
        port: 7230,
        historyApiFallback: true,
    },


};