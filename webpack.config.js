const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const lang =require('./src/pages/home/lang/index.json')

function absolute(dir) {
    return path.resolve(__dirname, dir);
}

function assetsPath(_path) {
    return path.posix.join("assets", _path);
}



let plugins=[];

if(process.env.NODE_ENV=='production'){
    plugins=[
        new CleanWebpackPlugin({
            dry: true,
            cleanStaleWebpackAssets: false,
            cleanOnceBeforeBuildPatterns:['**/*','!json*']
        }),
    ]
}else if(process.env.NODE_ENV=='development'){
    const vendorManifest = require('./dist/json/vendor-manifest.json');
    plugins=[
        new webpack.DllReferencePlugin({manifest: vendorManifest}),
    ]
}  
plugins=plugins.concat([
    new HtmlWebpackPlugin({
        chunks:['app','vendor'],
        title:lang.title,
        template: "./src/template.html"
    })
])


module.exports = {
    entry: {
        app:'./src/index.js',
        vendor:['core-js','antd','react','react-dom','react-router-dom','react-document-title']
    },
    mode: "development",
    output: {
        filename: './modules/[name].[hash].js',
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        port:8081,
        open:true,
        contentBase: "./dist"
    },
    resolve: {
        alias: {
            "@comp": absolute("src/components"),
            "@page": absolute("src/pages"),
        },
        extensions: [".js", ".json", ".jsx"]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                //代码分离、抽出vendor包
                vendor: {
                    chunks: "initial",
                    test: "vendor",
                    name: "vendor",
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader?cacheDirectory=true"
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|ttf)(\?.*)?$/,
                loader: "file-loader",
                options: {
                    name: assetsPath("images/[name].[hash:7].[ext]")
                }
            }
        ]
    },
    plugins: plugins
};
