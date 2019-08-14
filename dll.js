const path = require("path");
const webpack = require("webpack");
const Package = require("./package.json");

let vendor = Object.keys(Package.dependencies);
module.exports = {
    entry: {
        vendor: vendor
    },
    output: {
        path: path.join(__dirname, "./dist/json"),
        filename: "dll.[name].js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "./dist/json", "[name]-manifest.json"),
            name: "[name]"
        })
    ]
};
