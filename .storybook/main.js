const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const PACKAGE = require('../package.json');

module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-create-react-app'],
  webpackFinal: async (config, { configType }) => {
    config.resolve = {
      ...config.resolve,
      symlinks: false,
      alias: {
        ...config.resolve.alias,
        plitziElement: path.resolve('node_modules', '@plitzi', 'plitzi-element'),
        react: path.resolve('node_modules/react'),
        'react-dom': path.resolve('node_modules/react-dom'),
        'react-redux': path.resolve('node_modules/react-redux')
      }
    };

    config.module.rules.push({
      test: /(\.jsx|\.js)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]], // [classic] will disable new JSX compiler and [automatic] will enable it
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    });

    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|...)$/,
      loader: 'url-loader',
      exclude: /(node_modules|bower_components)/
    });

    config.plugins = [
      ...config.plugins,
      new MiniCssExtractPlugin({}),
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(PACKAGE.version)
      })
    ];

    config.module.rules.map(rule => {
      if (rule.oneOf) {
        rule.oneOf = rule.oneOf.slice().map(subRule => {
          if (subRule.test instanceof RegExp && subRule.test.test('.scss')) {
            return {
              ...subRule,
              use: [
                // ...subRule.use,
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {}
                },
                'css-loader',
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: false
                  }
                }
              ]
            };
          }

          return subRule;
        });
      }

      return rule;
    });

    // Return the altered config
    return config;
  }
};
