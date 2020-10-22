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

    // Return the altered config
    return config;
  }
};
