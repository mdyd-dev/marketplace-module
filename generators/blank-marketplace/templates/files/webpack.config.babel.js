import path from 'path';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import WebpackRequireFrom from 'webpack-require-from';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

import aliases from './webpack.aliases';
import vendor from './webpack.vendor';

process.title = `${process.env.npm_package_name}-webpack`;
const BUILD_DIR = path.join(
  __dirname,
  'marketplace_builder',
  'custom_themes',
  'default_custom_theme_assets'
);
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new WriteFilePlugin({ log: false, force: true }),
    extractCSS,
    new webpack.optimize.ModuleConcatenationPlugin(),
    new LodashModuleReplacementPlugin(),
    new WebpackRequireFrom({
      methodName: '__cdnUrl'
    })
  );

  return {
    context: path.resolve(__dirname, './src'),
    entry: {
      app: './app',
      vendor: ['./vendor', 'jquery']
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].[chunkhash:3].js',
      publicPath: '',
      path: BUILD_DIR
    },
    devtool: false,
    resolve: {
      modules: ['node_modules', './javascripts'],
      alias: aliases
    },
    watchOptions: {
      aggregateTimeout: 50
    },
    bail: true,
    stats: {
      modules: false,
      hash: false,
      assetsSort: '!size',
      version: false
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [path.resolve(__dirname, 'src', 'javascripts'), path.resolve(__dirname, 'node_modules')],
          loader: 'babel-loader',
          options: {
            babelrc: false,
            retainLines: true,
            cacheDirectory: true,
            presets: [
              [
                'env',
                {
                  modules: false,
                  useBuiltIns: true
                }
              ]
            ],
            plugins: ['lodash', 'transform-object-assign']
          }
        },
        {
          test: /(\.css|\.scss|\.sass)$/,
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
          loader: 'file-loader?name=fonts/[name].[ext]'
        },
        { test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery' }
      ]
    },
    plugins: plugins
  };
};
