const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;



module.exports=(env) => {

    return {
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
                path:process.env.NODE_ENV.trim() == "development"?"./.development.env":"./.production.env" ,
                //
            }),
            // new BundleAnalyzerPlugin()
        ],
        devServer: {
            port: 7230,
            historyApiFallback: true,
        },
     
    }

};