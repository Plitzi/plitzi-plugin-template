const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');

const PACKAGE = require('./package.json');

const DESTINATION = path.resolve(__dirname, './dist/');

const entry = glob.sync('./src/components/**/**/index.js').reduce((acc, value) => {
  const valueArr = value.split('/');
  const elementName = valueArr[valueArr.length - 2];
  acc[elementName] = value;

  return acc;
}, {});

const build = (env, args) => {
  const devMode = args.mode !== 'production';
  const onlyGzip = args.onlyGzip || false;
  const onlyAnalyze = args.onlyAnalyze || false;
  const watch = args.watch || false;

  const modules = {
    entry: { ...entry, All: './src/index.js' },
    output: {
      path: DESTINATION,
      filename: 'plitzi-plugin-[name].js',
      chunkFilename: '[name].extras.js',
      library: 'PlitziPlugin[name]',
      libraryTarget: 'umd',
      globalObject: "(typeof self !== 'undefined' ? self : this)"
    },
    watch,
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
        umd: 'react'
      },
      'react-redux': {
        root: 'ReactRedux',
        commonjs2: 'react-redux',
        commonjs: 'react-redux',
        amd: 'react-redux',
        umd: 'react-redux'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
        umd: 'react-dom'
      }
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
              plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
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
            'css-loader',
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
      new MiniCssExtractPlugin({
        filename: 'plitzi-plugin-[name].css'
      }),
      new WebpackAssetsManifest({
        integrity: true,
        integrityHashes: ['sha384'],
        sortManifest: false,
        assets: {
          accessGroup: ['auser'],
          author: 'Carlos Rodriguez <crodriguez@plitzi.com>',
          created: '',
          updated: '',
          widgetArea: 'main',
          widgetName: 'widget',
          widgetVersion: PACKAGE.version
        },
        transform: (assets, manifest) => {
          const customAssets = { assets: {} };
          [
            'accessGroup',
            'author',
            'created',
            'updated',
            'widgetArea',
            'widgetName',
            'widgetPath',
            'widgetVersion'
          ].forEach(asset => {
            customAssets[asset] = assets[asset];
            delete assets[asset];
          });

          customAssets.assets = assets;

          return customAssets;
        }
      }),
      new WebpackAssetsManifest({
        output: 'app.json',
        integrity: true,
        integrityHashes: ['sha384'],
        sortManifest: false,
        assets: {
          accessGroup: ['auser'],
          author: 'Carlos Rodriguez <>',
          created: '',
          updated: '',
          widgetArea: 'main',
          widgetName: 'widget',
          widgetVersion: PACKAGE.version
        },
        transform: (assets, manifest) => {
          const customAssets = { assets: {} };
          [
            'accessGroup',
            'author',
            'created',
            'updated',
            'widgetArea',
            'widgetName',
            'widgetPath',
            'widgetVersion'
          ].forEach(asset => {
            customAssets[asset] = assets[asset];
            delete assets[asset];
          });

          customAssets.assets = assets;

          return customAssets;
        }
      })
    ],
    stats: {
      colors: true
    }
  };

  if (onlyGzip) {
    modules.plugins.push(
      new CompressionPlugin({
        filename: '[path]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    );
  } else {
    modules.plugins.push(
      new CompressionPlugin({
        filename: '[path].gz',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    );
  }

  if (devMode) {
    modules.devtool = 'source-map';
  } else {
    modules.plugins.push(new CleanWebpackPlugin());
    modules.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false
            }
          },
          extractComments: false
        })
      ]
    };

    // Optional Brotli algoritm require Node +12
    // modules.plugins.push(
    //   new CompressionPlugin({
    //     filename: '[path].br[query]',
    //     algorithm: 'brotliCompress',
    //     test: /\.(js|css|html|svg)$/,
    //     compressionOptions: { level: 11 },
    //     threshold: 10240,
    //     minRatio: 0.8
    //   })
    // );
  }

  if (onlyAnalyze) {
    modules.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 4000 }));
  }

  return modules;
};

module.exports = [build];
