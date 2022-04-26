const currentTask = process.env.npm_lifecycle_event
const path = require("path")
const common = require("./webpack.common");
const merge = require("webpack-merge");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const { CleanWebpackPlugin } = require("clean-webpack-plugin")
 

const config = {
  entry: "./src/index.js",
  output: {
    filename: "mavenBundle.js",
    path: path.resolve(__dirname, "public"),
    assetModuleFilename: "images/[ext][query]",
  },
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
  mode: "development",
  devServer: {
    port: 3000,
    static: [ "public"],
    //contentBase:"./public"
    open:true,
    liveReload:true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [ 
          "style-loader", 
          "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type:"asset",
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,  // without additional settings, this will reference .babelrc
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"], "@babel/preset-react","@babel/preset-typescript"],
            // cacheDirectory:true
          }
        }
      }
    ]
  },  
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts",".tsx"],
  },
}

// if (currentTask == "build") {
//   config.mode = "production"
//   config.module.rules[0].use[0] = MiniCssExtractPlugin.loader
//   config.plugins.push(new MiniCssExtractPlugin({ filename: "main.[hash].css" }), new CleanWebpackPlugin(), new WebpackManifestPlugin())
// }

module.exports = config
