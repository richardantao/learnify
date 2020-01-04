const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry: {
        server: "./src/server.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    target: "node",
    externals: [nodeExternals()],
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html",
            excludeChunks: [ "server" ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ["@babel/preset-env"]
                  }
                }
              }
        ],
    },
    optimization: {
        splitChunks: {
            minSize: 30720,
            maxSize: 0,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: ".",
            automaticNameMaxLength: 30,
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2,
                },
                vendors: {
                    name: "vendor",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    enforce: true,
                    minChunks: 1,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 1,
                    priority: -10,
                    reuseExistingChunk: true
                },
            },
        },
    },
};