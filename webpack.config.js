const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const port = 2233;
const dist = path.join(__dirname, "dist");
const src = path.join(__dirname, "src");
const host = "localhost";

module.exports = (_, args) => {
  return {
    entry: "./index.tsx",
    devtool: "source-map",
    context: src,
    devServer: { open: true, port, hot: true, historyApiFallback: true, host },
    output: {
      path: dist,
      publicPath: args.mode === "development" ? `http://${host}:${port}/` : undefined,
      filename: `js/[name].js`,
      chunkFilename: `js/[name].js`,
    },
    resolve: {
      modules: [src, "node_modules"],
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      alias: {
        src,
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]_[local]-[hash:base64:5]",
                },
              },
            },
            // "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      // new HtmlWebpackPlugin({ template: "./index.html", favicon: "./favicon.svg" }),
      new HtmlWebpackPlugin({ title: "VK test", template: "./index.html", favicon: "./favicon.svg" }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[name].css",
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.join(__dirname, "tsconfig.json"),
        },
      }),
      new CopyPlugin({
        patterns: [{ from: path.join(__dirname, "api"), to: path.join(__dirname, "api"), noErrorOnMissing: true }],
      }),
    ],
  };
};
