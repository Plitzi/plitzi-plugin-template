const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-create-react-app'],
  webpackFinal: async (config, { configType }) => {
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

    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            // modules: true // Enable modules to help you using className
          }
        }
      ]
    });

    config.module.rules.push({
      test: /\.(sa|sc)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it uses publicPath in webpackOptions.output
            // publicPath: '../',
            hmr: true
          }
        },
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ],
      exclude: /(node_modules|bower_components)/
    });

    // Return the altered config
    return config;
  }
};
