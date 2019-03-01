const webpack = require("webpack");
const ngcWebpack = require("ngc-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { IndexHtmlWebpackPlugin } = require('@angular-devkit/build-angular/src/angular-cli-files/plugins/index-html-webpack-plugin');


var path = require("path");

var _root = path.resolve(__dirname, ".");

function getRoot(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

module.exports = function (env, argv) {
  return {
    entry: {
      main: "./src/main.ts",
      polyfills: "./src/polyfills.ts"
    },

    target: "web",
    devtool: false,

    output: {
      path: getRoot("dist"),
      publicPath: env==='prod' ? 'http://localhost:5052/dist/': '/',
      filename: "[name].js"
    },

    resolve: {
      extensions: [".js", ".ts", ".html"]
    },

    module: {
      rules: [
        {
          test: /.js$/,
          parser: {
            system: true
          }
        },
        // Typescript
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: "@ngtools/webpack"
        },


        // Templates
        {
          test: /\.html$/,
          exclude: getRoot("src", "index.html"),
          use: [
            {
              loader: "raw-loader"
            }
          ]
        },
        {
          test: /\.(scss|css)$/,
          include: getRoot("src", "app"),
          use: ["raw-loader", "sass-loader"]
        },

        {
          test: /\.(scss|css)$/,
          exclude: getRoot("src", "app"),

          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        },
        {
          test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani|eot|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: '[name].[hash:20].[ext]'
              }
            }
          ]
        },
      ]
    },
    plugins: [
      new UglifyJsPlugin(),

      new ngcWebpack.NgcWebpackPlugin({
        tsConfigPath: "./tsconfig.json",
        mainPath: "./src/main.ts"
      }),

      new MiniCssExtractPlugin({
        filename: "styles.css"
      }),

      new CopyWebpackPlugin([
        {
          from: getRoot("src", "index.html"), to: getRoot("dist", "index.html")
        },
        {
          from: getRoot("src", "assets"), to: getRoot("dist", "assets")
        }

      ]),
      new IndexHtmlWebpackPlugin({
        input: './src/index.html',
        output: 'index.html',
        entrypoints: [
          'polyfills',
          'main'
        ]
      })
    ]
  };
};
