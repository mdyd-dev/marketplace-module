const path = require("path");

const BUILD_DIR = path.join(__dirname, "templates", "custom_themes", "default_custom_theme_assets");

module.exports = {
  output: {
    filename: "[name].js",
    path: BUILD_DIR
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader?cacheDirectory"
        }
      }
    ]
  },
  mode: "production"
};
