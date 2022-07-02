const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./app.ts",
  mode: "production",
  externalsPresets: { node: true },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "server.js",
  },
  resolve: {
    extensions: [".ts", ".js", ".json", ".html", "..."],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: false,
  },
};
