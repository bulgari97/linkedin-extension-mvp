const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  const isDev = env?.development;

  return {
    mode: isDev ? "development" : "production",
    resolve: {
      extensions: [".ts", ".js", ".json"],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          { 
            from: "./src/manifest/manifest.dev.json",   
            to: "manifest.json"                       
          }
        ],
      }),
    ],
    devtool: isDev ? "source-map" : false,
  };
};
