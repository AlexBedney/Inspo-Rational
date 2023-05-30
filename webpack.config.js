const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const copyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
      weather: './src/js/index.js',
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: '[name].bundle.js',
      assetModuleFilename: "images/[name][ext]",
      clean: true,
    },
    target: 'web',
    devServer: { 
      static: "./dist"
    }, 
    devtool: 'source-map', 
    module: {
      rules: [	
        { 
          test: /\.js$/i,
          exclude: /(node_modules)/,
          use: { 
            loader: 'babel-loader', 
            options: {
            presets: ['@babel/preset-env']
          }}
        }, 
        { 
          test: /\.css$/i, 
          use: [ 'style-loader', 'css-loader' ]		
        },
        { 
            test: /.s[ac]ss$/i, 
            use: [ 'style-loader', 'css-loader' , 'sass-loader']		
        },
        {  
          test: /\.(svg|eot|ttf|woff|woff2)$/i,  
          type: "asset/resource",
        },
        {
          test: /\.(png|jpg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"),
        chunks: ["inspo"],
        inject: "body",
        filename: "index.html",
      }),
      new copyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/css"),
            to: path.resolve(__dirname, "dist/css"),
          },
        ],
      }),
      
    ],
}
  