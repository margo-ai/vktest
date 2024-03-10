import path from "path";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

module.exports = () => {
  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js",
    },
    devtool: "source-map",
    resolve: { extensions: [".tsx", ".ts", ".js"] },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      // new HtmlWebpackPlugin({ template: "./index.html", favicon: "./favicon.svg" }),
      new HtmlWebpackPlugin({ title: "VK test", template: "./src/index.html", favicon: "./src/favicon.svg" }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[name].css",
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.join(__dirname, "tsconfig.json"),
        },
      }),
    ],
  };
};
