const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackRequireFrom = require('webpack-require-from');

const BUILD_DIR = path.join(__dirname, process.env.npm_package_config_build_dir);
console.log('BUILD DIR: ', `${BUILD_DIR}/`);

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
const isProduction = NODE_ENV === 'production';
console.log(`ENV: ${NODE_ENV}`);

const extractCSS = new ExtractTextPlugin('[name].css');

module.exports = env => {
  const plugins = [];

  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        return module.resource && module.resource.indexOf('node_modules') !== -1 && count > 2;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    extractCSS,
    new webpack.optimize.ModuleConcatenationPlugin(),
    isProduction ? new webpack.HashedModuleIdsPlugin() : new webpack.NamedModulesPlugin(),
    new WebpackRequireFrom({
      methodName: '__cdnUrl'
    })
  );

  return {
    context: path.resolve(__dirname),
    entry: {
      app: './src/app',
      vendor: './src/vendor'
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].[chunkhash:3].js',
      publicPath: '',
      path: BUILD_DIR
    },
    devtool: false,
    resolve: {
      modules: ['node_modules', './src']
    },
    bail: true,
    stats: {
      modules: false,
      hash: false,
      assetsSort: '!size',
      version: false
    },
    performance: {
      hints: 'warning'
    },

    module: {
      noParse: /node_modules\/.*.min.js/,
      rules: [
        {
          test: /\.js$/,
          include: `${__dirname}/src`,
          exclude: `${__dirname}/node_modules`,
          loader: 'babel-loader?retainLines=true&cacheDirectory'
        },
        {
          test: /(\.css|\.scss)$/,
          include: `${__dirname}/src`,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: ['cache-loader', 'css-loader?url=false', 'postcss-loader', 'sass-loader']
          })
        },
        {
          test: /\.gif$/,
          use: ['file-loader?name=[name].gif']
        },
        {
          test: /\.(eot|ttf|otf|svg|woff(2))?$/,
          include: `${__dirname}/src`,
          loader: 'file-loader?name=fonts/[name].[ext]'
        }
      ]
    },
    plugins: plugins
  };
};
