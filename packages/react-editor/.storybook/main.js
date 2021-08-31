const { resolve } = require('path')

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-docs'],
  webpackFinal: async config => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: require.resolve('ts-loader'),
              options: {
                configFile: resolve(__dirname, '..', 'tsconfig.stories.json'),
              }
            },
          ],
        },
      ],
    },
    resolve: {
      ...config.resolve,
      extensions: [
        ...config.resolve.extensions,
        '.ts',
        '.tsx',
      ],
    },
  }),
}
