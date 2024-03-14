const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const PlitziPlugin = require('@plitzi/plitzi-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const pluginSchema = require('./src/component/pluginSchema.json');
const PACKAGE = require('./package.json');

const DESTINATION = path.resolve(__dirname, './dist/');

const PluginName = 'demo';

const build = (env, args) => {
  const devMode = args.mode !== 'production';
  const onlyGzip = env.onlyGzip || false;
  const onlyAnalyze = env.onlyAnalyze || false;
  const watch = env.watch || false;

  const modules = {
    entry: { [PluginName]: './src/component/index.js' },
    output: {
      path: DESTINATION,
      library: `PlitziPlugin${PluginName.charAt(0).toUpperCase() + PluginName.slice(1)}`,
      filename: 'plitzi-plugin-[name].js',
      chunkFilename: 'plitzi-plugin-chunk-[name].js',
      libraryTarget: 'umd',
      crossOriginLoading: 'anonymous',
      globalObject: "(typeof self !== 'undefined' ? self : this)",
      publicPath: 'auto'
    },
    watch,
    devServer: {
      allowedHosts: 'all',
      compress: false,
      hot: true,
      liveReload: false,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'dist')
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      port: 3999
    },
    module: {
      rules: [
        {
          test: /(\.jsx|\.js)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]], // [classic] will disable new JSX compiler and [automatic] will enable it
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-transform-runtime',
                env.WEBPACK_SERVE && 'react-refresh/babel'
              ].filter(Boolean)
            }
          }
        },
        {
          test: /\.(png|jpg|gif|svg|...)$/,
          loader: 'url-loader',
          exclude: /(node_modules|bower_components)/
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {}
            },
            { loader: 'css-loader', options: {} },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: devMode
              }
            }
          ],
          exclude: /(node_modules|bower_components)/
        }
      ]
    },
    plugins: [
      new PlitziPlugin({ isPlugin: true }),
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(PACKAGE.version)
      }),
      new MiniCssExtractPlugin({
        filename: 'plitzi-plugin-[name].css',
        chunkFilename: 'plitzi-plugin-chunk-[name].css'
      }),
      new WebpackAssetsManifest({
        output: 'plugin-manifest.json',
        integrity: true,
        integrityHashes: ['sha384'],
        sortManifest: false,
        transform: assets => ({
          accessGroup: [],
          author: 'Carlos Rodriguez <crodriguez@plitzi.com>',
          created: '',
          updated: '',
          pluginVersion: PACKAGE.version,
          pluginSchema,
          assets
        })
      }),
      new CompressionPlugin({
        algorithm: 'gzip',
        filename: onlyGzip ? '[path][base]' : '[path][base].gz',
        deleteOriginalAssets: onlyGzip,
        test: /\.js$|\.css$|\.html$/,
        threshold: 1024,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ],
    stats: {
      colors: true
    }
  };

  if (env.WEBPACK_SERVE) {
    modules.plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (devMode) {
    modules.devtool = 'source-map';
  } else {
    modules.plugins.push(
      new CleanWebpackPlugin(),
      new ZipPlugin({
        // OPTIONAL: defaults to the Webpack output path (above)
        // can be relative (to Webpack output path) or absolute
        path: '',

        // OPTIONAL: defaults to the Webpack output filename (above) or,
        // if not present, the basename of the path
        filename: `plitzi-plugin-${PluginName}-v${PACKAGE.version}.zip`,

        // OPTIONAL: defaults to 'zip'
        // the file extension to use instead of 'zip'
        extension: 'zip',

        // OPTIONAL: defaults to the empty string
        // the prefix for the files included in the zip file
        pathPrefix: '',

        // OPTIONAL: defaults to the identity function
        // a function mapping asset paths to new paths
        pathMapper: assetPath => {
          // put all pngs in an `images` subdir
          // if (assetPath.endsWith('.png')) {
          //   return path.join(path.dirname(assetPath), 'images', path.basename(assetPath));
          // }

          return assetPath;
        },

        // OPTIONAL: defaults to including everything
        // can be a string, a RegExp, or an array of strings and RegExps
        include: [/\.js$/, /\.css$/, /\.json$/],

        // OPTIONAL: defaults to excluding nothing
        // can be a string, a RegExp, or an array of strings and RegExps
        // if a file matches both include and exclude, exclude takes precedence
        exclude: [/\.png$/, /\.html$/],

        // yazl Options

        // OPTIONAL: see https://github.com/thejoshwolfe/yazl#addfilerealpath-metadatapath-options
        fileOptions: {
          mtime: new Date(),
          mode: 0o100664,
          compress: true,
          forceZip64Format: false
        },

        // OPTIONAL: see https://github.com/thejoshwolfe/yazl#endoptions-finalsizecallback
        zipOptions: {
          forceZip64Format: false
        }
      })
    );
    modules.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: /(webpackIgnore:true|webpackIgnore: true)/
            }
          },
          extractComments: false
        })
      ]
    };
  }

  if (onlyAnalyze) {
    modules.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 4000 }));
  }

  return modules;
};

module.exports = [build];
