module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  printWidth: 100,
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'angular',
      },
    },
  ],
  plugins: [
    // relative paths are usually required so Prettier can find the plugin
    './node_modules/prettier-plugin-multiline-arrays', // plugin added here
  ],
};
