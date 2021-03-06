const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// var WebpackClearConsole = require("webpack-clear-console").WebpackClearConsole;
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const port = 3000;
const publicPath = path.join(__dirname, "public");

module.exports = (env, argv) => {
  const mode = argv.mode;
  const dev = mode === "development";
  console.log("Run webpack in", mode, "mode");

  return {
    entry: { app: "./src/index.js" },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "build")
    },
    devtool: dev ? "source-map" : false,
    mode: mode,
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ["@babel/preset-react", "@babel/preset-env"],
              plugins: [
                "react-hot-loader/babel",
                "@babel/plugin-transform-runtime",
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                "@babel/plugin-syntax-dynamic-import"
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]"
              }
            }
          ]
        },
        {
          test: /\.(scss)$/,
          use: [
            {
              loader: "style-loader" // inject CSS to page
            },
            {
              loader: "css-loader" // translates CSS into CommonJS modules
            },
            {
              loader: "postcss-loader", // Run post css actions
              options: {
                plugins: function() {
                  // post css plugins, can be exported to postcss.config.js
                  return [require("precss"), require("autoprefixer")];
                }
              }
            },
            {
              loader: "sass-loader" // compiles Sass to CSS
            }
          ]
        },
        {
          test: /\.(png|jpe?g)$/,
          use: [
            {
              loader: "url-loader"
              // options: {
              //   // limit: 8000, // Convert images < 8kb to base64 strings
              //   name: "images/[hash]-[name].[ext]"
              // }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/"
              }
            }
          ]
        },
        {
          test: /\.mp3$/,
          include: path.join(__dirname, "src/assets/sounds"),
          loader: "file-loader",
          options: {
            name: '[hash].[ext]',
          },
        }
      ]
    },
    devServer: {
      port,
      hot: true,
      inline: true,
      contentBase: "/",
      historyApiFallback: {
        rewrites: [{ from: /\/$/, to: "/" }]
      }
    },
    plugins: [
      new CleanWebpackPlugin(["build"]),
      new HtmlWebpackPlugin({
        template: "public/index.html"
      }),
      ...(dev ? [new webpack.HotModuleReplacementPlugin()] : [])
    ]
  };
};
