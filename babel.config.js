module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@api': './src/api',
          '@assets': './src/assets',
          '@interfaces': './src/interfaces',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
