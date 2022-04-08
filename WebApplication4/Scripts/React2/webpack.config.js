﻿module.exports = {
    context: __dirname,
    entry: "./src/app.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle2.js",
    },
    watch: true,
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        }]
    }
}