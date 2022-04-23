const currentTask = process.env.npm_lifecycle_event
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const WebpackManifestPlugin = require("webpack-manifest-plugin")

const config = {
  entry: "./src/index.js",
  output: {
    filename: "myBundle.[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 8082,
    contentBase: path.resolve(__dirname, "dist"),
    hot: true
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(js|jsx|ts)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"], "@babel/preset-react"]
          }
        }
      }
    ]
  }
}
 
module.exports = config
