module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  /* This configuration is for React Native projects and it includes for setup for
     React Navigation, React Navigation Stack and React Native Gesture Handler.
  */
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|react-navigation' +
      '|@react-navigation/.*' +
      '|@react-navigation/stack' +
      '|react-navigation-stack' +
      '|@react-native-community/.*' +
      '))',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  // testEnvironment: 'jsdom',
};
