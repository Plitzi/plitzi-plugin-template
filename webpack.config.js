const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const { ModuleFederationPlugin } = webpack.container;

const PACKAGE = require('./package.json');

const DESTINATION = path.resolve(__dirname, './dist/');

const PluginName = 'demo';

const build = (env, args) => {
  const devMode = args.mode !== 'production';
  const onlyGzip = env.onlyGzip || false;
  const onlyAnalyze = env.onlyAnalyze || false;
  const watch = env.watch || false;

  const MFplitziSdkFederationRemotes = [];
  if (devMode) {
    MFplitziSdkFederationRemotes.push('plitziSdkFederation@http://localhost:3001/plitzi-sdk-federation.js');
  } else {
    MFplitziSdkFederationRemotes.push('plitziSdkFederation@https://cdn.plitzi.com/sdk/latest/plitzi-sdk-federation.js');
  }

  const modules = {
    entry: { [PluginName]: './src/component/index.js' },
    output: {
      path: DESTINATION,
      filename: 'plitzi-plugin-[name].js',
      chunkFilename: 'plitzi-plugin-chunk-[name].js'
    },
    watch,
    target: 'web',
    devServer: {
      // compress: true,
      hot: false, // until figure out whats going on
      liveReload: true,
      // historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'dist')
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
      new ModuleFederationPlugin({
        name: 'PlitziPluginFederation',
        // name: `PlitziPluginFederation${PluginName.replace(/^./, PluginName[0].toUpperCase())}`,
        // library: { type: 'var', name: 'PlitziPluginFederation' },
        filename: `plitzi-plugin-${PluginName}-federation.js`,
        remotes: {
          plitziSdkFederation: MFplitziSdkFederationRemotes
          // plitziSdkFederation: `promise new Promise(resolve => {
          //   debugger;

          //   const proxy = {
          //     get: (request, w) => {
          //       console.log(w)
          //       return window.plitziSdkFederation.get(request)
          //     },
          //     init: (arg) => {
          //       try {
          //         return window.plitziSdkFederation.init(arg)
          //       } catch(e) {
          //         console.log('remote container already initialized')
          //       }
          //     }
          //   };

          //   resolve(proxy);
          // })`
          // plitziSdkFederation2: [
          //   require.resolve('@plitzi/plitzi-sdk'),
          //   path.resolve(__dirname, '../remoteServer/public/server/container.js'),
          //   'plitziSdkFederation@http://localhost:3001/plitzi-sdk-federation.js'
          // ]
          // app123: `promise new Promise(resolve())`,
          // app1: `promise new Promise(resolve => {
          //   const urlParams = new URLSearchParams(window.location.search)
          //   const version = urlParams.get('app1VersionParam')
          //   // This part depends on how you plan on hosting and versioning your federated modules
          //   const remoteUrlWithVersion = 'http://localhost:3001/' + version + '/remoteEntry.js'
          //   const script = document.createElement('script')
          //   script.src = remoteUrlWithVersion
          //   script.onload = () => {
          //     // the injected script has loaded and is available on window
          //     // we can now resolve this Promise
          //     const proxy = {
          //       get: (request) => window.app1.get(request),
          //       init: (arg) => {
          //         try {
          //           return window.app1.init(arg)
          //         } catch(e) {
          //           console.log('remote container already initialized')
          //         }
          //       }
          //     }
          //     resolve(proxy)
          //   }
          //   // inject this script with the src set to the versioned remoteEntry.js
          //   document.head.appendChild(script);
          // })
          // `
        },
        exposes: {
          Plugin: './src/component/index.js'
        },
        shared: {
          react: { singleton: true, requiredVersion: PACKAGE.dependencies.react },
          'react-dom': { singleton: true, requiredVersion: PACKAGE.dependencies['react-dom'] },
          'react-redux': { singleton: true, requiredVersion: PACKAGE.dependencies['react-redux'] }
        }
      }),
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
      })
    ],
    stats: {
      colors: true
    }
  };

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
  }

  if (onlyAnalyze) {
    modules.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 4000 }));
  }

  return modules;
};

module.exports = [build];
